<template>
  <v-card class="pq-2"
          max-width="auto"
          color="secondary"
  >
    <v-card-title class="primary font-weight-bold">
      {{maszynka.NazwaMaszyny}}

    </v-card-title>
    <v-card-subtitle>
      <div class=" d-flex justify-space-between"> {{maszynka.NazwaTypu}}   {{maszynka.NazwaHali}}
      </div>
    </v-card-subtitle>
  <v-row>
  <v-col>
    <v-treeview v-model="drzewko"
        :items="dr"
                item-key="ID_Podzespol"
                item-text="pdz_Nazwa"
                activatable
                return-object
                dense
                @update:active="update"
    ></v-treeview>
  </v-col>
  <v-divider vertical></v-divider>
  <v-col
      class="pa-6"
      cols="6"
  >
      <div>
        Informacje: {{info}}
      </div>

  </v-col>
  </v-row>
  </v-card>
</template>

<script>

import tree from "../../helpers/TreeTest"
import toTree from "../../helpers/toTree"
import FailureService from "@/services/FailureService";

export default {
name: "treePartsByMachine",
  data: () => ({
    dr:[],
    drr:[],
    drzewko:[],
    maszynka:'',
    info:""
      }),


  async mounted(){
    this.maszynka = (await FailureService.getMaszyna(this.$route.params)).data;
    console.log("maszynka", this.maszynka)
    this.drr = toTree.arrayToTree(tree)
    this.dr = this.drr
    console.log("T", this.dr)
  },
    methods: {
      update(drzewko) {
        if (drzewko.length > 0 ) {
          if (drzewko[0].pdz_informacje) {
            this.info = drzewko[0].pdz_informacje + ' ' + drzewko[0].pdz_rodzic
          } else {
            this.info = "Brak informacji"
          }
          console.log('TEST', drzewko[0].pdz_informacje)
        }
      },

    }
  }


</script>

<style scoped>

</style>
