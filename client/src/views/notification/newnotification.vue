<template>
    <v-layout>
        <v-flex xs12 sm10 offset-sm1>
            <v-card>
                <v-container fill-height fluid>
                    <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                            <span class="headline">Top 10 Australian beaches </span>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-card-title> ZUZUZUZUZZU
                </v-card-title>
                <v-card-text>
                    TEXT
                </v-card-text>
                <v-card-actions>
                    <v-btn flat color="orange">Zapisz</v-btn>
                    <v-btn flat color="orange">Anuluj</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>

    import NotificationService from "../../services/NotificationService";


    export default {
        props: {
            source: String,
        },
        data() {
            return {
                maszynaId: '',
                maszynka: []
            }
        },
        mounted() {
            try {
                this.maszynaId = this.$route.params.maszynaId;
                //this.maszynka = (NotificationService.newnotification(maszynaId)).data;
                this.maszynka = (NotificationService.getMaszyna(this.maszynaId)).data;
            } catch (errnoError) {
                console.log(errnoError)
            }
        }
    }
</script>
