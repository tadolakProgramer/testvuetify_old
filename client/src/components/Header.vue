<template>
    <div class="Header">
    <v-app-bar
            app
            color="primary"
            dark
    >
        <v-toolbar-title> Application </v-toolbar-title>
        <v-spacer></v-spacer>
        <span></span>
            <v-btn  depressed  color="primary">
                Login
            </v-btn>

        <v-avatar color="primary" >
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
