<template>
    <v-layout>
        <v-flex >
            <v-form v-model="valid">
                <v-card
                        class="pa-2"
                        color="secondary"
                max-height="100">
                    <v-row justify="center" class="mb-3">
                    <v-col cols="2" sm="2" md="2">
                            <v-select pa="6"
                                      v-model="listaHal"
                                      :items=Hale
                                      item-text="NazwaHali"
                                      item-value="ID_Hala"
                                      label="Filtruj po nazwie hali"
                            @change="setFiltrHala">
                            </v-select>
                        </v-col>
                        <v-col cols="2" sm="2" md="2">
                            <v-select align-center justify-center
                                      v-model="listaTypow"
                                      :items=TypMaszyny
                                      item-text="NazwaTypu"
                                      item-value="ID_Hala"
                                      label="Filtruj po typie maszyny">
                            </v-select>
                        </v-col>
                    </v-row>
                </v-card>
            </v-form>
        </v-flex>
    </v-layout>
</template>

<script>
    import AuthenticationService from "../services/AuthenticationService";

    export default {
        name: "serchMachine",
        data() {
            return {
                Hale: [],
                listaHal:''
            }
        },
        async mounted() {
            this.Hale = (await AuthenticationService.getHale()).data;
            console.log('HaleFail: ', this.Hale)
        },
        methods: {
            setFiltrHala(){
                this.$root.$emit('filter', this.listaHal)
            }
        }
    }

</script>

<style scoped>

</style>