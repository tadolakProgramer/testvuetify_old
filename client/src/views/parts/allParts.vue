<template>
    <v-layout>
        <v-flex >
            <v-card class="pa-4" color="secondary">
                <v-card-title color="green" class="headline">Lista części:
                </v-card-title>

                <v-card-text>
                    <v-row justify="end" pa="20">
                    <v-btn  >small</v-btn>
                    </v-row>
                    <data-table-parts></data-table-parts>
                </v-card-text>
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
