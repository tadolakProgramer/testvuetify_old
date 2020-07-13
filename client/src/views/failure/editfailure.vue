<template>
    <v-layout>
        <v-flex>
            <dialog-date-time></dialog-date-time>
            <template>
                <v-row justify="center">
                    <v-dialog v-model="dialogPytanie" persistent max-width="390">
                        <v-card>
                            <v-card-title class="headline red">Pytanie
                                <v-icon big right>mdi-delete</v-icon>
                            </v-card-title>
                            <v-card-text>{{dialogPytanieText}}
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red darken-1" @click="deleteOneFailure">Tak</v-btn>
                                <v-btn color="green darken-1" @click="dialogPytanie = false">Nie</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-row>
            </template>
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
                               :disabled="disabledEditZgloszenie"
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
                <v-card-subtitle>
                    <div class=" d-flex justify-space-between"> {{maszynka.NazwaTypu}}   {{maszynka.NazwaHali}}
                        <span></span> około: {{fromData}}
                    </div>
                </v-card-subtitle>
                <v-card-text>
                    <v-row>
                        <v-col cols="10" sm="2" md="3">
                            <v-select
                                    v-model="obszarMaszyny"
                                    :items=obszar
                                    :disabled="disabledEdit"
                                    item-text="OM_Nazwa"
                                    item-value="ID_OM"
                                    @change="changeHint"
                                    label="Obszar"
                                    inputmax="3"
                                    :hint="obszarMaszynyHint"
                            ></v-select>
                        </v-col>
                        <v-col cols="8" sm="4" md="2">
                            <v-text-field
                                    maxlength="3"
                                    v-model="AW_MO_Symbol"
                                    :disabled="disabledEdit"
                                    label="Symbol obszaru"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="8" sm="4" md="6" class="ma-lg-auto">
                            <v-radio-group v-model="AW_Typ" row  pa="1" ma="1" :disabled="disabledEdit" >Typ awarii
                                <v-radio color="green" label="Elektroniczna" value="A"></v-radio>
                                <v-radio color="blue" label="Mechaniczna" value="M"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                    <v-textarea
                            v-model="AW_OpisAwarii"
                            :disabled="disabledEditZgloszenie"
                            background-color="white"
                            color="black"
                            label="Opisz awarię"
                            hint="Minimum 25 znaków"
                            :counter="25"
                            :rules="[rules.required, rules.min]"
                            outlined
                            rows="2"
                    ></v-textarea>
                    <v-textarea
                            v-model="AW_Dzialania"
                            background-color="white"
                            :disabled="disabledEdit"
                            color="black"
                            label="Opisz jakie działania zostały podjete aby usunąć usterkę"
                            hint="Minimum 25 znaków"
                            :counter="25"
                            :rules="[rules.required, rules.min]"
                            outlined
                            rows="2"
                    ></v-textarea>
                    <span>Zgłaszający: {{US_Name}} {{US_SUER_NAME}}</span>
                </v-card-text>
                <hr>
                <v-radio-group v-model="AW_Zrealizowane" @change="changeRadioGroup" row
                               :disabled="disabledEdit"
                >Status awarii
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
                           :disabled="disabledEdit"
                           @click="AddNewFailure">Zapisz
                        <v-icon right>mdi-content-save</v-icon>
                    </v-btn>
                    <v-btn color="orange"
                           @click="pageBack"
                    >Anuluj
                        <v-icon right>mdi-cancel</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="red"
                           :disabled="disabledEditZgloszenie"
                           justify="end"
                           @click="deleteFailure"
                    >Usuń wpis
                        <v-icon right>mdi-delete</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
            <v-row justify="center" class="mb-1"
            >
                <v-col md="3">
            <failure-workers
                    :disable="disabledEdit">
            </failure-workers>
                </v-col>
               <v-col md="3">
                    <failure-parts
                            :disable="disabledEdit">
                    </failure-parts>
                </v-col>
                <!-- <v-col md="3">
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
    import DialogDateTime from "../../components/dialogs/dialogDateTime";
    import {mapMutations, mapGetters} from "vuex";
    import FailureWorkers from "../../components/failureWorkers";
    import FailureParts from "../../components/failureParts";


    export default {
        components: {FailureParts, FailureWorkers, DialogDateTime},
        props: {
            source: String,
        },
        data() {
            return {
                dialog: '',
                dialogPytanie:false,
                disabledEditZgloszenie: false,
                disabledEdit: false,
                dialogText: '',
                dialogPytanieText:'',
                maszynka: '',
                obszar:[],
                obszarMaszyny:[],
                obszarMaszynyHint:'',
                newFailure: '',
                dataGodzina: '',
                fromData:'',
                user: '',
                dialogType: '',
                viewDataZakonczenia: false,
                ID_AWARIA: 0,
                AW_DataZgloszenia: '',
                Maszyna_ID: '',
                AW_MO_Symbol:'',
                US_Name: '',
                US_SUER_NAME: '',
                AW_Zglaszajacy_ID: '',
                AW_Typ: '',
                AW_OpisAwarii: '',
                AW_Zrealizowane: 'Zgłoszenie',
                AW_Dzialania: '',
                AW_DataZakonczenia: '',
                AW_DataZakonczeniaView: '',
                AW_Realizujacy_ID: '',
                dataGodzinaView: '',
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
                return this.getDateTimeStart
            }
        },

        async mounted() {
            try {
                this.maszynka = (await FailureService.getOneFailure(this.$route.params)).data;
                this.ID_AWARIA = this.maszynka.ID_AWARIA
                this.dataGodzina = this.maszynka.AW_DataZgloszenia
                this.AW_MO_Symbol = this.maszynka.AW_MO_SYMBOL
                this.dataGodzinaView = moment(this.maszynka.AW_DataZgloszenia).format('lll')
                this.fromData = moment(this.maszynka.AW_DataZgloszenia).fromNow()
                this.AW_Typ = this.maszynka.AW_Typ
                this.AW_OpisAwarii = this.maszynka.AW_OpisAwarii
                this.AW_Zrealizowane = this.maszynka.AW_Zrealizowane
                this.AW_Realizujacy_ID = this.maszynka.AW_Realizujacy_ID
                this.US_Name = this.maszynka.US_Name
                this.US_SUER_NAME = this.maszynka.US_SUER_NAME
                if (this.AW_Zrealizowane === 'Zakończone') {
                    this.changeRadioGroup()
                }
                this.AW_Dzialania = this.maszynka.AW_Dzialania
                this.AW_DataZakonczeniaView = moment(this.maszynka.AW_DataZakonczenia).format('lll')
                this.AW_DataZakonczenia = this.maszynka.AW_DataZakonczenia

                this.obszar = (await FailureService.getMachinaArea({ID:this.maszynka.TypMaszynyID})).data;

                for (let k=0; k<this.obszar.length; k++) {
                    if (this.obszar[k].ID_OM === this.maszynka.ID_OM){
                        this.obszarMaszyny =(this.obszar[k].ID_OM)
                    }
                }
                //this.obszarMaszyny.push(this.AW_MO_ID)


                //Get User login to system
                this.user = store.getters.user;
                if (this.user.ID_USER === this.maszynka.ID_USER){
                    this.disabledEditZgloszenie = false;
                } else {
                    this.disabledEditZgloszenie = true;
                }
                if ((this.user.ID_USER === this.maszynka.AW_Realizujacy_ID) || (this.maszynka.AW_Realizujacy_ID === null)){
                    this.disabledEdit = false;
                } else {
                    this.disabledEdit = true;
                }

                //Get date from dialogDateTime
                this.$root.$on('dataStart', (DataCzas) => {
                    this.dataGodzinaView = moment(DataCzas).format('lll');
                    this.dataGodzina = moment(DataCzas).format("MM DD YYYY HH:mm:ss", true);
                })

                this.$root.$on('dataEnd', (DataCzas) => {
                    this.AW_DataZakonczenia = moment(DataCzas).format("MM DD YYYY HH:mm:ss", true);
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
                'getDateTimeEnd', 'getDateTimeStart']),

            async changeRadioGroup() {
                if (this.AW_Zrealizowane === 'Zakończone') {
                    this.viewDataZakonczenia = true;
                        this.AW_DataZakonczenia = moment().format("MM DD YYYY HH:mm:ss", true);
                        this.AW_DataZakonczeniaView = moment().format('lll')
                } else {
                    this.viewDataZakonczenia = false;
                }
            },

            async AddNewFailure() {
                try {
                    console.log(this.AW_DataZakonczenia)
                    const response = await FailureService.addNewFailure({
                        ID_AWARIA: this.ID_AWARIA,
                        Maszyna_ID: this.maszynka.ID_Maszyna,
                        AW_MO_ID: this.obszarMaszyny,
                        AW_MO_Symbol: this.AW_MO_Symbol,
                        AW_DataZgloszenia: this.dataGodzina,
                        AW_Realizujacy_ID: this.user.ID_USER,
                        AW_OpisAwarii: this.AW_OpisAwarii,
                        AW_Typ: this.AW_Typ,
                        AW_Dzialania: this.AW_Dzialania,
                        AW_Zrealizowane: this.AW_Zrealizowane,
                        AW_DataZakonczenia: this.AW_DataZakonczenia
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
                this.$router.push({name: 'failure'})
            },
            deleteFailure() {
                this.dialogPytanieText = 'Czy chcesz usunąć aktualny wpis? Tej czynności nie można już cofnąć!!!'
                this.dialogPytanie = true

            },
            async deleteOneFailure() {
                try {
                    await FailureService.deleteOneFailure(this.maszynka.ID_AWARIA)
                    this.dialogPytanie = false
                    this.pageBack()
                } catch (e) {
                    console.log(e)
                }
            },
            changeHint(){

                for(let h=0; h<this.obszar.length; h++){
                    if (this.obszar[h].ID_OM === this.obszarMaszyny){
                        this.obszarMaszynyHint = this.obszar[h].OM_Komentarz
                        break
                    }
                }
            },

            watch: {
                DataTimeEnd() {
                    console.log("Zmiana")
                }
            }
        }
    }
</script>
