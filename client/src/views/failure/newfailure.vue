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
                <v-card-actions>
                    <v-btn flat color="orange"
                    @click="AddNewFailure">Zapisz</v-btn>
                    <v-btn flat color="orange"
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
                dataGodzina: '',
                user:'',
                AW_DataZgloszenia:'',
                Maszyna_ID:'',
                AW_Zglaszajacy_ID:'',
                AW_OpisAwarii:'',
                AW_Zrealizowane:'',
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
                        AW_Zrealizowane: 'Zgłoszenie'
                    });
                }
                catch (e) {
                    console.log(e)
                }
            }
        }
    }
</script>
