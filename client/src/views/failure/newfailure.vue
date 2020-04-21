<template>
    <v-layout>
        <v-flex xs2 sm8 offset-sm2>
            <v-card class="pq-2"
                    max-width="auto"
                    color="secondary"
            >
                <v-card-title class="primary font-weight-bold justify-space-between">Nowa interwencja:
                    {{maszynka.NazwaMaszyny}}<span>{{dataGodzina}}</span>
                </v-card-title>
                <v-card-subtitle class="pt-10 font-weight-bold">
                    <span>{{maszynka.NazwaTypu}}<br></span>
                    <span>{{maszynka.NazwaHali}}</span>

                </v-card-subtitle>
                <v-card-text>
                    <v-textarea
                            v-model="AW_OpisAwarii"
                            background-color="white"
                            color="black"
                            label="Opisz awarię"
                            hint="Minimum 25 znaków"
                            :counter="25"
                            :rules="[rules.required, rules.min]"
                            outlined
                            rows="3"
                    ></v-textarea>
                    <v-textarea
                            v-model="AW_Dzialania"
                            background-color="white"
                            color="black"
                            label="Opisz jakie działania zostały podjete aby usunąć usterkę"
                            hint="Minimum 25 znaków"
                            :counter="25"
                            :rules="[rules.required, rules.min]"
                            outlined
                            rows="3"
                    ></v-textarea>
                    <span>Zgłaszający: {{user.US_Name}} {{user.US_SUER_NAME}} {{user.US_PROFESJA}}</span>
                </v-card-text>
                <hr>
                <v-radio-group v-model="AW_Zrealizowane" row >Status awarii:
                    <v-radio color="red" label="Zgłoszenie" value="Zgłoszenie"> </v-radio>
                    <v-radio color="orange" label="Oczekiwanie na części" value="Oczekiwanie na części"></v-radio>
                    <v-radio color="orange" label="Oczekiwanie na zatrzymanie" value="Oczekiwanie na zatrzymanie"></v-radio>
                    <v-radio color="green" label="Zakończone" value="Zakończone"></v-radio>
                </v-radio-group>
                <v-card-actions>
                    <v-btn flat color="orange"
                    @click="AddNewFailure">Zapisz</v-btn>
                    <v-btn flat color="orange"
                           @click="pageBack"
                    >Anuluj</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>

    import FailureService from "../../services/FailureService";
    import moment from 'moment';
    import store from "../../store/store";

    export default {
        props: {
            source: String,
        },
        data() {
            return {
                maszynka: '',
                newFailure:'',
                dataGodzina: '',
                user:'',
                AW_DataZgloszenia:'',
                Maszyna_ID:'',
                AW_Zglaszajacy_ID:'',
                AW_OpisAwarii:'',
                AW_Zrealizowane:'Zgłoszenie',
                AW_Dzialania:'',
                rules: {
                    required: value => !!value || 'To pole nie może być puste.',
                    min: v => v.length > 25 || 'Min 25 znaków'
                }
            }
        },
        async mounted() {
            try {
                this.maszynka = (await FailureService.getMaszyna(this.$route.params)).data;
                moment.locale('pl');
                this.dataGodzina = moment().format('lll');
                this.user = store.getters.user;
            } catch (e) {
                console.log(e)
            }
        },
        methods: {
            async AddNewFailure() {
                try {
                    await FailureService.addNewFailure({
                        Maszyna_ID: this.maszynka.ID_Maszyna,
                        AW_Zglaszajacy_ID: this.user.ID_USER,
                        AW_OpisAwarii: this.AW_OpisAwarii,
                        AW_Dzialania: this.AW_Dzialania,
                        AW_Zrealizowane: this.AW_Zrealizowane
                    }).then(
                        result => {
                            this.newfailure = result.data.ID_AWARIA

                    console.log(result) }
                )
                }
                catch (e) {
                    console.log(e)
                }
            },
            pageBack(){
                this.$router.go(-1)
        }
        }
    }
</script>
