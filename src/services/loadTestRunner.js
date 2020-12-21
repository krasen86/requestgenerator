const {BookingGenerator} = require( "./bookingGenerator");
const {Publisher} = require( "./publisher");
const {Subscriber} = require("./subscriber");
import store from "../store";

export default class LoadTestRunner {
    constructor() {
        this.repeated = false;
    }
    async startLoadTest(number, message) {
        let availability = message;
        let bookingDateAndTime = [];
        let numberOfRequestsToSend = number;
        for (let i = 0; i < availability.length; i++) {
            let date = availability[i].date;
            for (let j = 0; j < availability[i].timeslots.length; j++) {
                let timeSlotTime = availability[i].timeslots[j].time;
                bookingDateAndTime.push({"date": date, "timeSlot": timeSlotTime});
            }
        }
        let subscriber = new Subscriber();
        subscriber.topicUnSubscriber("availability/1");
        let booking = new BookingGenerator();
        let publisher = new Publisher();
        for (let i = 0; i < numberOfRequestsToSend; i++) {
            let _this = this;
            let _message = message;
            setTimeout(function(){
                let request = booking.createRequest(bookingDateAndTime[i].date, bookingDateAndTime[i].timeSlot);
                publisher.publishToBroker(request);
                store.dispatch("requests/addRequests" , request);
                if (i===numberOfRequestsToSend-1 && !_this.repeated && numberOfRequestsToSend > 100) {
                    setTimeout(function () {
                        _this.repeated = true;
                        _this.startLoadTest(numberOfRequestsToSend, _message);
                    }, 10010);
                }
            }, i*10, numberOfRequestsToSend);
        }
    }

}

