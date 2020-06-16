<template>
    <v-data-table
            :headers="headers"
            :items="parts"
            dense
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
                <v-divider
                        class="mx-4"
                        inset
                        vertical
                ></v-divider>
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
                <v-dialog v-model="dialogNewPart" max-width="800px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                                color="primary"
                                dark
                                class="mb-2"
                                v-bind="attrs"
                                v-on="on"
                        >Nowa część</v-btn>
                    </template>
                    <v-card class="secondary">
                        <v-card-title class="headline primary">
                            <span >Nowa część</span>
                        </v-card-title>

                        <v-card-text >
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                                v-model="CZ_Nazwa"
                                                label="Nazwa części">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                                v-model="CZ_Symbol"
                                                label="Symbol"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                                v-model="CZ_NrKatalogowy"
                                                label="Nr katalogowy"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="3">
                                        <v-text-field
                                                v-model="CZ_Uwagi"
                                                label="Uwagi"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="3">
                                        <v-select
                                                v-model="CZ_CZGR_ID"
                                                :items="typeParts"
                                                item-text="CZGR_NAZWA"
                                                item-value="CZGR_ID"
                                                label="Grupa Częśći">
                                        </v-select>
                                    </v-col>
                                    <v-col>
                                        <v-btn class="mx-0" x-small  fab dark color="indigo">
                                            <v-icon dark>mdi-plus</v-icon>
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="3">
                                        <v-select
                                                v-model="CZ_PROD_ID"
                                                :items="producer"
                                                item-text="CZPR_NAZWA"
                                                item-value="CZPR_ID"
                                                label="Producent">
                                        </v-select>
                                    </v-col>
                                        <v-col>
                                        <v-btn class="mx-1" x-small fab dark color="indigo">
                                            <v-icon dark>mdi-plus</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-btn color="orange" ma="10" @click="add">Zapisz
                                <v-icon right>mdi-content-save</v-icon>
                            </v-btn>
                            <v-btn color="orange" ma="10" @click="closeDialogNewPart">Anuluj
                                <v-icon right>mdi-cancel</v-icon>
                            </v-btn>

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
            dialogNewPart: false,
            AWCZ_AW_ID:'',
            AWCZ_CZID:'',
            AWCZ_ILOSC:'1',
            CZ_Nazwa:'',
            CZ_Symbol:'',
            CZ_NrKatalogowy:'',
            CZ_Uwagi:'',
            CZ_CZGR_ID:'',
            CZ_PROD_ID:'',
            typeParts:[],
            producer:[],
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
                idtext:''
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
                this.typeParts = (await PartsService.getAllPartsType()).data;
                this.typeParts.sort(function(a,b){ return (a.CZGR_NAZWA> b.CZGR_NAZWA)? 1: ((b.CZGR_NAZWA > a.CZGR_NAZWA) ? -1:0);})
                this.producer = (await PartsService.getAllProducer()).data;
                this.producer.sort(function(a,b){ return (a.CZPR_NAZWA> b.CZPR_NAZWA)? 1: ((b.CZPR_NAZWA > a.CZPR_NAZWA) ? -1:0);})
            },

            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },
            closeDialogNewPart(){
                this.dialogNewPart = false
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
            async add() {
                try{
                    const response = await PartsService.postPart({
                        CZ_Nazwa: this.CZ_Nazwa,
                        CZ_NrKatalogowy: this.CZ_NrKatalogowy,
                        CZ_Smbol: this.CZ_Smbol,
                        CZ_Uwagi: this.CZ_Uwagi,
                        CZ_CZGR_ID: this.CZ_CZGR_ID,
                        CZ_PROD_ID: this.CZ_PROD_ID
                    })
                    this.parts = (await PartsService.getALLParts()).data;
                    console.log(response)
                }
                catch (e) {
                    console.log(e)
                }
                this.closeDialogNewPart()
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
