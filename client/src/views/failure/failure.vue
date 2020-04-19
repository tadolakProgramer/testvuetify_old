<template>
    <v-flex>
        <v-row justify="start" class="mb-3">
            <v-col v-for="maszyna in listaMaszyn" :key="maszyna"
                   md="4"
            >
                <v-card class="pq-2"
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
                               color="accent" pa="2"
                               dark
                               @click="failure(maszyna.ID_Maszyna)"
                               >Nowa awaria
                            <v-icon right>mdi-plus</v-icon>
                        </v-btn>
                        <v-btn class="ma-2"
                               color="accent" pa="2"
                               dark
                               @click="failure(maszyna.ID_Maszyna)"
                        >Historia
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
    import FailureService from "../../services/FailureService";

    export default {
        name: "failure",
        data() {
            return {
                NazwaHali: '',
                ID_Maszyna: '',
                Hala_id: '',
                NazwaMaszyny: '',
                NazwaTypu: '',
                ID: '',
                maszynaId:'',
                listaMaszyn: []
            }
        },
        methods:{
            failure(IDS)
            {
                this.$router.push({name:'newfailure', params:{IDS:IDS}})
            }
        },
        async mounted() {
            this.listaMaszyn = (await FailureService.getListaMaszyn()).data;
            console.log('Lista: ', this.listaMaszyn)
        }
    }
</script>

<style scoped>

</style>
