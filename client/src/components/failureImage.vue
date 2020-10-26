<template>
    <v-card class="md-2 my-1"
            width="auto"
            color="secondary"
            :disabled="disable">
        <v-card-title class="primary font-weight-bold">Zdjęcia</v-card-title>
      <v-file-input
          v-model="files"
          accept="image/png, image/jpeg"
          prepend-icon="mdi-camera"
          placeholder="Wybierz zdjęcie"
          @change="onFileSelected"
      >
      </v-file-input>
      <v-img
          src="https://picsum.photos/350/165?random"
          height="125"
          class="grey darken-4"
      ></v-img>
      <v-btn
        @click="onUploud">Dodaj
      </v-btn>
        <v-card-actions>
            <v-btn
                color="orange"
                @click="addParts">Dodaj
                <v-icon right>mdi-plus</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>

    import {mapGetters} from "vuex";
    import Imageservise from "../services/ImageService"

    export default {
        name: "failureImage",
        data: () => ({
          selectedFile: null,
          files:null,
          ID_AWARIA:'',
        }),
        return:{
            x:''
        },
        props: {
            disable:{
                type: Boolean,
                default: false
            }
        },
        async created() {
            this.ID_AWARIA = this.getIdFailure();
        },

        methods: {
            ...mapGetters([
                'getIdFailure']),
            addParts(){
                this.$router.push({name:'allParts'})
            },
          onFileSelected(file) {
              this.files = file
              console.log(this.files)
          },
           async onUploud(){
              const formData = new FormData();
              formData.append('file', this.files);
              await Imageservise.upLoudImage(formData)

          }
        }
    }
</script>

<style scoped>

</style>
