<template>

    <v-layout>

        <v-flex xs2 sm8 offset-sm2>
<dialog-date-time></dialog-date-time>
            <v-card class="pq-2"
                    max-width="auto"
                    color="secondary"
            >
                <v-card-title class="primary font-weight-bold headline justify-space-between">Nowa interwencja:
                    {{maszynka.NazwaMaszyny}}
                    <span>{{dataGodzina}}
                        <v-tooltip bottom>
                            <template v-slot:activator="{on}">
                        <v-btn x-small
                               fab small
                               v-on="on"
                        @click=OpenDialogDateTime()>
                        <v-icon>mdi-calendar</v-icon>
                        </v-btn>
                            </template>
                            <span>Zmiana daty interwencji</span>
                        </v-tooltip>
                    </span>
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
                <v-radio-group v-model="AW_Zrealizowane" row>Status awarii:
                    <v-radio color="red" label="Zgłoszenie" value="Zgłoszenie"></v-radio>
                    <v-radio color="orange" label="Oczekiwanie na części" value="Oczekiwanie na części"></v-radio>
                    <v-radio color="orange" label="Oczekiwanie na zatrzymanie"
                             value="Oczekiwanie na zatrzymanie"></v-radio>
                    <v-radio color="green" label="Zakończone" value="Zakończone"></v-radio>
                </v-radio-group>
                <v-card-actions>
                    <v-btn color="orange"
                           @click="AddNewFailure">Zapisz
                    </v-btn>
                    <v-btn color="orange"
                           @click="pageBack"
                    >Anuluj
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>

    import FailureService from "../../services/FailureService";
    import moment from 'moment';
    import store from "../../store/store";
    import DialogDateTime from "../../components/dialogDateTime";


    export default {
        components: {DialogDateTime},
        props: {
            source: String,
        },
        data() {
            return {
                dialog:'',
                maszynka: '',
                newFailure: '',
                dataGodzina: '',
                user: '',
                dataZakonczeniaView: false,
                AW_DataZgloszenia: '',
                Maszyna_ID: '',
                AW_Zglaszajacy_ID: '',
                AW_OpisAwarii: '',
                AW_Zrealizowane: 'Zgłoszenie',
                AW_Dzialania: '',
                NowaAwaria: {},
                rules: {
                    required: value => !!value || 'To pole nie może być puste.',
                    min: v => v.length > 25 || 'Min 25 znaków'
                }
            }
        },
        created() {
            moment.locale('pl');
            this.dataGodzina = moment().format('lll');
        },
        async mounted() {
            try {
                this.maszynka = (await FailureService.getMaszyna(this.$route.params)).data;

                //Get User login to system
                this.user = store.getters.user;

                //Get date from dialogDateTime
                this.$root.$on('data',(DataCzas) => {
                    this.dataGodzina = moment(DataCzas).format('lll');
                })
            } catch (e) {
                console.log(e)
            }
        },
        methods: {
            async AddNewFailure() {
                try {
                    const response = await FailureService.addNewFailure({
                        Maszyna_ID: this.maszynka.ID_Maszyna,
                        AW_Zglaszajacy_ID: this.user.ID_USER,
                        AW_OpisAwarii: this.AW_OpisAwarii,
                        AW_Dzialania: this.AW_Dzialania,
                        AW_Zrealizowane: this.AW_Zrealizowane
                    })
                    this.NowaAwaria = await response.data;
                    alert('Awaria nr: ' + this.NowaAwaria.ID_AWARIA + ', maszyny ' + this.maszynka.NazwaMaszyny + ' została poprawnie zapisana!')
                } catch (e) {
                    console.log(e)
                }
            },
            OpenDialogDateTime() {
                const open = true
                this.$root.$emit('openDialog', open);
            },
            pageBack() {
                this.$router.go(-1)
            }
        },
        watch: {
            AW_Zrealizowane: function () {
                if (this.AW_Zrealizowane === 'Zakończone'){
                    this.dataZakonczeniaView = true;
                }
            }
        }
    }
</script>
