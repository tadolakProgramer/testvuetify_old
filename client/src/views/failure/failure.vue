<template>
    <v-flex>
        <serch-machine></serch-machine>
        <v-row justify="center" class="mb-3"
        >
            <v-col v-for="maszyna in viewMachine" :key="maszyna.Maszyna_ID"
                   md="4"
            >
                    <v-card
                            class="pq-2"
                            max-width="auto"
                            color="secondary"
                    >
                        <v-card-title class="primary font-weight-bold">
                            {{maszyna.NazwaMaszyny}}
                        </v-card-title>
                        <v-card-subtitle class="pt-10 font-weight-bold">
                            {{maszyna.NazwaTypu}}
                        </v-card-subtitle>
                        <v-divider
                                class="mx-lg-4"
                        ></v-divider>
                        <v-layout align-center justify-space-between>
                            <v-btn class="ma-2"
                                   color="red" pa="2"
                                   dark
                                   @click="failure(maszyna.ID_Maszyna)"
                            >Nowa awaria
                                <v-icon right>mdi-plus</v-icon>
                            </v-btn>
                            <v-btn class="ma-2"
                                   color="accent" pa="2"
                                   dark
                                   @click="goToFailureHistory(maszyna.ID_Maszyna)"
                            >Historia
                                <v-icon right>mdi-table-large</v-icon>
                            </v-btn>
                        </v-layout>
                    </v-card>
            </v-col>

        </v-row>
    </v-flex>
</template>

<script>
    import FailureService from "../../services/FailureService";
    import SerchMachine from "../../components/serchMachine";
    import {mapMutations, mapGetters} from  "vuex";

    export default {
        name: "failure",
        components: {SerchMachine},
        data() {
            return {
                NazwaHali: '',
                ID_Maszyna: '',
                Hala_id: '',
                NazwaMaszyny: '',
                NazwaTypu: '',
                ID: '',
                maszynaId: '',
                listaMaszyn: [],
                viewMachine: [],
                filterHala: '',
                filterTyp:''
            }
        },
        methods: {
            ...mapMutations([
                'setfailureCreate', 'setfailureEdit'
            ]),
            ...mapGetters(['getDialogType', 'getTitleDialog'
            ]),
            failure(IDS) {
                this.setfailureCreate();
                this.$router.push({name: 'newfailure', params: {IDS: IDS}})
            },
            goToFailureHistory(IdMaszyna) {
                this.$router.push({name: 'failureHistory', params: {IdMaszyna: IdMaszyna}})
            },
            edit() {

            }
        },
        async created() {
            this.viewMachine = (await FailureService.getListaMaszyn()).data;
        },
        async mounted() {
            this.listaMaszyn = (await FailureService.getListaMaszyn()).data;

            this.$root.$on('filter', (hala, typMaszyny) => {
                this.viewMachine=[]
                this.filterTyp = typMaszyny
                this.filterHala = hala
                if (this.filterHala === null) {this.filterHala = 'Pokaż wszystko' }
                if ((this.filterHala === 'Pokaż wszystko') && (this.filterTyp ==='Pokaż wszystko')) {
                    this.viewMachine = this.listaMaszyn
                }
                if ((this.filterHala != 'Pokaż wszystko') && (this.filterTyp != 'Pokaż wszystko')) {
                    for ( let i=0; i <  this.listaMaszyn.length; i++){
                    if (( this.listaMaszyn[i].Hala_id === this.filterHala) && (this.listaMaszyn[i].ID === this.filterTyp)) {
                        this.viewMachine.push(this.listaMaszyn[i])
                    }
                }}
                if ((this.filterHala === 'Pokaż wszystko') && (this.filterTyp != 'Pokaż wszystko')) {
                    for ( let i=0; i <  this.listaMaszyn.length; i++){
                        if ((this.listaMaszyn[i].ID === this.filterTyp)) {
                            this.viewMachine.push(this.listaMaszyn[i])
                        }
                    }}
                if ((this.filterHala != 'Pokaż wszystko') && (this.filterTyp === 'Pokaż wszystko')) {
                    for ( let i=0; i <  this.listaMaszyn.length; i++){
                        if (( this.listaMaszyn[i].Hala_id === this.filterHala)) {
                            this.viewMachine.push(this.listaMaszyn[i])
                        }
                    }}
                console.log(this.viewMachine)
            })
            this.filterHala = SerchMachine.data().listaHal;
        }
    }
</script>

<style scoped>

</style>
