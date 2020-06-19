<template>
    <v-card class="md-2 my-1"
            width="auto"
            color="secondary"
            :disabled="disable">
        <v-card-title class="primary font-weight-bold">Lista wymienionych części</v-card-title>
        <v-list-item two-line dense v-for="item in items" :key="item.AWCZ_AW_ID">
            <v-list-item-content >
                <v-list-item-title class="justify-lg-space-around">{{item.CZ_Nazwa}} {{item.CZ_Symbol}} Ilość:{{item.AWCZ_ILOSC}} szt.
                    <v-icon
                            class="mr-2"
                            @click="deletePart()"
                    >
                        mdi-delete
                    </v-icon>
                </v-list-item-title>
                <v-list-item-subtitle>Nr kat: {{item.CZ_NrKatalogowy}} ID:{{item.ID_CZESC}}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-card-actions>
            <v-btn
                color="orange"
                @click="addParts">Dodaj
                <v-icon right>mdi-plus</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>

</template>

<script>
    import FailureService from "../services/FailureService";
    import {mapGetters} from "vuex";

    export default {
        name: "failureParts",
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
            x:''
        },
        props: {
            disable:{
                type: Boolean,
                default: false
            }
        },
        async created() {
            this.ID_AWARIA = this.getIdFailure();
            this.items = (await FailureService.getPartsFromFailureParts({ID_AWARIA:this.ID_AWARIA})).data
            console.log(this.items)
            for (let k = 0; k<this.items.length; k++){
                this.items[k].CZ_Smbol = this.items[k].CZ_NrKatalogowy +' '+ this.items[k].AWCZ_ILOSC;
            }
        },

        watch: {
            workers: function () {
                //let i = this.items.length
            }
        },
        methods: {
            ...mapGetters([
                'getIdFailure']),
            addParts(){
                this.$router.push({name:'allParts'})
            }

        }
    }
</script>

<style scoped>

</style>
