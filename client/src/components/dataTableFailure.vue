<template>
    <v-data-table
            :headers="headers"
            :items="failures"
            class="elevation-1"
            :search="search"
    >
        <template v-slot:top>
            <v-toolbar color="secondary">

                <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Szukaj"
                ></v-text-field>

            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item.ID_AWARIA)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                    small
                    @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
        </template>

        <template v-slot:no-data>
            <p class="text-lowercase">Lowercased text.</p>
            <p class="headline
                      font-weight-bold
                      primary"
                    > Ta maszyna niema zapisanych awarii :-)</p>
        </template>

        <template v-slot:item.AW_Zrealizowane=" { item }">
            <v-chip :color="getColor(item.AW_Zrealizowane)" dark>{{ item.AW_Zrealizowane }}</v-chip>
        </template>
    </v-data-table>
</template>

<script>
    import FailureService from "../services/FailureService";

    export default {
        name: "dataTableFailure",
        data: () => ({
            search: '',
            dialog: false,
            headers: [
                {
                    text: 'Lp',
                    align: 'start',
                    //sortable: true,
                    value: 'ID_AWARIA',
                    width: "2%"
                },
                {text: 'Data zgłoszenia', width: "12%", value: 'DataAW'},
                {text: 'Opis awarii', width: "36%", value: 'AW_OpisAwarii'},
                {text: 'Opis działania', width: "36%", value: 'AW_Dzialania'},
                {text: 'Status', width: "12%", value: 'AW_Zrealizowane'},
                {text: 'Actions', width: "2%", value: 'actions', sortable: false},
            ],
            failures: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
            defaultItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
        },

        watch: {
            dialog(val) {
                val || this.close()
            },
        },

        created() {
            this.initialize()
        },

        methods: {
            async initialize() {
                this.failures = (await FailureService.getFailureMachina(this.$route.params)).data;
            },
            async editItem(id) {
                console.log("item",id )
                await this.$router.push({name: 'editFailure', params: {ID_AWARIA: id}})
            },

            deleteItem(item) {
                const index = this.failures.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.failures.splice(index, 1)
            },

            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save() {
                if (this.editedIndex > -1) {
                    Object.assign(this.failures[this.editedIndex], this.editedItem)
                } else {
                    this.failures.push(this.editedItem)
                }
                this.close()
            },
            getColor(AW_Zrealizowane) {
                if (AW_Zrealizowane === 'Zgłoszenie') return 'red'
                else if (AW_Zrealizowane === 'Zakończone') return 'green'
                else return 'orange'
            },
        }
    }
</script>

<style scoped>

</style>
