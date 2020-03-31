<template>
    <v-layout>
        <v-flex xs12 sm10 offset-sm1>
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
                                v-model="US_PASS"
                                :type="'password'"
                                :rules="[rules.required]"
                                label="Powturz hasło"
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
                                :disabled="disabled"
                                :items=Hale
                                item-text="NazwaHali"
                                item-value="ID_Hala"
                                :rules="[rules.required]"
                                label="Wybierz halę na której pracujesz">
                        </v-select>
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
                Hale: '',
                disabled: true,
                items: [
                    "Operator", "Automatyk", "Mechanik"
                ],
                Profesje: '',
                show1: false,
                US_Name: '',
                US_PASS: '',
                US_SUER_NAME: '',
                US_LOGIN: '',
                US_PROFESJA: '',
                Hala_ID: '',
                rules: {
                    required: value => !!value || 'To pole nie może być puste.',
                    min: v => v.length >= 6 || 'Min 6 znaków'
                }
            }
        },
        watch: {
            Profesje: function () {
                console.log('ddddddddd')
                this.disable="false";
            }
        },
        methods: {
            async register() {
                const response = await AuthenticationService.register({
                    US_Name: this.US_Name,
                    US_PASS: this.US_PASS,
                    US_SUER_NAME: this.US_SUER_NAME,
                    US_LOGIN: this.US_LOGIN,
                    US_PROFESJA: this.Profesje,
                    Hala_ID: this.listaHal.Hala_ID,
                });
                console.log(response.data)
            },
        },
        async mounted() {
            this.Hale = (await AuthenticationService.getHale()).data;
            console.log('Hale: ', this.Hale)
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
