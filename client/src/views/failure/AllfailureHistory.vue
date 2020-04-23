<template>
    <v-layout>
        <v-flex >
            <v-card class="pa-4" color="secondary">
                <v-card-title color="green" class="headline">Historia maszyny</v-card-title>
                    <data-table-failure-all></data-table-failure-all>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import FailureService from "../../services/FailureService";
    import DataTableFailureAll from "../../components/dataTableFailureAll";

    export default {
        name: "failureHistory",
        components: {DataTableFailureAll},
        data() {
            return {
                listaAwarii: []
            }
        },
           async  mounted ()
            {
                this.listaAwarii = (await  FailureService.getAllFailure());
                //DataTableFailure.data().desserts.value = this.listaAwarii;
                await this.$root.$emit('ListaAwarii', this.listaAwarii);

            }

    }
</script>

<style scoped>

</style>