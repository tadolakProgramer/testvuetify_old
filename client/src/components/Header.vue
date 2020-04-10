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
                {{Name}}
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <span></span>

            <v-btn
                    v-if="!$store.state.isUserLoggedIn"
                    depressed
                    color="primary"
                    :to="{
                    name: 'login'
                    }">
                Login
            </v-btn>

            <v-btn
                    v-if="$store.state.isUserLoggedIn"
                    depressed
                    color="primary"
                    @click="logout">
                Logout
            </v-btn>
            <v-avatar color="primary">
                <v-icon>mdi-account</v-icon>
            </v-avatar>
        </v-app-bar>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
            Name: ''
            }
            },

        methods: {
            logout() {
                this.$store.dispatch('setToken', null)
                this.$store.dispatch('setUser', null)
                this.$router.push({
                    name: 'Home'
                })
            }
        }
    }

</script>

<style scoped>

</style>
