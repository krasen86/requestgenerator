const {MQTT} = require( './mqttConnector');

class Subscriber {
    constructor() {
    }
    connectToBroker() {
        MQTT.on('connect',  ()  => {
        })
    }

    subscribeToTopic(topic) {
        MQTT.subscribe(topic,  ()  => {
        })
    }
    topicUnSubscriber(topic) {
        MQTT.unsubscribe(topic, () => {
        })
    }

}

module.exports.Subscriber = Subscriber;