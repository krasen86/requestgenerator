import store from "../store";
const {MQTT} = require( './mqttConnector');


export default class BrokerListener {
    constructor() {
    }
    listenForMessage() {
        MQTT.on('message', function (topic, message) {
            if (topic === "availability/1") {
                const buffer = message.toString('utf-8');
                store.dispatch('requests/addAvailability', JSON.parse(buffer));
            }
            else if (topic.includes("response")){
                const buffer = message.toString('utf-8');
                let response = JSON.parse(buffer);
                response.receivedAt = Date.now();
                store.dispatch("requests/addResponse",response);
            }
        })
    }
}
