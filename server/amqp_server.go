// go run amqp_server.go
// based on https://www.rabbitmq.com/tutorials/tutorial-six-go.html

package main

import (
	"encoding/json"
	"github.com/streadway/amqp"
	"log"
	"time"

)

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

func get_avg_score(request map[string]int) map[string]float64 {
	total := request["total"]
	new := request["new"]
	times := request["times"]
	return map[string]float64{"avg": float64(total + new)/float64(times)}

}
func get_rq_connect()*amqp.Connection {
	for i := 0; i < 10; i++ {
		conn, err := amqp.Dial("amqp://rabbitmq:5672/")	
		if err == nil {
			return conn 
		}
		log.Println("Will retry to rabbitmq connect")
		time.Sleep(15 * time.Second)
	}
	log.Fatal("Failed to connect to RabbitMQ")
	return nil
}

func main() {
	conn := get_rq_connect()
	defer conn.Close()

	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")
	defer ch.Close()

	q, err := ch.QueueDeclare(
		"rpc_queue", // name
		false,       // durable
		false,       // delete when unused
		false,       // exclusive
		false,       // no-wait
		nil,         // arguments
	)
	failOnError(err, "Failed to declare a queue")

	err = ch.Qos(
		1,     // prefetch count
		0,     // prefetch size
		false, // global
	)
	failOnError(err, "Failed to set QoS")

	msgs, err := ch.Consume(
		q.Name, // queue
		"",     // consumer
		false,  // auto-ack
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // args
	)
	failOnError(err, "Failed to register a consumer")

	forever := make(chan bool)

	go func() {
		for d := range msgs {
			var request map[string]int

			json.Unmarshal(d.Body, &request)
			failOnError(err, "Failed to convert body")
			log.Printf("%s", request)
			// response := get_length(request)
			response := get_avg_score(request)
			body, _ := json.Marshal(response)

			err = ch.Publish(
				"",        // exchange
				d.ReplyTo, // routing key
				false,     // mandatory
				false,     // immediate
				amqp.Publishing{
					ContentType:   "text/plain",
					CorrelationId: d.CorrelationId,
					Body:          body,
				})
			failOnError(err, "Failed to publish a message")

			d.Ack(false)
		}
	}()

	log.Printf("Awaiting RPC requests")
	<-forever
}
