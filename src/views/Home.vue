<template>
  <div>
    <div>
      <h2>Requests Generator</h2>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="requests">Number of Requests per 10s</label>
        <input name="requests" id="requests" type="number" class="form-control" :disabled="show" v-model="numberOfRequests"/>
      </div>
      <b-button type="submit" v-if="!show" :disabled=!requestEntered variant="primary">Start Test</b-button>
      <b-button v-if="show" @click="resetData" variant="primary">New Test</b-button>
    </form>
    <b-card class="mt-3" v-if="!this.availability" header="Error">
      <pre class="m-0">Availability component is offline</pre>
    </b-card>
    <div v-if="requests.length > 0">
      <b-col class="text-center"><hr>
        <h2 class="text-center">Requests</h2>
        <table align="center">
          <tr>
            <th>UserId</th>
            <th>DentistID</th>
            <th>Issuance/Send at</th>
            <th>RequestId</th>
            <th>Time</th>
            <th>Booked</th>
            <th>Response Received At</th>
            <th>Response Time in milliseconds</th>
          </tr>
          <tr v-for="(request, index) in requests" :key="index">
            <td>{{ request.userid }}</td>
            <td>{{ request.dentistid }}</td>
            <td>{{ new Date(request.issuance).toISOString() }}</td>
            <td>{{ request.requestid }}</td>
            <td>{{ request.time }}</td>
            <td>{{request.response ? request.response.time ? "Booked": "Not Booked" : ""}}</td>
            <td>{{ request.response ? new Date(request.response.receivedAt).toISOString() : "" }}</td>
            <td>{{ request.response ? request.response.receivedAt - request.issuance : "" }}</td>
          </tr>
        </table>
      </b-col>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      numberOfRequests: Number,
      show: false
    }
  },
  computed: {
    ...mapGetters({availability : 'requests/getAvailability'}),
    requestEntered(){
      return this.numberOfRequests > 0 && this.availability
    },
    requests() {
      return this.$store.getters['requests/getRequests'];
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('requests/startTest', this.numberOfRequests);
      this.show = true;
      this.numberOfRequests = null;
    },
    resetData() {
      this.$store.dispatch('requests/resetState');
      this.show = false;
    }
  }
}
</script>
<style scoped>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>