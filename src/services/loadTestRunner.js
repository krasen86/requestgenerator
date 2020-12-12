const {BookingGenerator} = require( "./bookingGenerator");
const {Publisher} = require( "./publisher");
const {Subscriber} = require("./subscriber");
let storage = require('./requestResponseStorage');
const {RequestResponseComparator} = require("./requestResponseComparator");

class LoadTestRunner {
    constructor() {
    }
    async startLoadTest(number, message) {
        console.log(message)
        let availability = message;
        let bookingDateAndTime = [];
        let numberOfRequestsToSend = number;
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
        for (let i = 0; i < numberOfRequestsToSend; i++) {
            setTimeout(function(){
                let request = booking.createRequest(bookingDateAndTime[i].date, bookingDateAndTime[i].timeSlot);
                let requests = storage.requests;
                publisher.publishToBroker(request);
                request.sendAt = Date.now();
                requests.push(request);
                if (i === numberOfRequestsToSend-1) {
                    let comparator = new RequestResponseComparator();
                    comparator.compare();
                }
            }, i*100, numberOfRequestsToSend);
        }
    }

}

module.exports.LoadTestRunner = LoadTestRunner;


