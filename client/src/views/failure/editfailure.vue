<template>
    <v-layout>
        <v-flex>
            <dialog-date-time></dialog-date-time>
            <template>
                <v-row justify="center">
                    <v-dialog v-model="dialog" persistent max-width="390">
                        <v-card>
                            <v-card-title class="headline primary">Info</v-card-title>
                            <v-card-text>{{dialogText}}
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" @click="closeNewFailure">OK</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-row>
            </template>
            <v-card class="pq-2"
                    max-width="auto"
                    color="secondary"
            >
                <v-card-title class="primary font-weight-bold headline justify-space-between">Edycja interwencja nr {{maszynka.ID_AWARIA}} maszyny:
                    {{maszynka.NazwaMaszyny}}
                    <span>{{dataGodzinaView}}
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
                    <span>{{ maszynka.NazwaTypu }}  </span>
                    <span>{{ maszynka.NazwaHali }}</span>

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
                <v-radio-group v-model="AW_Zrealizowane" @change="changeRadioGroup" row >Status awarii
                    <v-radio color="red" label="Zgłoszenie" value="Zgłoszenie"></v-radio>
                    <v-radio color="orange" label="Oczekiwanie na części" value="Oczekiwanie na części"></v-radio>
                    <v-radio color="orange" label="Oczekiwanie na zatrzymanie"
                             value="Oczekiwanie na zatrzymanie"></v-radio>
                    <v-radio color="green" label="Zakończone" value="Zakończone" ></v-radio>
                    <div v-if="viewDataZakonczenia">{{AW_DataZakonczeniaView}}
                        <v-tooltip bottom>
                            <template v-slot:activator="{on}">
                                <v-btn x-small
                                       fab small
                                       v-on="on"
                                       @click=OpenDialogDateTimeEnd()>
                                    <v-icon>mdi-calendar</v-icon>
                                </v-btn>
                            </template>
                            <span>Zmiana daty zakończenia</span>
                        </v-tooltip>
                    </div>
                </v-radio-group>

                <v-card-actions>
                    <v-btn color="orange"
                           @click="AddNewFailure">Zapisz
                        <v-icon right>mdi-content-save</v-icon>
                    </v-btn>
                    <v-btn color="orange"
                           @click="pageBack"
                    >Anuluj
                        <v-icon right>mdi-cancel</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
            <v-row justify="center" class="mb-1"
            >
                <v-col md="3">
            <failure-workers></failure-workers>
                </v-col>
               <!-- <v-col md="6">
                    <failure-workers></failure-workers>
                </v-col>
                <v-col md="3">
                    <failure-workers></failure-workers>
                </v-col>-->
            </v-row>
        </v-flex>

    </v-layout>
</template>

