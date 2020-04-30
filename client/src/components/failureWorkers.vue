<template>

    <v-card class="md-2 my-1"
            width="auto"
            color="secondary">
        <v-card-title class="primary font-weight-bold">Uczestnicy {{ID}}</v-card-title>

        <v-select
                v-model="workers"
                :items="items"
                item-value="PR_ID"
                item-text="PR_imie"
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
    </v-card>

</template>

<script>
    import FailureService from "../services/FailureService";

    export default {
        name: "failureWorkers",
        data: () => ({
            workers: '',
            value: '',
            items: []
        }),
        return:{
            ID:''
        },
        async created() {
            this.items = (await FailureService.getAllWorkers()).data
        },
        watch: {
            workers: function () {
                //let i = this.items.length
                this.ID = this.workers.length
            }
        }
    }
</script>

<style scoped>

</style>
