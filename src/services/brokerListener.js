import store from "../store";
const {MQTT} = require( './mqttConnector');
let storage = require('./requestResponseStorage');



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
                let responses = storage.responses;
                response.receivedAt = Date.now();
                responses.push(response);
            }
        })
    }
}
