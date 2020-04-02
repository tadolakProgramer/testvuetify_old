<template>
    <div class="masthead">
        <v-row justify="center">
            <v-card
                    class="mx-auto"
                    max-width="344"
                    outlined
                    color="transparent"
            >
                <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-4">OVERLINE</div>
                        <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
                        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-avatar
                            tile
                            size="80"
                            color="grey"
                    ></v-list-item-avatar>
                </v-list-item>

                <v-card-actions>
                    <v-btn text>Button</v-btn>
                    <v-btn text>Button</v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
    </div>
</template>

<script>
    export default {
        name: "Login"
    }
</script>

<style scoped>
    .masthead {
        min-height: 75rem;
    / / width: 100 %;
    / / height: 100 %;
        padding-top: 8rem;
    / / resize: horizontal;
        background: url('../assets/MG_8241_1.jpg') fixed;
    / / background-position: top center;
        background-repeat: no-repeat;
        background-size: cover;
        background-color: #00b0ff;
    }
</style>
