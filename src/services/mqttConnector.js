const mqtt = require('mqtt');
const variables = require("../config/variables");

module.exports.MQTT = mqtt.connect(variables.URL);