<script>

    import FailureService from "../../services/FailureService";
    import moment from 'moment';
    import store from "../../store/store";
    import DialogDateTime from "../../components/dialogDateTime";
    import {mapMutations, mapGetters} from "vuex";
    import FailureWorkers from "../../components/failureWorkers";


    export default {
        components: {FailureWorkers, DialogDateTime},
        props: {
            source: String,
        },
        data() {
            return {
                dialog: '',
                dialogText: '',
                maszynka: '',
                newFailure: '',
                dataGodzina: '',
                user: '',
                dialogType: '',
                viewDataZakonczenia: false,
                ID_AWARIA: 0,
                AW_DataZgloszenia: '',
                Maszyna_ID: '',
                AW_Zglaszajacy_ID: '',
                AW_OpisAwarii: '',
                AW_Zrealizowane: 'Zgłoszenie',
                AW_Dzialania: '',
                AW_DataZakonczenia: '',
                AW_DataZakonczeniaView: '',
                dataGodzinaView:'',
                NowaAwaria: {},
                DataTimeEnd: '',
                rules: {
                    required: value => !!value || 'To pole nie może być puste.',
                    min: v => v.length > 25 || 'Min 25 znaków'
                }
            }
        },

        created() {
            moment.locale('pl');
            // this.dataGodzina = moment().format('lll');

        },
        computed: {
            DateTimeEnd() {
                return this.getDateTimeEnd
            },
            DateTimeStart() {
                return this.getDataTimeStart
            }
        },

        async mounted() {
            try {
                this.maszynka = (await FailureService.getOneFailure(this.$route.params)).data;
                this.ID_AWARIA = this.maszynka.ID_AWARIA
                this.dataGodzina = this.maszynka.AW_DataZgloszenia
                this.dataGodzinaView = moment(this.maszynka.AW_DataZgloszenia).format('lll')
                this.AW_OpisAwarii = this.maszynka.AW_OpisAwarii
                this.AW_Zrealizowane = this.maszynka.AW_Zrealizowane
                if (this.AW_Zrealizowane === 'Zakończone'){
                    this.changeRadioGroup()
                }
                this.AW_Dzialania = this.maszynka.AW_Dzialania
                this.AW_DataZakonczeniaView = moment(this.maszynka.AW_DataZakonczenia).format('lll')
                this.AW_DataZakonczenia = this.maszynka.AW_DataZakonczenia

                //Get User login to system
                this.user = store.getters.user;

                //Get date from dialogDateTime
                this.$root.$on('dataStart', (DataCzas) => {
                    this.dataGodzinaView = moment(DataCzas).format('lll');
                    this.dataGodzina = moment(DataCzas).format("MM DD YYYY hh:mm:ss", true);
                })

                this.$root.$on('dataEnd', (DataCzas) => {
                    this.AW_DataZakonczenia = moment(DataCzas).format("MM DD YYYY hh:mm:ss", true);
                    this.AW_DataZakonczeniaView = moment(DataCzas).format('lll');
                })
            } catch (e) {
                console.log(e)
            }
        },

        methods: {
            ...mapMutations([
                'setTitleDialog', 'setDialogType'
            ]),
            ...mapGetters([
                'getDateTimeEnd', 'getDataTimeStart']),

             async changeRadioGroup(){
                if (this.AW_Zrealizowane === 'Zakończone') {
                    this.viewDataZakonczenia = true;
                    if (this.AW_DataZakonczenia != null){
                        this.AW_DataZakonczenia = await moment(this.maszynka.AW_DataZakonczenia).format('lll')
                    }
                    else {
                        this.AW_DataZakonczenia = moment().format("MM DD YYYY hh:mm:ss", true);
                        this.AW_DataZakonczeniaView = moment().format('lll')
                    }
                } else {
                    this.viewDataZakonczenia = false;
                }
            },

            async AddNewFailure() {
                try {
                    const response = await FailureService.addNewFailure({
                        ID_AWARIA: this.ID_AWARIA,
                        Maszyna_ID: this.maszynka.ID_Maszyna,
                        AW_DataZgloszenia: this.dataGodzina,
                        AW_Zglaszajacy_ID: this.user.ID_USER,
                        AW_OpisAwarii: this.AW_OpisAwarii,
                        AW_Dzialania: this.AW_Dzialania,
                        AW_Zrealizowane: this.AW_Zrealizowane,
                        AW_DataZakonczenia:(this.AW_DataZakonczenia)
                    })
                    this.NowaAwaria = await response.data;
                    this.ID_AWARIA = this.NowaAwaria.ID_AWARIA
                    this.dialogText = 'Awaria nr: ' + this.NowaAwaria.ID_AWARIA + ', maszyny ' + this.maszynka.NazwaMaszyny + ' została poprawnie zapisana!'
                    this.dialog = true;
                } catch (e) {
                    console.log(e)
                }
            },
            async OpenDialogDateTime() {
                await this.setTitleDialog('Wystąpienie usterki')
                await this.setDialogType('Start')
                const open = true
                this.$root.$emit('openDialog', open);
            },
            async OpenDialogDateTimeEnd() {
                await this.setTitleDialog('Usunięcie usterki');
                await this.setDialogType('End');
                const open = true
                this.$root.$emit('openDialog', open);
            },
            closeNewFailure() {
                this.dialog = false
                this.pageBack()
            },
            pageBack() {
                this.$router.push({name:'failure'})
            }
        },

        watch: {

            DataTimeEnd() {
                console.log("Zmiana")
            }
        }
    }
</script>
