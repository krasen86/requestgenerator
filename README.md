# Dentistimo RequestGenerator
The requestGenerator sends a number of booking requests to the [booking component](https://git.chalmers.se/courses/dit355/2020/group-2/booking) in order to test the fault-tolerance. The number of requests is defined by the end-user through the website UI.

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

