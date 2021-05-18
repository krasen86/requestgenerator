# Dentistimo RequestGenerator
The requestGenerator sends a number of booking requests to the [booking component](https://github.com/krasen86/booking) in order to stress-test the system. The number of requests is defined by the end-user through the website UI. Every request-load over 100 requests will be repeated after 10 seconds in order to visualize the fault-tolerance.

## Project setup

### Prerequisites
In order to connect to the MQTT broker make sure the Broker is configured to accept websockets on port 1884
- ex. For Mosquitto Eclipse broker add to the mosquitto.conf file 

```
   port 1883
   listener 1884
   protocol websockets
``` 
- Install the dependency packages from npm
``` 
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

