const {BookingGenerator} = require( "./bookingGenerator");
const {Publisher} = require( "./publisher");
const {Subscriber} = require("./subscriber");
let storage = require('./requestResponseStorage');
const {RequestResponseComparator} = require("./requestResponseComparator");

class LoadTestRunner {
    constructor() {
    }

    async startLoadTest(message) {
        let availability = JSON.parse(message);
        let bookingDateAndTime = [];
        let numberOfRequestsToSend = 100;
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
                //console.log(i);
                let request = booking.createRequest(bookingDateAndTime[i].date, bookingDateAndTime[i].timeSlot);
                let requests = storage.requests;
                publisher.publishToBroker(request);
                request.sendAt = Date.now();
                requests.push(request);
                if (i === numberOfRequestsToSend) {
                    let comparator = new RequestResponseComparator();
                    comparator.compare();
                }
            }, i*100);

        }
    }

}

module.exports.LoadTestRunner = LoadTestRunner;


