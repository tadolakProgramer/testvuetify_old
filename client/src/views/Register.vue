<template>
  <v-layout column>
    <v-flex>
      <div class="white elevation-15">
        <v-toolbar flay dense class="cyan" color="green">
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
        <input
          type="email"
          name="email"
          v-model="email"
          placeholder="email"/>
        <br>
        <input
          type="password"
          name="password"
          v-model="password"
          placeholder="password"/>
        <br>
        <button
          @click="register">Register</button>
      </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async register () {
      const response = await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
      console.log(response.data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
