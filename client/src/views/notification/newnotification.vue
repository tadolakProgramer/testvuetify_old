<template>
    <v-layout>
        <v-flex xs2 sm8 offset-sm2>
            <template>
                <v-row justify="center">
                    <v-dialog v-model="dialog" persistent max-width="390">
                        <v-card>
                            <v-card-title class="headline primary">Info</v-card-title>
                            <v-card-text>{{dialogText}}</v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1"  @click="closeNewNotifikation">OK</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-row>
            </template>
            <v-form
                    ref="form"
                    v-model="valid"
                    :lazy-validation="lazy"
            >
            <v-card class="pq-2"
                    max-width="auto"
                    color="secondary"
            >
                <v-card-title class="primary font-weight-bold justify-space-between">Zgłoszenie awarii:
                    {{maszynka.NazwaMaszyny}}<span>{{dataGodzina}}</span>
                </v-card-title>
                <v-card-subtitle class="pt-10 font-weight-bold">
                    <span>{{maszynka.NazwaTypu}}<br></span>
                    <span>{{maszynka.NazwaHali}}</span>

                </v-card-subtitle>
                <v-card-text>
                    <v-textarea
                            v-model="AW_OpisAwarii"
                            background-color="white"
                            color="black"
                            label="Opisz awarię"
                            hint="Minimum 25 znaków"
                            :counter="25"
                            :rules="[rules.required, rules.min]"
                            outlined
                            rows="3"
                    ></v-textarea>
                    <span>Zgłaszający: {{user.US_Name}} {{user.US_SUER_NAME}} {{user.US_PROFESJA}}</span>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                            color="orange"
                            :disabled="!valid"
                            @click="AddNewNotification">Zapisz</v-btn>
                    <v-btn  color="orange"
                            @click="pageBack(maszynka.Hala_id)"
                    >Anuluj</v-btn>
                </v-card-actions>
            </v-card>
            </v-form>
        </v-flex>
    </v-layout>
</template>

<script>

    import NotificationService from "../../services/NotificationService";
    import moment from 'moment';
    import store from "../../store/store";

    export default {
        props: {
            source: String,
        },
        data() {
            return {
                dialog: false,
                dialogText:'',
                maszynka: '',
                dataGodzina: '',
                user:'',
                AW_DataZgloszenia:'',
                Maszyna_ID:'',
                AW_Zglaszajacy_ID:'',
                AW_OpisAwarii:'',
                AW_Zrealizowane:'',
                NowaAwaria:{},
                rules: {
                    required: value => !!value || 'To pole nie może być puste.',
                    min: v => v.length > 25 || 'Min 25 znaków'
                }
            }
        },
        async mounted() {
            try {
                this.maszynka = (await NotificationService.getMaszyna(this.$route.params)).data;
                moment.locale('pl');
                this.dataGodzina = moment().format('lll');
                this.user = store.getters.user;
            } catch (e) {
                console.log(e)

            }
        },

        methods: {

            validate () {
                this.$refs.form.validate()
            },
            async AddNewNotification() {
                try {
                    const response = await NotificationService.addNewNotification({
                        Maszyna_ID: this.maszynka.ID_Maszyna,
                        AW_Zglaszajacy_ID: this.user.ID_USER,
                        AW_OpisAwarii: this.AW_OpisAwarii,
                        AW_Zrealizowane: 'Zgłoszenie',
                        AW_DataZgloszenia: this.AW_DataZgloszenia = moment().format("MM DD YYYY HH:mm:ss", true),
                    });
                    this.NowaAwaria = await response.data
                    this.dialogText = 'Awaria nr: ' + this.NowaAwaria.ID_AWARIA + ', maszyny ' + this.maszynka.NazwaMaszyny + ' została poprawnie zapisana!'
                    this.dialog = true;
                }
                catch (e) {
                    console.log(e)
                }
            },
            closeNewNotifikation() {
                this.dialog = false
                this.pageBack(this.maszynka.Hala_id)
            },
            pageBack(Hala_id) {
                this.$router.push({name: 'notification', params:{IdHala:Hala_id}})
            }
        }
    }
</script>
