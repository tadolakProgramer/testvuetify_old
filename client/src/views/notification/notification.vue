<template>
    <v-flex>
        <v-row justify="center" class="mb-3">
            <v-col v-for="maszyna in listaMaszyn" :key="maszyna"
                   md="4"
            >
                <v-card
                        class="pq-2"
                        max-width="auto"
                        color="secondary"
                >
                    <v-card-title class="primary font-weight-bold">
                        {{maszyna.NazwaMaszyny}}
                    </v-card-title >
                    <v-card-subtitle class="pt-10 font-weight-bold">
                        {{maszyna.NazwaTypu}}
                    </v-card-subtitle>
                    <v-divider
                            class="mx-lg-4"
                    ></v-divider>
                    <v-layout align-center justify-space-between>
                        <v-btn class="ma-2"
                               color="red" pa="2"
                               dark
                               @click="newnotification(maszyna.ID_Maszyna)"
                               >Zgłoszenie
                            <v-icon right>mdi-plus</v-icon>
                        </v-btn>
                        <v-btn class="ma-2"
                               color="szary" pa="2"
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
    import NotificationService from "../../services/NotificationService";
    import store from "../../store/store";

    export default {
        name: "notification",
        data() {
            return {
                user:'',
                NazwaHali: '',
                ID_Maszyna: '',
                Hala_id: '',
                NazwaMaszyny: '',
                NazwaTypu: '',
                ID: '',
                IdHala:'',
                maszynaId:'',
                listaMaszyn: []
            }
        },
        methods:{
            newnotification(IDS)
            {
                this.$router.push({name:'newnotification', params:{IDS:IDS}})
            }
        },
        async mounted() {
            this.user = store.getters.user;
            this.IdHala = this.user.Hala_ID;
            this.listaMaszyn = (await NotificationService.getListaMaszyn(this.$route.params)).data;

            console.log('Lista: ', this.listaMaszyn, this.IdHala)
        }
    }
</script>

<style scoped>

</style>
