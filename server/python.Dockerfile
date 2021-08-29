FROM python:3.8
RUN pip3 install -U flask-sqlalchemy marshmallow-sqlalchemy
RUN pip3 install flask flask_sqlalchemy
RUN pip3 install flask-marshmallow
RUN pip3 install pika
RUN pip3 install -U flask-cors
WORKDIR /app
COPY . .

# for ZeroMQ server
EXPOSE 5000
CMD python3 server.py