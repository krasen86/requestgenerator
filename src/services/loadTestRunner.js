const {BookingGenerator} = require( "./bookingGenerator");
const {Publisher} = require( "./publisher");
const {Subscriber} = require("./subscriber");

class LoadTestRunner {
    constructor() {
    }


    async startStressTest(message) {
        let availability = JSON.parse(message);
        let bookingDateAndTime = [];
        for (let i = 0; i < availability.length; i++) {
            let date = Object.keys(availability[i])[0];
            for (let j = 0; j < availability[i][date].length; j++) {
                let timeSlot = Object.keys(availability[i][date][j])[0];
                bookingDateAndTime.push({"date": date, "timeSlot": timeSlot});
            }
        }
        let subsriber = new Subscriber();
        subsriber.topicUnSubscriber("availability/1");
        let booking = new BookingGenerator();
        let publisher = new Publisher();
        for (let i = 0; i < 100; i++) {
            setTimeout(function(){
                console.log(i);
                publisher.publishToBroker(booking.createRequest(bookingDateAndTime[i].date, bookingDateAndTime[i].timeSlot));
            }, i*100);
        }
    }
}

module.exports.LoadTestRunner = LoadTestRunner;


