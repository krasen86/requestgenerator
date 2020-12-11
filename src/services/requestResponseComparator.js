let storage = require('./requestResponseStorage');
class RequestResponseComparator{
    responsesReceived;
    constructor() {
        this.responsesReceived = false;
    }

    compare(){
        let responses = storage.responses;
        let requests = storage.requests;
        this.responsesReceived = responses.length === requests.length;
        if(!this.responsesReceived) {
            setTimeout(function () {
                let comparator = new RequestResponseComparator();
                comparator.compareArrays()
            }, 10000);
        }
        else if (this.responsesReceived) {
            this.compareArrays();
        }
    }
    compareArrays() {
        let responses = storage.responses;
        let requests = storage.requests;
        let responseIds = responses.map(response => { return response.userid});
        let requestsIds =  requests.map(request => { return  request.userid});
        let compared = responseIds.filter(id => requestsIds.includes(id));
        console.log("--------Test------------");
        console.log("Clinic id: " + storage.requests[0].dentistid);
        console.log("Number of sent Requests within 10s: " + storage.requests.length);
        console.log("Number of received Responses: " + storage.responses.length);
        console.log("Matching request response pairs: " + compared.length);
        if (compared.length > 0) {
            let totalTime = 0;
            for (let i = 0; i < compared.length; i++) {
                totalTime += (  responses.filter(obj =>{ return obj.userid === compared[i]})[0].receivedAt
                    - requests.filter(obj =>{ return obj.userid === compared[i]})[0].sendAt);
            }
            console.log("Average response time in milliseconds: " + totalTime/compared.length)
        }
        if (responses.length > 0) {
            let responseSucceed = responses.filter(response => { if (response.time) return response});
            let responseFailed = responses.filter(response => { if (!response.time) return response});
            console.log("Number of approved responses: " + responseSucceed.length );
            console.log("Number of declined responses: " + responseFailed.length );
        }
        console.log("--------------------------");
        storage.requests = [];
        storage.responses = [];
    }


}
module.exports.RequestResponseComparator = RequestResponseComparator;