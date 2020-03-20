<template>
    <v-row
            align="center"
            justify="center"
    >
        <v-col
                cols="12"
                sm="8"
                md="4"
        >
    <v-card>
        <v-card-title color="green" class="headline">Unlimited music now</v-card-title>

        <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline.</v-card-subtitle>

        <v-card-text>
            <div>
                <h3>Logowanie</h3>
            </div>
        </v-card-text>
     <div class="pl-4 pr-4 pt-2 pb-2">
         <v-text-field
                 v-model="name"
                 :counter="10"
                 :rules="nameRules"
                 label="Name"
                 required
         ></v-text-field>
         <v-text-field
                 v-model="email"
                 :rules="emailRules"
                 label="E-mail"
                 required
         ></v-text-field>
        <v-btn color="warning" dark
          @click="register">Register</v-btn>
      </div>
    </v-card>
    </v-col>
    </v-row>
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
