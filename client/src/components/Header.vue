<template>
    <div class="Header">
        <v-navigation-drawer
                v-model="drawer"
                v-if=automatyk
                app
        >
            <tree-view></tree-view>
        </v-navigation-drawer>
        <v-app-bar
                app
                color="primary"
                dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-items>
                <div>
                    <v-img src="../assets/logofolplast.png" alt=""></v-img>
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
                    disabled
                    color="red"
                    :to="{
                    name: 'newfailure'
                    }">
                Nowa awaria
            </v-btn>
            <div class="mx-2">
                <v-btn mx="11"
                       v-if="automatyk"
                       depressed
                       color="blue"
                       :to="{
                    name: 'failure'
                    }">
                    Lista maszyn
                </v-btn>
            </div>
            <div class="mx-2">
            <v-btn mx="11"
                    v-if="automatyk"
                    depressed
                    color="orange"
                    :to="{
                    name: 'failureAll'
                    }">
                Lista awarii
            </v-btn>
            </div>
            <v-btn mx="1"
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
            <v-avatar color="secondary"
                      v-if="!login">
                <v-icon>mdi-account</v-icon>
            </v-avatar>
            <v-avatar color="success"
                      v-if="login">
                <span class="white--text ">{{this.avatar}}</span>
            </v-avatar>
        </v-app-bar>
    </div>
</template>

<script>
    import AuthenticationService from '../services/AuthenticationService'
    import TreeView from "./treeView";

    export default {
        name: "Header",
        components: {TreeView},
        data() {
            return {
                Name: '',
                Hale: [],
                treeView: '',
                drawer: null,
                avatar:'',
                automatyk: false,
                login: false //control buttons login/logout
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('setToken', null)
                this.$store.dispatch('setUser', null)
                this.$store.dispatch('setProfesja', null)
                this.$store.dispatch('setListaTypowMaszyn', null)
                this.$store.dispatch('setListaHal', null)
                this.login = false;
                this.automatyk = false;
                this.$router.push({
                    name: 'Home'
                })
            },
            goToFailure(){
                this.$router.push({name: 'failure'})
            }
        },
        async mounted() {
            this.$root.$on('loginOK',(login, automatyk) => {
                this.login = login
                this.automatyk = automatyk
            //crate avatar
            this.avatar = this.$store.getters.user.US_Name.charAt(0) + this.$store.getters.user.US_SUER_NAME.charAt(0)
            }
            )
                this.Hale = (await AuthenticationService.getHale()).data;
            console.log('Hale: ', this.Hale)
        }
    }

</script>

<style scoped>

</style>
