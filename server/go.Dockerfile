FROM golang:1.15

RUN go get -d -v github.com/streadway/amqp github.com/google/uuid
# RUN go install -v github.com/streadway/amqp github.com/google/uuid
WORKDIR /app
COPY . .

CMD go run amqp_server.go
