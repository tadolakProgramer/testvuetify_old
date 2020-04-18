<template>
    <div class="Header">
        <v-navigation-drawer
                v-model="drawer"
                v-if=login
                app
        >
            <v-list dense>
                <v-list-item link>
                    <v-list-item-action>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-action>
                        <v-icon>mdi-contact-mail</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Contact</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar
                app
                color="primary"
                dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
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
                    v-if="automatyk"
                    depressed
                    color="red"
                    :to="{
                    name: 'login'
                    }">
                Nowa awaria
            </v-btn>
            <v-btn
                    v-if="!login"
                    depressed
                    color="primary"
                    :to="{
                    name: 'login'
                    }">
                Login
            </v-btn>

            <v-btn
                    v-if="login"
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
    import AuthenticationService from '../services/AuthenticationService'
    //import store from "../store/store";

    export default {
        name: "Header",
        data() {
            return {
                Name: '',
                Hale: [],
                drawer: null,
                automatyk: false,
                login: false //control buttons login/logout
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('setToken', null)
                this.$store.dispatch('setUser', null)
                this.$store.dispatch('setProfesja', null)
                this.login = false;
                this.automatyk = false;
                this.$router.push({
                    name: 'Home'
                })
            }
        },
        async mounted() {
            this.$root.$on('loginOK',(login, automatyk) => {
                this.login = login
                this.automatyk = automatyk})
            console.log("login", this.login);

                this.Hale = (await AuthenticationService.getHale()).data;
            console.log('Hale: ', this.Hale)
        }
    }

</script>

<style scoped>

</style>
