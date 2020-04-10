<template>
  <v-layout>
    <v-flex xs12 sm10 offset-sm1>
      <v-card>
          <v-container  fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">Top 10 Australian beaches</span>
              </v-flex>
            </v-layout>
          </v-container>
        <v-card-title>
          <div>
            <span class="grey--text">Number 10</span><br>
            <span>Whitehaven Beach</span><br>
            <span>Whitsunday Island, Whitsunday Islands</span>
          </div>
        </v-card-title>
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
    data: () => ({
      drawer: null,
    }),
    async mounted() {
      try {
        const maszynaId = this.$store.state.route.params.maszynaId;
        this.Hale = (await NotificationService.newnotification(maszynaId)).data;
        console.log('Hale: ', this.Hale)
      } catch (e) {
        console.log(e)
      }
    }
  }
</script>
