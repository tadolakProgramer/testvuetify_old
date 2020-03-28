<template>
    <v-layout>
        <v-flex xs12 sm10 offset-sm1>

            <v-card  class="pa-4" color="secondary">
                <v-card-title color="green" class="headline">Nowy użytkownik</v-card-title>
                    <v-row>
                        <v-col cols="8" sm="4" md="4">
                                <v-text-field
                                        v-model="US_Name"
                                        :rules="[rules.required]"
                                        hint="Wpisz swoje imię"
                                        label="Imię"
                                        required
                                ></v-text-field>
                        </v-col>
                            <v-col cols="8" sm="4" md="4">
                                <v-text-field
                                        v-model="US_SUER_NAME"
                                        :rules="[rules.required]"
                                        hint="Wpisz swoje nazwisko"
                                        label="Nazwisko"
                                        required
                                ></v-text-field>
                            </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="8" sm="6" md="6">
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
                            </v-col>
                        <v-col cols="8" sm="6" md="6">
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
                        </v-col>
                    </v-row>
                    <v-layout align-center justify-center>
                        <v-btn color="accent" dark
                               @click="register">Loguj
                        </v-btn>
                    </v-layout>
            </v-card>
            </v-flex>
        </v-layout>

</template>

<script>
    import AuthenticationService from '../services/AuthenticationService'

    export default {
        data() {
            return {
                show1: false,
                US_Name: '',
                US_PASS: '',
                US_SUER_NAME: '',
                rules: {
                    required: value => !!value || 'To pole nie może być puste.',
                    min: v => v.length >= 6 || 'Min 6 znaków'
                }
            }
        },
        methods: {
            async register() {
                const response = await AuthenticationService.register({
                    US_Name: this.US_Name,
                    US_PASS: this.US_PASS,
                    US_SUER_NAME: this.US_SUER_NAME
                })
                console.log(response.data)
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
