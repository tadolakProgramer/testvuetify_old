<template>
    <v-list dense>
        <v-list-item>
            <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Menu</v-list-item-title>
        </v-list-item>

        <!--Statystyka-->
        <v-list-group
                prepend-icon="mdi-chart-areaspline-variant"
                value="true"
        >
            <template v-slot:activator>
                <v-list-item-title>Statystyka</v-list-item-title>
            </template>

            <v-list-item
                    link
                    :to="{name: 'chartsLine'}">
                <v-list-item-icon>
                    <v-icon v-text="statystyka[0].icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title v-text="statystyka[0].text"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list-group>




        <!--&lt;!&ndash;Users&ndash;&gt;
        <v-list-group
                prepend-icon="account_circle"
                value="true"
        >
            <template v-slot:activator>
                <v-list-item-title>Users</v-list-item-title>
            </template>

            <v-list-group
                    no-action
                    sub-group
                    value="true"
            >
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title>Admin</v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item
                        v-for="(admin, i) in admins"
                        :key="i"
                        link
                >
                    <v-list-item-title v-text="admin[0]"></v-list-item-title>
                    <v-list-item-icon>
                        <v-icon v-text="admin[1]"></v-icon>
                    </v-list-item-icon>
                </v-list-item>

            </v-list-group>

            <v-list-group
                    sub-group
                    no-action
            >
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title>Actions</v-list-item-title>
                    </v-list-item-content>
                </template>
                <v-list-item
                        v-for="(crud, i) in cruds"
                        :key="i"
                        @click="ZZZZ"
                >
                    <v-list-item-title v-text="crud[0]"></v-list-item-title>
                    <v-list-item-action>
                        <v-icon v-text="crud[1]"></v-icon>
                    </v-list-item-action>
                </v-list-item>
            </v-list-group>
        </v-list-group>-->
    </v-list>
</template>

<script>
    export default {
        data: () => ({
            statystyka: [
                { text: 'Suma Awarii', icon: 'mdi-chart-gantt' }
            ],
            admins: [
                ['Management', 'people_outline'],
                ['Settings', 'settings'],
            ],
            cruds: [
                ['Create', 'add'],
                ['Read', 'insert_drive_file'],
                ['Update', 'update'],
                ['Delete', 'delete'],
            ],
        }),
    }
</script>

<style scoped>

</style>
