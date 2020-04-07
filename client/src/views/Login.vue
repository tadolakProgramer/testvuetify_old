<template>
    <div class="masthead scroll-off-screen">
        <v-card
                class="pa-6 ma-auto"
                max-width="344"
                outlined
                elevation="15"
                color="transparent"
        >
            <v-text-field
                    v-model="US_LOGIN"
                    hint="Wpisz swoje Login"
                    label="Login"
                    outlined
            ></v-text-field>
            <v-text-field
                    v-model="US_PASS"
                    :type="show1 ? 'text' : 'password'"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show1 = !show1"
                    label="Hasło"
                    outlined
            ></v-text-field>
            <v-alert
                    :value="alert"
                    type="error"
                    color="red"
                    outlined
                    elevation="2"
                    transition="scale-transition"
            >{{LoginError}}
            </v-alert>
            <v-card-actions>
                <v-layout align-center justify-center>
                    <v-btn
                            class="ma-2"
                            outlined
                            @click="login">
                        <v-icon left>mdi-account-outline</v-icon>
                        Loguj
                    </v-btn>
                </v-layout>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import AuthenticationService from '../services/AuthenticationService'

    export default {
        data() {
            return {
                LoginError: null,
                alert: false,
                US_LOGIN: '',
                US_PASS: '',
                show1: false,
            }
        },
        methods: {
            async login() {
                try {
                    await AuthenticationService.login({
                        US_LOGIN: this.US_LOGIN,
                        US_PASS: this.US_PASS
                    })
                    this.$router.push('/notification')
                } catch (LoginError) {
                    this.LoginError = LoginError.response.data.LoginError;
                    this.alert = true

                }
            }
        },
        watch: {
            US_LOGIN: function () {
                if (this.alert) {
                    this.alert = false
                }
            },
            US_PASS: function () {
                if (this.alert) {
                    this.alert = false
                }
            }
        }
    }
</script>

<style scoped>
    .masthead {
        min-height: 75rem;
        width: 100%;
        height: 100%;
        padding-top: 18rem;
        background: url('../assets/MG_8241_1.jpg') fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        background-color: #00b0ff;
    }
</style>

<!--TODO
    block scroll page-->
