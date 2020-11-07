<template>

  <v-card class="pq-2"
          max-width="auto"
          color="secondary"
  >
    <v-card-title class="primary font-weight-bold">
      {{ maszynka.NazwaMaszyny }}

    </v-card-title>
    <v-card-subtitle>
      <div class=" d-flex justify-space-between"> {{ maszynka.NazwaTypu }} {{ maszynka.NazwaHali }}
      </div>
    </v-card-subtitle>
    <template>
      <v-row justify="center">
        <v-dialog class="primary"
            v-model="dialog"
            persistent
            max-width="490"
        >
          <v-card>
            <v-card-title class="primary">
              Dodaj nowy element maszyny
            </v-card-title>
            <v-card-text class="secondary">
              <v-text-field
                  maxlength="50"
                  v-model="pdz_Nazwa"
                  label="Nazwa elementu"
              ></v-text-field>
            </v-card-text>
            <v-card-actions class="secondary">
              <v-spacer></v-spacer>
              <v-btn
                  class="ma-2"
                  color="red" pa="2"
                  dark
                  @click="dialog = false"
              >
                Anuluj
                <v-icon right>mdi-cancel</v-icon>
              </v-btn>
              <v-btn
                  class="ma-2"
                  color="red" pa="2"
                  dark
                  @click="addNewNode(maszynaID)"
              >
                Zapisz
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <v-row>

      <v-col>
        <v-treeview v-model="drzewko"
                    :items="tree"
                    item-key="ID_Podzespol"
                    item-text="pdz_Nazwa"
                    activatable
                    return-object
                    dense
                    @update:active="update">
        </v-treeview>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col
          class="pa-6"
          cols="6">
        <v-textarea
            v-model="info"
            background-color="white"
            color="black"
            label="Opis"
            outlined
            placeholder="Brak informacji"
            rows="5"
        ></v-textarea>
        <v-btn
            class="ma-2"
            color="orange" pa="2"
            dark
            :disabled="btnDisabled"
            @click="updateNode"
        >Zapisz zmiany
          <v-icon right>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-card-actions>
      <v-btn
          class="ma-2"
          color="orange" pa="2"
          dark
          @click="node"
      >Dodaj
        <v-icon right>mdi-plus</v-icon>
      </v-btn>
      <v-btn color="orange"
             @click="pageBack"
      >Anuluj
        <v-icon right>mdi-cancel</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

import toTree from "../../helpers/toTree"
import FailureService from "@/services/FailureService";
import TreePartsService from "@/services/TreePartsService";

export default {
  name: "treePartsByMachine",
  data: () => ({
    tree: [],
    drzewko: [],
    maszynka: '',
    info: "",
    parent: "",
    pdz_informacje: "",
    pdz_Nazwa: "",
    pdz_rodzic: "",
    MaszynaID: "",
    dialog: false,
    newNode:'',
    btnDisabled : true
  }),
  watch: {
    info: function () {
      this.btnDisabled = false
    }
  },

   async mounted() {
    this.maszynka = (await FailureService.getMaszyna(this.$route.params)).data;
    this.params = this.$route.params
    await this.loadTree(this.params)
  },

  methods: {
    async loadTree(IDS) {
      const treeFromDB = (await TreePartsService.getTreeByMachine(IDS)).data;
      this.tree = toTree.arrayToTree(treeFromDB)

    },
    update(drzewko) {
      this.parent = drzewko[0].ID_Podzespol
      //console.log("da", this.act)
      if (drzewko.length > 0) {
        console.log("d", drzewko)
        if (drzewko[0].pdz_informacje) {
          this.info = drzewko[0].pdz_informacje
        }
      }
      if (drzewko.length == 0)
      {
        console.log("dd", drzewko)
      }
    },
    node() {
      this.dialog = true
    },
    pageBack() {
      this.$router.push({name: 'failure'})
    },

    async addNewNode(){

      if (!this.parent){
        this.parent = 0
      }
      try {
        const response = await TreePartsService.addNewNode({
          MaszynaID: this.maszynka.ID_Maszyna,
          pdz_Nazwa: this.pdz_Nazwa,
          pdz_rodzic: this.parent
        })
        this.newNode = await response.data
        await this.loadTree(this.params)
      }
      catch (e) {
        console.log(e)
      }
      this.dialog=false
    },
    async updateNode(){
      try {
        const response = await TreePartsService.updateNode({
          pdz_informacje: this.info,
          ID_Podzespol: this.parent
        })
        this.newNode = await response.data
      }
      catch (e) {
        console.log(e)
      }
    }
  }
}


</script>

<style scoped>

</style>
