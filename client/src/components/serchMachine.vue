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
                                      item-value="ID"
                                      label="Filtruj po typie maszyny"
                                @change="setFilterTyp">
                            </v-select>
                        </v-col>
                    </v-row>
                </v-card>
            </v-form>
        </v-flex>
    </v-layout>
</template>

<script>

    export default {
        name: "serchMachine",
        data() {
            return {
                Hale: [],
                listaTypow:'',
                TypMaszyny:[],
                typesOfMachine: [],
                listaHal:'',
                valid: false
            }
        },
        async mounted() {
            this.Hale = (await this.$store.getters.getListaHal)
            this.Hale.unshift("Pokaż wszystko")

            this.TypMaszyny = (await this.$store.getters.getListaTypowMaszyn)
            this.TypMaszyny.unshift("Pokaż wszystko")

        },
        methods: {
            setFiltrHala() {
                this.$root.$emit('filter', this.listaHal, this.listaTypow)
            },
            setFilterTyp() {
                this.$root.$emit('filter', this.listaHal, this.listaTypow)
            }
        }
    }

</script>

<style scoped>

</style>
