<template>
    <v-layout>
        <v-flex >
            <v-card class="pa-4" color="secondary">
                <v-card-title color="green" class="headline">Historia maszyny: {{maszyna.NazwaMaszyny}}</v-card-title>
                <v-card-subtitle class="pt-10 font-weight-bold">
                    <span>{{maszyna.NazwaTypu}}<br></span>
                    <span>{{maszyna.NazwaHali}}</span>
                </v-card-subtitle>
                    <data-table-failure></data-table-failure>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import FailureService from "../../services/FailureService";
    import DataTableFailure from "../../components/dataTableFailure";

    export default {
        name: "failureHistory",
        components: {DataTableFailure},
        data() {
            return {
                maszyna: {}
            }
        },
           async  mounted ()
            {
                this.maszyna = (await FailureService.getMaszyna(this.$route.params)).data;
                console.log("maszyna:" , this.maszyna)
                //DataTableFailure.data().desserts.value = this.listaAwarii;
                //await this.$root.$emit('ListaAwarii', this.listaAwarii);
            }

    }
</script>

<style scoped>

</style>
