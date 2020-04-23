<template>
    <v-layout>
        <v-flex >
            <v-card class="pa-4" color="secondary">
                <v-card-title color="green" class="headline">Historia maszyny: {{listaAwarii.NazwaMaszyny}}</v-card-title>
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
                listaAwarii: {}
            }
        },
           async  mounted ()
            {
                this.listaAwarii = (await FailureService.getMaszyna(this.$route.params)).data;
                console.log("maszyna:" , this.listaAwarii)
                //DataTableFailure.data().desserts.value = this.listaAwarii;
                //await this.$root.$emit('ListaAwarii', this.listaAwarii);
            }

    }
</script>

<style scoped>

</style>