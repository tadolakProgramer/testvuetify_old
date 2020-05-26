<template>
    <v-layout>
        <v-flex >
            <v-card class="pa-4" color="secondary">
                <v-card-title color="green" class="headline">Lista części:</v-card-title>
                <v-card-subtitle class="pt-10 font-weight-bold">

                </v-card-subtitle>
                    <data-table-parts></data-table-parts>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import DataTableParts from "../../components/dataTableParts";

    export default {
        name: "failureHistory",
        components: {DataTableParts},
        data() {
            return {
                maszyna: {}
            }
        }
    }
</script>

<style scoped>

</style>
