<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="390">
            <v-card>
                <v-card-title class="headline primary">Data wystąpienia usterki</v-card-title>
                <v-card-text>
                    <v-menu
                            v-model="dataUsterki"
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
                                    readonly
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" @input="dataUsterki = false"></v-date-picker>
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
                    <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>
                    <v-btn color="green darken-1" text @click="dialog = false">Agree</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {
        name: "dialogDateTime",
        data: () => ({
            dialog: false,
            return: {
                date: new Date().toISOString().substr(0, 10),
                dataUsterki: false,
                time: null,
                menu2: false,
            },
        }),
        async mounted() {
            await this.$root.$on('openDialog', (open) => {
                console.log('openDialog', open)
                this.dialog = open
            })
        },
        computed: {
            DataCzas(){
                return this.date + this.time
            }
        }
    }
</script>

<style scoped>

</style>