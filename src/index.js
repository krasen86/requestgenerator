const {BrokerListener} = require( "./services/brokerListener");
const {Subscriber} = require( "./services/subscriber");
const {MQTT} = require("./services/mqttConnector");

MQTT.on('connect', function () {
      let subscriber = new Subscriber();
      subscriber.subscribeToTopic("availability/1");
      subscriber.subscribeToTopic("response/#");
      let brokerListener = new BrokerListener();
      brokerListener.listenForMessage();
})






