<template>
    <v-flex>
        <serch-machine></serch-machine>
        <v-row justify="center" class="mb-3"
        >
            <v-col v-for="maszyna in viewMachine" :key="maszyna"
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
                                   @click="goToFailureHistory"
                            >Historia
                                <v-icon right>mdi-table-large</v-icon>
                            </v-btn>
                            <v-btn class="ma-2"
                                   color="szary" pa="2"
                                   dark
                                   @click="register">Edycja
                                <v-icon right>mdi-pencil</v-icon>
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
                typMaszyn: ''
            }
        },
        methods: {
            failure(IDS) {
                this.$router.push({name: 'newfailure', params: {IDS: IDS}})
            },
            goToFailureHistory() {
                this.$router.push({name: 'failureHistory'})

            }
        },
        async created() {
            this.viewMachine = (await FailureService.getListaMaszyn()).data;
        },
        async mounted() {
            this.listaMaszyn = (await FailureService.getListaMaszyn()).data;
            this.$root.$on('filter', (hala, typMaszyny) => {
                this.viewMachine=[]
                this.typMaszyn = typMaszyny
                this.filterHala = hala
                if(this.filterHala === 'Pokaż wszystko'){
                    this.viewMachine= this.listaMaszyn
                }
                for ( let i=0; i <  this.listaMaszyn.length; i++){
                    if ( this.listaMaszyn[i].Hala_id === this.filterHala) {
                       this.viewMachine.push(this.listaMaszyn[i])
                    }
                }
                console.log(this.viewMachine)
            })
            this.filterHala = SerchMachine.data().listaHal;
        }
    }
</script>

<style scoped>

</style>
