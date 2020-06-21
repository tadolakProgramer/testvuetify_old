<template>
    <v-card class="md-2 my-1"
            width="auto"
            color="secondary"
    :disabled="disable">
        <v-card-title class="primary font-weight-bold">Uczestnicy {{ID}}</v-card-title>

        <v-select
                v-model="workers"
                :items="items"
                item-value="PR_ID"
                item-text="fullName"
                label="Dodaj osoby"
                multiple
        >
            <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0">
                    <span>{{ item.PR_imie }}</span>
                </v-chip>
                <span
                        v-if="index === 1"
                        class="grey--text caption"
                >(+{{ workers.length - 1 }} więcej)</span>
            </template>
        </v-select>
        <v-card-actions>
            <v-btn
                color="orange"
                @click="saveWorkers">Zapisz
                <v-icon right>mdi-content-save</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>

</template>

<script>
    import FailureService from "../services/FailureService";
    import {mapGetters} from "vuex";

    export default {
        name: "failureWorkers",
        data: () => ({
            workers: [],
            addListWorkers: [],
            delListWorkers: [],
            ID_AWARIA:'',
            value: '',
            items: [],
            pr:[]
        }),
        return:{
            ID:'',
            x:''
        },
        props: {
            disable:{
                type: Boolean,
                default: false
            },
        },
        async created() {
            this.ID_AWARIA = this.getIdFailure();
            this.items = (await FailureService.getAllWorkers()).data
            for (let k = 0; k<this.items.length; k++){
                this.items[k].fullName = this.items[k].PR_imie +' '+ this.items[k].PR_Nazwisko;
            }
            this.items.sort(function(a,b){ return (a.fullName> b.fullName)? 1: ((b.fullName > a.fullName) ? -1:0);})
            const pr = (await FailureService.getWorkersFromAwariaPracownik({ID_AWARIA:this.ID_AWARIA})).data
            for (let i=0; i < pr.length; i++ ){
                this.workers.push(pr[i].AWPR_ID_PR)
            }
        },

        watch: {
            workers: function () {
                //let i = this.items.length
                this.ID = this.workers.length
            }
        },
        methods: {
            ...mapGetters([
                'getIdFailure']),

            async saveWorkers() {
                for (let j=0; j < this.workers.length; j++){
                    this.addListWorkers[j] = await ({"AWPR_ID_PR": this.workers[j],
                    "AWPR_ID_AWARIA": this.ID_AWARIA})
                }
                try{
                    const response = await FailureService.addWorkersToFailure(this.addListWorkers,{ID_AWARIA: this.ID_AWARIA})
                    this.x = await response.data
                }

                catch (e) {
                    console.log(e)
                }
            }
        }
    }
</script>

<style scoped>

</style>
