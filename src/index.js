const {Publisher} = require( "./services/publisher");
const {MQTT} = require("./services/mqttConnector")

MQTT.on('connect', function () {
   let publisher = new Publisher();
   publisher.publishToBroker();

})






