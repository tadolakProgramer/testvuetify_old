<template>
    <v-data-table
            :headers="headers"
            :items="parts"
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
                <v-dialog v-model="dialog" max-width="500px" class="secondary">
                    <v-card class="secondary">
                        <v-card-title>
                            <span class="headline">Ilość części</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container class="secondary">
                                <v-row>
                                    <v-col >
                                        <v-text-field
                                                v-model="AWCZ_ILOSC"
                                                label="Podaj ilość"
                                                value="1"
                                                type="number">
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue"  @click="close">Anuluj</v-btn>
                            <v-btn color="blue darken-1"  @click="save">Dodaj
                                <v-icon left
                                        big
                                        class="mr-2"
                                        @click="editItem(item)"
                                >
                                    mdi-plus
                                </v-icon></v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon
                    class="mr-2"
                    @click="editItem(item)"
            >
                mdi-plus
            </v-icon>
        </template>
    </v-data-table>
</template>

<script>
    import {mapGetters, mapMutations} from "vuex";
    import PartsService from "../services/PartsService";
    import FailureService from "../services/FailureService";

    export default {
        name: "dataTableParts",
        data: () => ({
            search: '',
            dialog: false,
            headers: [
                {
                    text: 'Lp',
                    align: 'start',
                    //sortable: true,
                    value: 'ID_CZESC',
                    width: "2%"
                },
                {text: 'Nazwa', width: "15%", value: 'CZ_Nazwa'},
                {text: 'Symbol', width: "20", value: 'CZ_Symbol'},
                {text: 'Nr Katalogowy', width: "15", value: 'CZ_NrKatalogowy'},
                {text: 'Producent', width: "15", value: 'CZPR_NAZWA' },
                {text: 'Uwagi', width: "33", value: 'CZ_Uwagi'},
                {text: 'Actions', width: "2%", value: 'actions', sortable: false},
            ],
            parts: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
            return: {
                partId:'',
                idtext:'',
                AWCZ_AW_ID:'',
                AWCZ_CZID:'',
                AWCZ_ILOSC:'1'
            }
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
            ...mapGetters([
                'getIdFailure']),
            ...mapMutations(['setfailureEdit', 'setfailureCreate' ]),

            async initialize() {
                this.AWCZ_AW_ID = this.getIdFailure();
                this.parts = (await PartsService.getALLParts()).data;
            },

            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },
            editItem (item) {
                this.partId = item.ID_CZESC;
                this.dialog = true
            },

            async save() {
                try{
                    const response = await FailureService.postAddPartToFailure({
                        AWCZ_AW_ID: this.AWCZ_AW_ID,
                        AWCZ_CZID: this.partId,
                        AWCZ_ILOSC: this.AWCZ_ILOSC
                    })
                console.log(response);
                }
                catch (e) {
                    console.log(e)
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
