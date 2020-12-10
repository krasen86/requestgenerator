const {BookingGenerator} = require( "./bookingGenerator");
const {Publisher} = require( "./publisher");
const {Subscriber} = require("./subscriber");
const {RequestResponseComparator} = require("./requestResponseComparator")

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
        let subscriber = new Subscriber();
        subscriber.topicUnSubscriber("availability/1");
        let booking = new BookingGenerator();
        let publisher = new Publisher();
        let comparator = new RequestResponseComparator();
        for (let i = 0; i < 100; i++) {
            setTimeout(function(){
                console.log(i);
                let request = booking.createRequest(bookingDateAndTime[i].date, bookingDateAndTime[i].timeSlot);
                comparator.requests.push(request);
                publisher.publishToBroker(request);
            }, i*100);
        }
    }


}

module.exports.LoadTestRunner = LoadTestRunner;


