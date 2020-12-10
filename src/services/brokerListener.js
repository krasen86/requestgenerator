const {MQTT} = require( './mqttConnector');
const {LoadTestRunner} = require( "./loadTestRunner");
let storage = require('./requestResponseStorage');

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
                let responses = storage.responses;
                responses.push(response);
                //console.log(responses)

            }
        })
    }
}

module.exports.BrokerListener = BrokerListener;