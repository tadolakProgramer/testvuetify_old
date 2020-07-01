<template>
    <v-flex>
        <v-row justify="center" class="mb-3">
            <v-col v-for="maszyna in listaMaszyn" :key="maszyna.Maszyna_ID"
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
                               color="accent" pa="2"
                               dark
                               @click="goToFailureHistory(maszyna.ID_Maszyna)"
                        >Historia
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
    import FailureService from "../../services/FailureService";

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
            },
            edit() {

            },
            goToFailureHistory(IDS) {
                this.$router.push({name: 'failureHistory', params: {IDS: IDS}})
            },
        },
        async mounted() {
            this.user = store.getters.user;
            if (store.getters.profesja === 'Operator')
            {
                this.IdHala = this.user.Hala_ID;
                this.listaMaszyn = (await NotificationService.getListaMaszyn({IdHala: this.IdHala})).data;
            }
            if (store.getters.profesja === 'Kierownik')
            {
                this.IdHala = this.user.Hala_ID;
                this.listaMaszyn = (await FailureService.getListaMaszyn()).data;
            }
            console.log('Lista: ', this.listaMaszyn, this.IdHala)
        }
    }
</script>

<style scoped>

</style>
