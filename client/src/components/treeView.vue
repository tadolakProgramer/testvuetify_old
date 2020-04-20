<template>
    <v-treeview :items="items"></v-treeview>
</template>

<script>
    //import store from "../store/store";
    export default {
        name: "treeView",

        data: () => ({
            items: []
        }),
        async mounted() {
            this.listaHal = await this.$store.getters.getListaHal
            this.items =
                [
                    {
                        id: 1,
                        name: 'Hale:',
                        children: [this.listaHal],
                    },
                    {
                        id:20,
                        name: 'Maszyny',
                        children: [await this.$store.getters.getListaHal],
                    }
                ]
        }
    }

</script>

<style scoped>

</style>
