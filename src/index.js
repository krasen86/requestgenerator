const {BrokerListener} = require( "./services/brokerListener");
const {Subscriber} = require( "./services/subscriber");
const {MQTT} = require("./services/mqttConnector");
const {RequestResponseComparator} = require("./services/requestResponseComparator")
let storage = require('./services/requestResponseStorage');

MQTT.on('connect', function () {
      let subscriber = new Subscriber();
      subscriber.subscribeToTopic("availability/1");
      subscriber.subscribeToTopic("response/#");
      let brokerListener = new BrokerListener();
      brokerListener.listenForMessage();

      let timeout = setTimeout(function(){
            if (storage.requests.length > 0) {
                  let comparator = new RequestResponseComparator();
                  comparator.compare();
                  timeout();
            }
            else {
                  clearTimeout(timeout);
                  MQTT.end();
            }
             }, 30000);
})






