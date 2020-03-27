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
        <v-card-title color="green" class="headline">Logowanie</v-card-title>
     <div class="pl-4 pr-4 pt-3 pb-3">
         <v-text-field
                 v-model="US_Name"
                 :counter="6"
                 :rules="[rules.required, rules.min]"
                 hint="Minimum 6 znaków"
                 label="Name"
                 required
         ></v-text-field>
         <v-text-field
                 v-model="US_PASS"
                 :type="show1 ? 'text' : 'password'"
                 hint="Minimum 8 znaków"
                 :counter="6"
                 :rules="[rules.required, rules.min]"
                 :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                 @click:append="show1 = !show1"
                 label="Hasło"
         ></v-text-field>
         <v-layout align-center justify-center>
        <v-btn color="accent" dark

          @click="register">Loguj
            </v-btn>
         </v-layout>
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
        show1: false,
        US_Name: '',
        US_PASS: '',
        rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 6 || 'Min 8 characters'
        }
    }
  },
  methods: {
    async register () {
      const response = await AuthenticationService.register({
        US_Name: this.US_Name,
        US_PASS: this.US_PASS
      })
      console.log(response.data)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
