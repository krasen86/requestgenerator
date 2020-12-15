class BookingGenerator {
    constructor() {
    }
    createRequest(date, time){
        return {
            "userid": this.generateUserId(),
            "requestid": this.generateRequestId(),
            "dentistid": 1,
            "issuance": this.generateIssuance(),
            "time": date + " " + time.split(" ", 1) //split the timeslot string and only keep start time.
        }
    }
    generateUserId(){
        return"uuid-"+((new Date).getTime().toString(16)+Math.floor(1E7*Math.random()).toString(16));
    }
    generateRequestId(){
        return (Math.round((Date.now() * Math.random()) /10000000000))// 2-3 digits
    }
    generateIssuance(){
        return Date.now()
    }
}

module.exports.BookingGenerator = BookingGenerator;


