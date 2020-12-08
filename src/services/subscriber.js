const {MQTT} = require( './mqttConnector');

class Subscriber {
    constructor() {
    }
    connectToBroker() {
        MQTT.on('connect',  ()  => {
            console.log('Connected to Broker');
        })
    }

    subscribeToTopic(topic) {
        MQTT.subscribe(topic,  ()  => {
            console.log('Subscribed to ' + topic)
        })
    }
    topicUnSubscriber(topic) {
        MQTT.unsubscribe(topic, () => {
            console.log("Unsubscribed from " + topic)
        })
    }

}

module.exports.Subscriber = Subscriber;