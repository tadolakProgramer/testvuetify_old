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
    import store from "../store/store";

    export default {
        data() {
            return {
                LoginError: null,
                alert: false,
                US_LOGIN: 'ONA',
                US_PASS: 'ONAONA',
                show1: false,
            }
        },
        methods: {
            async login() {
                try {
                    const response = await AuthenticationService.login({
                        US_LOGIN: this.US_LOGIN,
                        US_PASS: this.US_PASS
                    })
                    await this.$store.dispatch('setToken', response.data.token)
                    await this.$store.dispatch('setUser', response.data.user)

                    this.user = store.getters.user;
                    await this.$store.dispatch('setProfesja', this.user.US_PROFESJA)
                    //send loginOk to Header
                    this.$root.$emit('loginOK', true, false);

                    if (store.getters.profesja ==='Operator'){
                        this.$router.push({name: 'notification'})
                        this.$root.$emit('loginOK', true, false)
                    }
                    if (store.getters.profesja === 'Automatyk'){
                        this.$router.push({name: 'failure'})
                        this.$root.$emit('loginOK', true, true)
                        }

                    /*
                    this.IdHala = this.user.ID_Hala
                    //this.$router.push({name: 'notification', params:{IdHala:this.IdHala}})
                    */

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
        background-size: cover;
        background: #00b0ff url('../assets/MG_8241_1.jpg') no-repeat fixed center;
    }
</style>

<!--TODO
    block scroll page-->
