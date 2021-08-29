# app.py
import uuid
import os
import time
import json
from flask import Flask, render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin
from datetime import datetime
import pika

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///user.db"
db = SQLAlchemy(app)
ma = Marshmallow(app)


class User(db.Model):
    username = db.Column(db.String(50), nullable=False, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    gender = db.Column(db.String(50), nullable=False)
    score = db.Column(db.Integer, default=0)
    total_score = db.Column(db.Integer, default=0)
    aver_score = db.Column(db.Float, default=0.0)
    times = db.Column(db.Integer, default=1)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, username, first_name, last_name, gender, score):
        self.username = username
        self.first_name = first_name
        self.last_name = last_name
        self.gender = gender
        self.score = score
        self.total_score = score
        self.aver_score = score


db.create_all()

# https://flask-marshmallow.readthedocs.io/en/latest/
class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        include_fk = True


class DemoRpcClient(object):
    def __init__(self):
        cred = pika.PlainCredentials("guest", "guest")
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters("rabbitmq", 5672, "/", cred)
        )
        self.channel = self.connection.channel()

        result = self.channel.queue_declare(queue="", exclusive=True)
        self.callback_queue = result.method.queue

        self.channel.basic_consume(
            queue=self.callback_queue,
            on_message_callback=self.on_response,
            auto_ack=True,
        )

    def on_response(self, ch, method, props, body):
        if self.corr_id == props.correlation_id:
            self.response = json.loads(body.decode("utf-8"))

    def call(self, arg):
        self.response = None
        self.corr_id = str(uuid.uuid4())
        body = json.dumps(arg).encode("utf8")

        self.channel.basic_publish(
            exchange="",
            routing_key="rpc_queue",
            properties=pika.BasicProperties(
                reply_to=self.callback_queue, correlation_id=self.corr_id
            ),
            body=body,
        )
        while self.response is None:
            self.connection.process_data_events()
        return self.response


@app.route("/api/game", methods=["GET", "POST"])
@cross_origin()
def getGameContent():
    if request.method == "POST":
        try:
            req = request.get_json()
            username = req["username"]
            gender = req["gender"]
            first_name = req["first_name"]
            last_name = req["last_name"]
            score = req["score"]
            old_user = User.query.get(username)
            if old_user != None:
                old_user.score = score
                total_score = old_user.total_score
                old_user.times = old_user.times + 1
                old_user.total_score = old_user.total_score + score
                old_user.date_created = datetime.now()
                rpc = DemoRpcClient()
                response = rpc.call(
                    {
                        "total": int(total_score),
                        "new": int(score),
                        "times": int(old_user.times),
                    }
                )
                old_user.aver_score = response["avg"]
            else:
                new_user = User(username, first_name, last_name, gender, score)
                db.session.add(new_user)
            db.session.commit()
            return "Save Successfully"

        except:
            print("Failed to update sqlite table")
            return "Save Not Successfully"
        users = User.query.all()
        users_schema = UserSchema(many=True)
        users_data = users_schema.dump(users)
    else:
        users = User.query.order_by(User.aver_score.desc()).all()
        users_schema = UserSchema(many=True)
        users_data = users_schema.dump(users)

        return jsonify({"user": users_data})


@app.route("/time")
@cross_origin()
def get_current_time():
    return jsonify({"time": time.time()})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
