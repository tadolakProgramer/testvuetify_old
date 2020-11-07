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
                            <v-btn
                                    class="ma-2"
                                   color="red" pa="2"
                                   dark
                                   :disabled="menuGuest"
                                   @click="failure(maszyna.ID_Maszyna)"
                            >Nowa awaria
                                <v-icon right>mdi-plus</v-icon>
                            </v-btn>
                          <v-btn
                              class="ma-2"
                              color="blue" pa="2"
                              dark
                              :disabled="menuGuest"
                              @click="drzewo(maszyna.ID_Maszyna)"
                          >Elementy
                          </v-btn>
                            <v-badge
                                    bordered
                                    overlap
                                    color="error"
                                    left
                                    :value="maszyna.SumAwarii">
                                <template v-slot:badge>
                                    <div>{{maszyna.SumAwarii}}</div>
                                </template>
                            <v-btn class="ma-2"
                                   color="accent" pa="2"
                                   dark
                                   @click="goToFailureHistory(maszyna.ID_Maszyna)"
                            >Historia
                                <v-icon right>mdi-table-large</v-icon>
                            </v-btn>
                            </v-badge>

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
    import store from "../../store/store";

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
                sumAwarii:'',
                listaMaszyn: [],
                viewMachine: [],
                filterHala: '',
                filterTyp:'',
                menuGuest: false
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
                if (store.getters.profesja === 'Kierownik') {
                    this.$router.push({name: 'newnotification', params: {IDS: IDS}})
                }
                else {
                    this.$router.push({name: 'newfailure', params: {IDS: IDS}})
                }
            },
            goToFailureHistory(IDS) {
                this.$router.push({name: 'failureHistory', params: {IDS: IDS}})
            },
            edit() {

            },
          drzewo(IDS){
            this.$router.push({name: 'treePartsByMachine' , params: {IDS: IDS}})
          },
          convert(tree){
            var map = {}
            for(var i = 0; i < tree.length; i++){
              var obj = tree[i]
              if(!(obj.ID_Podzespol in map)){
                map[obj.ID_Podzespol] = obj
                map[obj.ID_Podzespol].pdz_rodzic = []
              }

              if(typeof map[obj.ID_Podzespol].pdz_Nazwa === 'undefined'){
                map[obj.ID_Podzespol].ID_Podzespol = obj.ID_Podzespol
                map[obj.ID_Podzespol].pdz_Nazwa = obj.pdz_Nazwa
                map[obj.ID_Podzespol].pdz_rodzic= obj.pdz_rodzic
              }

              var parent = obj.pdz_rodzic || '-';
              if(!(parent in map)){
                map[parent] = {}
                map[parent].children = []
              }

              map[parent].children.push(map[obj.ID_Podzespol])
            }
            return map['-']
          }
        },
        async created() {
            this.viewMachine = (await FailureService.getListaMaszyn()).data;
        },
        async mounted() {
            if (store.getters.profesja === 'Gość'){
               this.menuGuest = true}
                else{
                    this.menuGuest = false
                }
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
            })
            this.filterHala = SerchMachine.data().listaHal;
          }
    }
</script>

<style scoped>

</style>
