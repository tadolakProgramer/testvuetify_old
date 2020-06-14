<template>
    <v-layout>
        <v-flex >
            <v-card class="pa-4" color="secondary">
                <v-card-title color="green" class="headline">Lista części:
                </v-card-title>

                <v-card-text>

                    <data-table-parts></data-table-parts>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="orange"
                           @click="pageBack"
                    >Powrót do awarii
                        <v-icon right>mdi-reply-outline</v-icon>
                    </v-btn>
                </v-card-actions>
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
        },
        methods: {
            pageBack() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>

</style>
