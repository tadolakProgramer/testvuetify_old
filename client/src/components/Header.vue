<template>
    <div class="Header">
        <v-app-bar
                app
                color="primary"
                dark
        >
            <v-toolbar-items>
                <div>
                    <v-img src="../assets/logo.png" alt=""></v-img>
                </div>
            </v-toolbar-items>

            <v-toolbar-title>
                Naprawy
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <span></span>
            <v-btn depressed color="primary">
                Login
            </v-btn>

            <v-avatar color="primary">
                <v-icon>mdi-account</v-icon>
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
