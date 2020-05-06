<template>
    <v-app id="App">
        <Header></Header>
        <main>
            <v-container fluid>
                <v-content>
                    <router-view>

                    </router-view>
                </v-content>
            </v-container>
        </main>

        <v-footer
                color="primary"
                app
        >
            <span class="white--text">&copy; 2020</span>
        </v-footer>
    </v-app>
</template>

<script>

    import Header from "./components/Header";

    export default {
        name: 'App',
        components: {Header},
        props: {
            source: String,
        },
        data: () => ({
            drawer: null,
        }),
        methods: {
            yourCallBackFunction () {
                this.route.go(-1);
            }
        },
        mounted () {
            document.addEventListener("backbutton", this.yourCallBackFunction, false);
        },
        beforeDestroy () {
            document.removeEventListener("backbutton", this.yourCallBackFunction);
        }
    }
</script>
