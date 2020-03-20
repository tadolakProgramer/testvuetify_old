<template>
  <v-app id="inspire">
    <v-app-bar
            app
            color="green"
            dark
    >


      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Application</v-toolbar-title>
      <v-avatar color="indigo" >
        <v-icon dark>mdi-account-circle</v-icon>
      </v-avatar>
    </v-app-bar>

    <main>
      <v-container fluid>
        <v-content>
          <router-view>

          </router-view>
        </v-content>
      </v-container>
    </main>

    <v-footer
            color="green"
            app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
  }
</script>
