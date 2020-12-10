const {MQTT} = require( './mqttConnector');
const {LoadTestRunner} = require( "./loadTestRunner");
const {RequestResponseComparator} = require("./requestResponseComparator")

class BrokerListener {
    constructor() {
    }
    listenForMessage() {
        MQTT.on('message', function (topic, message) {
            if (topic === "availability/1") {
                let stressTestRunner = new LoadTestRunner();
                console.log("Called")
                stressTestRunner.startStressTest(message);
            }
            else if (topic.includes("response")){
                const buffer = message.toString('utf-8');
                let response = JSON.parse(buffer);
                let comparator = new RequestResponseComparator();
                comparator.responses.push(response);
                console.log(comparator.responses)
                console.log(comparator.requests)
            }
        })
    }

}

module.exports.BrokerListener = BrokerListener;