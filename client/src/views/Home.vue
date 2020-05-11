<template>
    <v-row class="masthead scroll-off-screen">
        <v-col class="text-center" cols="12">
            <div class="my-2">
                <p class="text-center display-2 primary--text">Dział Utrzymania Ruchu Folplast<br>
                    zaprasza</p>
            </div>
            <div class="my-2">
                <v-btn x-large color="success"
                :to="{
                    name: 'login'
                    }">Przejdź do strony logowania</v-btn>
            </div>
        </v-col>
    </v-row>
</template>

content_copy

<script>

    export default {
        name: 'Home',

    }
</script>

<style scoped>
    .masthead {
        min-height: 72rem;
        width: auto;
        height: auto;
        padding-top: 18rem;
        background-size: cover;
        background-image:url('../assets/MG_8241_1.jpg');
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: fixed;
    }
</style>

