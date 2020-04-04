<template>
    <v-flex>
        <v-row justify="start" class="mb-3">
            <v-col v-for="maszyna in listaMaszyn" :key="maszyna"
                   md="3"
            >
                <v-card class="pa-2"
                        max-width="auto"
                        color="secondary"
                >
                    <v-card-title>
                        {{maszyna.NazwaMaszyny}}
                    </v-card-title>
                    <v-card-subtitle>
                        {{maszyna.NazwaTypu}}
                    </v-card-subtitle>
                    <v-divider
                            class="mx-lg-4"
                    ></v-divider>
                    <v-layout align-center justify-space-between>
                        <v-btn class="ma-2"
                               color="accent" pa="2"
                               dark
                               @click="register">Zgłoszenie
                            <v-icon right>mdi-plus</v-icon>
                        </v-btn>
                        <v-btn class="ma-2"
                               color="warning" pa="2"
                               dark
                               @click="register">Edycja
                            <v-icon right>mdi-pencil</v-icon>
                        </v-btn>
                    </v-layout>
                </v-card>
            </v-col>
        </v-row>
    </v-flex>
</template>

<script>
    import NotificationService from "../services/NotificationService";

    export default {
        name: "notification",
        data() {
            return {
                NazwaHali: '',
                ID_Maszyna: '',
                Hala_id: '',
                NazwaMaszyny: '',
                NazwaTypu: '',
                ID: '',
                listaMaszyn: []
            }
        },
        async mounted() {
            this.listaMaszyn = (await NotificationService.getListaMaszyn()).data
            console.log('Lista: ', this.listaMaszyn)
        }
    }
</script>

<style scoped>

</style>