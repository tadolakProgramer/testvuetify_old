<template>
    <div class="masthead scroll-off-screen" >
            <v-card
                    class="pa-6 ma-auto"
                    max-width="344"
                    outlined
                    elevation="15"
                    color="transparent"
            >
                <v-text-field
                        v-model="US_LOGIN"
                        hint="Wpisz swoje Login"
                        label="Login"
                        outlined
                ></v-text-field>
                <v-text-field
                        v-model="US_PASS"
                        :type="show1 ? 'text' : 'password'"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="show1 = !show1"
                        label="Hasło"
                        outlined
                ></v-text-field>

                <v-card-actions>
                    <v-layout align-center justify-center>
                    <v-btn
                            class="ma-2"
                            outlined
                    >
                        <v-icon left>mdi-account-outline</v-icon>Loguj
                        </v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                US_LOGIN: '',
                US_PASS: '',
                show1: false,
            }
        }
    }
</script>

<style scoped>
    .masthead {
        min-height: 75rem;
        width: 100%;
        height: 100%;
        padding-top: 18rem;
        background: url('../assets/MG_8241_1.jpg') fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        background-color: #00b0ff;
    }
</style>

<!--TODO
    block scroll page-->