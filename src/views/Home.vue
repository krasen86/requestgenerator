<template>
  <div>
    <div>
      <h2>Requests Generator</h2>
    </div>
    <form @submit.prevent="onSubmit" v-if="show">
      <div class="form-group">
        <label for="requests">Number of Requests per 10s</label>
        <input name="requests" id="requests" type="number" class="form-control" v-model="form.numberOfRequests"/>
      </div>
      <b-button type="submit" variant="primary">Start Test</b-button>
    </form>
    <b-card class="mt-3" v-if="!show" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
      form: {
        numberOfRequests: Number
      },
      show: true
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('requests/startTest', this.form.numberOfRequests);
    }
  }
}
</script>