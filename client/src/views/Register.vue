<template>
    <v-layout>
        <v-flex xs12 sm10 offset-sm1>
            <v-form
                    ref="form"
                    v-model="valid"
                    :lazy-validation="lazy"
            >
                <v-card class="pa-4" color="secondary">
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
                    <v-divider
                            class="mx-lg-4"
                    ></v-divider>
                    <v-row>
                        <v-col cols="8" sm="4" md="4">
                            <v-text-field
                                    v-model="US_LOGIN"
                                    :rules="[rules.required]"
                                    hint="Wpisz swoje Login"
                                    label="Login"

                            ></v-text-field>
                        </v-col>
                        <v-col cols="8" sm="4" md="4">
                            <v-text-field
                                    v-model="US_PASS"
                                    :type="show1 ? 'text' : 'password'"
                                    hint="Minimum 6 znaków"
                                    :counter="6"
                                    :rules="[rules.required, rules.min]"
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append="show1 = !show1"
                                    label="Hasło"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="8" sm="4" md="4">
                            <v-text-field
                                    v-model="US_PASS_CONFIRM"
                                    :type="'password'"
                                    :rules="[rules.required, rules.confirmPass]"
                                    :error-messages="error"
                                    label="Powtórz hasło"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-divider
                            class="mx-lg-4"
                    ></v-divider>
                    <v-row>
                        <v-col cols="8" sm="4" md="4">
                            <v-select
                                    v-model="Profesje"
                                    :items="items"
                                    :rules="[rules.required]"
                                    label="Wybierz profesję">
                            </v-select>
                        </v-col>
                        <v-col cols="8" sm="4" md="4">
                            <v-select
                                    v-model="listaHal"
                                    :disabled="disable"
                                    :items=Hale
                                    item-text="NazwaHali"
                                    item-value="ID_Hala"
                                    :rules="[rules.required]"
                                    label="Wybierz halę na której pracujesz">
                            </v-select>
                        </v-col>

                    </v-row>
                    <v-alert
                            :value="alert2"
                            type="success"
                            elevation="2"
                            transition="scale-transition"
                    >{{ServerMessage2}}
                    </v-alert>
                    <v-alert
                            :value="alert"
                            type="error"
                            elevation="2"
                            transition="scale-transition"
                    >{{ServerMessage}}
                    </v-alert>
                    <v-card-actions >
                        <v-btn color="accent"
                               dark
                               :disabled="!valid"
                               @click="register">Dodaj
                        </v-btn>
                        <v-btn color="orange"
                               @click="pageBack"
                        >Anuluj
                            <v-icon right>mdi-cancel</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-flex>
    </v-layout>

</template>

<script>
    import AuthenticationService from '../services/AuthenticationService'

    export default {
        data() {
            return {
                ServerMessage: null,
                alert: false,
                alert2: false,
                valid: false,
                lazy: '',
                Hale: [],
                items: [
                    'Operator', 'Automatyk', 'Mechanik', 'Kierownik','Admin','Gość'
                ],
                Profesje: '',
                show1: false,
                US_Name: '',
                US_PASS: '',
                US_PASS_CONFIRM: '',
                US_SUER_NAME: '',
                US_LOGIN: '',
                US_PROFESJA: '',
                Hala_ID: '',
                listaHal: '',
                disable: true,
                type: "error",
                rules: {
                    required: value => !!value || 'To pole nie może być puste.',
                    min: v => v.length >= 6 || 'Min 6 znaków',
                    confirmPass: v => v === this.US_PASS || 'Hasła są różne'
                }
            }
        },
        watch: {
            //Kontrola czy wybrany Operator
            Profesje: function () {
                if (this.Profesje === "Operator") {
                    this.disable = false;
                } else {
                    this.disable = true;
                    this.US_PROFESJA = '';
                    this.listaHal = '0';
                }
            },
            US_LOGIN: function () {
                if (this.alert) {
                    this.alert = false
                }
            }
        },
        methods: {

            validate () {
                this.$refs.form.validate()
            },

            async register() {
                try {
                    const response = await AuthenticationService.register({
                        US_Name: this.US_Name,
                        US_PASS: this.US_PASS,
                        US_SUER_NAME: this.US_SUER_NAME,
                        US_LOGIN: this.US_LOGIN,
                        US_PROFESJA: this.Profesje,
                        Hala_ID: this.listaHal
                    });
                    await this.$store.dispatch('setToken', response.data.token)
                    await this.$store.dispatch('setUser', response.data.user)

                    this.ServerMessage2 = "Nowy użytkownik został dodany"
                    this.alert2 = true

                } catch (ServerMessage) {
                    this.type = "error"
                    this.alert = true
                    this.ServerMessage = ServerMessage.response.data.ServerMessage;

                }
            },
            pageBack() {
                this.$router.go(-1)
            }
        },
        async mounted() {
            this.items.sort()
            this.Hale = (await AuthenticationService.getHale()).data;
            console.log('Hale: ', this.Hale)
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

/* To do
Validate form */
