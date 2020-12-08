const {MQTT} = require( './mqttConnector');
const {StressTestRunner} = require( "./stressTestRunner");

class BrokerListener {
    constructor() {
    }
    listenForMessage() {
        MQTT.on('message', function (topic, message) {
            if (topic === "availability/1") {
                let stressTestRunner = new StressTestRunner();
                console.log("Called")
                stressTestRunner.startStressTest(message);
            }
            else {
                //console.log(JSON.parse(message))
            }
        })
    }

}

module.exports.BrokerListener = BrokerListener;