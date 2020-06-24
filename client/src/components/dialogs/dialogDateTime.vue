<template>
    <v-row justify="center">
        <template>
        <v-dialog v-model="dialog" persistent max-width="390">
            <v-card class="secondary">
                <v-card-title class="headline primary">{{titleDialog()}}</v-card-title>
                <v-card-text>
                    <v-menu
                            :close-on-content-click="true"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                            locale="pl"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    v-model="date"
                                    label="Data wystąpienia usterki"
                                    prepend-icon="event"

                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" locale="pl"></v-date-picker>
                    </v-menu>

                        <v-time-picker
                                v-model="time"
                                full-width
                                format="24hr"
                                @click:minute="$refs.menu.save(time)"
                        ></v-time-picker>
                    <p>{{DataCzas}}</p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="orange"  @click="SetNow">Teraz</v-btn>
                    <v-btn color="orange"  @click="dialog = false">Anuluj
                        <v-icon right>mdi-cancel</v-icon></v-btn>
                    <v-btn color="orange"  @click="saveDate">OK
                        <v-icon right>mdi-check-bold</v-icon></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        </template>
    </v-row>
</template>

<script>
    import moment from 'moment';
    //import store from "../store/store";
    import {mapMutations, mapGetters} from "vuex";

    export default {
        name: "dialogDateTime",
        data: () => ({
            dialog: false,
            time: '',
            date: new Date().toISOString().substr(0, 10),
            menu:'',
            return: {

                menu2: false,
                Teraz:'',
                title:'',
                dialogType: '',
                DataCzas: null,
                titleDialog:null
            },
        }),
        created() {
            moment.locale('pl')
            this.SetNow();
        },

        async mounted() {
            this.time = moment().format('LT');
            await this.$root.$on('openDialog', (open) => {
                console.log('openDialog', open)
                this.dialog = open
            })
        },
        computed: {
            DataCzas() {
                return this.date + ' ' + this.time
            },
            titleDialog() {
                return this.getTitleDialog
            },
            dialogType() {
                return this.getDialogType
            }
        },

        methods:{
            ...mapMutations([
                'setDateTimeStart', 'setDateTimeEnd'
            ]),
            ...mapGetters(['getDialogType', 'getTitleDialog'
            ]),
            saveDate() {
                this.Teraz = this.date + ' ' + this.time

                if (this.dialogType() === "End"){
                this.$root.$emit('dataEnd', this.Teraz)
                    this.setDateTimeEnd(this.Teraz)
                }
                if (this.dialogType() === "Start"){
                    this.$root.$emit('dataStart', this.Teraz)
                    this.setDateTimeStart(this.Teraz)
                }
                this.dialog = false
            },
            SetNow(){
                this.date = moment().format('YYYY-MM-DD')
                this.time = moment().format('HH:mm')
            }
        }
    }
</script>

<style scoped>

</style>
