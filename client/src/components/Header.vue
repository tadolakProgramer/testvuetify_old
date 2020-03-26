<template>
    <div class="Header">
    <v-app-bar
            app
            color="primary"
            dark
    >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title>Application</v-toolbar-title>
        <v-avatar color="green" >
            <v-icon dark>mdi-account-circle</v-icon>
        </v-avatar>
    </v-app-bar>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }

</script>

<style scoped>

</style>
