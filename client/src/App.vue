<template>
  <v-app id="App">
    <page-header></page-header>
    <main>
      <v-container fluid>
        <v-content>
          <router-view>

          </router-view>
        </v-content>
      </v-container>
    </main>

    <v-footer
            color="secondary"
            app
    >
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Header from './components/Header'
  export default {
    comments:{
      'page-header':Header
    },
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
  }
</script>
