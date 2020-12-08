const {MQTT} = require("./mqttConnector")

class Publisher {

    constructor() {
    }
    publishToBroker(request) {
        MQTT.publish("request", JSON.stringify(request),{qos:2, retain: false});
    }
}

module.exports.Publisher = Publisher;


