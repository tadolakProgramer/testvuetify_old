<template>
    <v-layout>
        <v-flex  >
            <dialog-date-time></dialog-date-time>
            <template>
                <v-row justify="center">
                    <v-dialog v-model="dialog" persistent max-width="390">
                        <v-card>
                            <v-card-title class="headline primary">Info</v-card-title>
                            <v-card-text>{{dialogText}} <br>Możesz dopisać dodatkowe informacje klikając na przycisk szczegóły
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1"  @click="goToEditFailure">Szczegóły</v-btn>
                                <v-btn color="green darken-1"  @click="closeNewFailure">OK</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-row>
            </template>
            <v-card class="pq-2"
                    max-width="auto"
                    color="secondary"
            >
                <v-card-title class="primary font-weight-bold headline justify-space-between">Nowa interwencja:
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
                <v-card-subtitle>
                        <div class=" d-flex justify-space-between"> {{maszynka.NazwaTypu}}   {{maszynka.NazwaHali}}
                        </div>
                </v-card-subtitle>
                <v-card-text>
                    <v-row>
                        <v-col cols="10" sm="2" md="3">
                            <v-select
                                    v-model="obszarMaszyny"
                                    :items=obszar
                                    item-text="OM_Nazwa"
                                    item-value="ID_OM"
                                    label="Obszar"
                                    @change="changeHint"
                                    persistent-hint
                                    :hint="obszarMaszynyHint"
                            ></v-select>
                        </v-col>
                        <v-col cols="8" sm="4" md="2">
                            <v-text-field
                                    v-model="AW_MO_Symbol"
                                    label="Symbol obszaru"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="8" sm="4" md="6" class="ma-lg-auto">
                            <v-radio-group v-model="AW_Typ" row  pa="1" ma="1">Typ awarii
                                <v-radio color="green" label="Elektroniczna" value="A"></v-radio>
                                <v-radio color="blue" label="Mechaniczna" value="M"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                    <v-textarea
                            v-model="AW_OpisAwarii"
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
                            color="black"
                            label="Opisz jakie działania zostały podjete aby usunąć usterkę"
                            hint="Minimum 25 znaków"
                            :counter="25"
                            :rules="[rules.required, rules.min]"
                            outlined
                            rows="2"
                    ></v-textarea>
                    <span>Zgłaszający: {{user.US_Name}} {{user.US_SUER_NAME}} {{user.US_PROFESJA}}</span>
                </v-card-text>
                <hr>
                <v-radio-group v-model="AW_Zrealizowane" row>Status awarii
                    <v-radio color="red" label="Zgłoszenie" value="Zgłoszenie"></v-radio>
                    <v-radio color="orange" label="Oczekiwanie na części" value="Oczekiwanie na części"></v-radio>
                    <v-radio color="orange" label="Oczekiwanie na zatrzymanie"
                             value="Oczekiwanie na zatrzymanie"></v-radio>
                    <v-radio color="green" label="Zakończone" value="Zakończone"></v-radio>
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
                           ma="10"
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
        </v-flex>
    </v-layout>
</template>

<script>

    import FailureService from "../../services/FailureService";
    import moment from 'moment';
    import store from "../../store/store";
    import DialogDateTime from "../../components/dialogs/dialogDateTime";
    import {mapMutations, mapGetters} from "vuex";


    export default {
        components: {DialogDateTime},
        props: {
            source: String,
        },
        data() {
            return {
                dialog: '',
                dialogText:'',
                maszynka: '',
                obszar:[],
                obszarMaszyny:'',
                obszarMaszynyHint:'',
                ID_OM:'',
                OM_Komentarz:'',
                newFailure: '',
                dataGodzina: '',
                user: '',
                dialogType: '',
                viewDataZakonczenia: false,
                ID_AWARIA: 0,
                AW_DataZgloszenia: '',
                Maszyna_ID: '',
                AW_MO_ID:'',
                AW_MO_Symbol:'',
                AW_Zglaszajacy_ID: '',
                AW_OpisAwarii: '',
                AW_Zrealizowane: 'Zgłoszenie',
                AW_Dzialania: '',
                AW_DataZakonczenia: '',
                AW_DataZakonczeniaView: '',
                AW_Typ:'A',
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
            this.dataGodzinaView = moment().format('lll');
            this.dataGodzina = moment().format("MM DD YYYY HH:mm:ss", true);
            console.log("start", this.dataGodzina)
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
                this.maszynka = (await FailureService.getMaszyna(this.$route.params)).data;
                this.obszar = (await FailureService.getMachinaArea({ID:this.maszynka.ID})).data;
                console.log(this.obszar)

                //Get User login to system
                this.user = store.getters.user;

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
                'setTitleDialog', 'setDialogType', 'setfailureEdit'
            ]),
            ...mapGetters([
                'getDateTimeEnd', 'getDataTimeStart']),

            async AddNewFailure() {
                console.log("zapis", this.dataGodzina)
                if (this.AW_OpisAwarii.isError){
                    console.log("error")
                }
                try {
                    const response = await FailureService.addNewFailure({
                        ID_AWARIA: this.ID_AWARIA,
                        Maszyna_ID: this.maszynka.ID_Maszyna,
                        AW_MO_ID: this.obszarMaszyny,
                        AW_MO_Symbol: this.AW_MO_Symbol,
                        AW_DataZgloszenia: (this.dataGodzina),
                        AW_Typ: this.AW_Typ,
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
                    //alert('Awaria nr: ' + this.NowaAwaria.ID_AWARIA + ', maszyny ' + this.maszynka.NazwaMaszyny + ' została poprawnie zapisana!')
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
                await this.setTitleDialog('Usunięcie usterki')
                await this.setDialogType('End')
                const open = true
                this.$root.$emit('openDialog', open);
            },
            closeNewFailure() {
                this.dialog = false
                this.pageBack()
            },

            async goToEditFailure() {
                const ID_AWARIA = this.NowaAwaria.ID_AWARIA
                this.setfailureEdit(ID_AWARIA)
                await this.$router.push({name: 'editFailure', params: {ID_AWARIA: ID_AWARIA}})
                this.dialog = false
            },

            changeHint(){

                for(let h=0; h<this.obszar.length; h++){
                    if (this.obszar[h].ID_OM === this.obszarMaszyny){
                        this.obszarMaszynyHint = this.obszar[h].OM_Komentarz
                        break
                    }
                }
            },

            pageBack() {
                this.$router.go(-1)
            }
        },

        watch: {
            AW_Zrealizowane: function () {
                if (this.AW_Zrealizowane === 'Zakończone') {
                    this.AW_DataZakonczenia = moment().format("MM DD YYYY HH:mm:ss", true);
                    console.log("Zmiana", this.AW_DataZakonczenia)
                    this.AW_DataZakonczeniaView = moment().format('lll')
                    this.viewDataZakonczenia = true;
                } else {
                    this.viewDataZakonczenia = false;
                }
            },
            DataTimeEnd() {
                console.log("Zmiana")
            }
        }
    }
</script>
