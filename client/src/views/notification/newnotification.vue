<template>
    <v-layout>
        <v-flex xs2 sm8 offset-sm2>
            <v-card class="pq-2"
                    max-width="auto"
                    color="secondary"
            >
                <v-card-title class="primary font-weight-bold justify-space-between">Zgłoszenie awarii:
                    {{maszynka.NazwaMaszyny}}<span>{{dataGodzina}}</span>
                </v-card-title>
                <v-card-subtitle class="pt-10 font-weight-bold">
                    <span>{{maszynka.NazwaTypu}}<br></span>
                    <span>{{maszynka.NazwaHali}}</span>

                </v-card-subtitle>
                <v-card-text>
                    <v-textarea
                            background-color="white"
                            color="black"
                            label="Opisz awarię"
                            hint="Minimum 25 znaków"
                            :counter="25"
                            :rules="[rules.required, rules.min]"
                            outlined
                            rows="3"
                    ></v-textarea>
                    <span>Zgłaszający: {{user.US_Name}} {{user.US_SUER_NAME}} {{user.US_PROFESJA}}</span>
                </v-card-text>
                <v-card-actions>
                    <v-btn flat color="orange">Zapisz</v-btn>
                    <v-btn flat color="orange"
                    >Anuluj</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>

    import NotificationService from "../../services/NotificationService";
    import moment from 'moment';
    import store from "../../store/store";


    export default {
        props: {
            source: String,
        },
        data() {
            return {
                maszynka: '',
                dataGodzina: '',
                user:'',
                rules: {
                    required: value => !!value || 'To pole nie może być puste.',
                    min: v => v.length > 25 || 'Min 25 znaków'
                }
            }
        },
        async mounted() {
            try {
                this.maszynka = (await NotificationService.getMaszyna(this.$route.params)).data;
                moment.locale('pl');
                this.dataGodzina = moment().format('lll');
                this.user = store.getters.user;
            } catch (e) {
                console.log(e)

            }
        },
    }
</script>
