<template>
    <div>

        <v-tooltip left>
            <template v-slot:activator="{ on: tooltip }">
                <v-dialog v-model="dialog" max-width="800px">
                    <template v-slot:activator="{on: dialog}">
                        <v-btn :loading="loading"
                                dark
                                fixed
                                fab
                                right
                                bottom
                                v-on="{...dialog, ...tooltip}"
                                color="green"
                        >
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </template>

                    <v-card class="pa-6">
                        <v-textarea filled v-model="new_question" :rules="[rules.length]"
                                    style="font-family: 'Fira Code'" autofocus
                                    prepend-icon="mdi-comment-question" color="green" clearable counter
                                    label="提出问题" placeholder=""
                        ></v-textarea>
                        <v-card-actions>
                            <v-row>
                                <span class="text-body-2">预览：</span>
                                <div style="max-width: 75%;">
                                    <vue-markdown :source="new_question"></vue-markdown>
                                </div>
                                <v-spacer></v-spacer>
                                <!--                            <v-text-field label="联系方式（可选）" color="green"></v-text-field>-->
                                <v-btn color="green" @click="createQuestion" outlined>ask!</v-btn>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </template>
            <span>添加问题</span>
        </v-tooltip>

        <v-snackbar v-model="snackbar" :timeout="3000">
            {{ snackbar_text }}
            <template v-slot:action="{ attrs }">
                <v-btn color="green" text v-bind="attrs" @click="snackbar = false">
                    CLOSE
                </v-btn>
            </template>
        </v-snackbar>

    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown';
    import config from '../../config.js';
    import axios from 'axios';

    export default {
        components: {VueMarkdown},
        name: "QuestionCreator",
        data() {
            return {
                new_question: '',
                loading: false,
                snackbar: false,
                snackbar_text: '',
                rules: {
                    length: text => {
                        if (text.length >= 100) {
                            this.new_question = this.new_question.substring(0, 100);
                            return "最多 100 字。"
                        }
                        if (text.length < 2) {
                            this.new_question = this.new_question.substring(0, 100);
                            return "至少写点啥吧。"
                        }
                    }
                },
                dialog: false
            }
        },
        methods: {
            popSnack(msg) {
                this.snackbar_text = msg;
                this.snackbar = true;
            },

            createQuestion() {
                if (this.new_question.length < 2 || this.new_question.length > 100) {
                    this.popSnack("长度不太对劲。")
                    return;
                }
                this.dialog = false;
                this.loading = true;
                axios.post(`${config.api}/question`, {
                    content: this.new_question
                })
                .then(response => {
                    if(response.data.success){
                        this.$emit('submit');
                    }
                    else{
                        throw new Error(response.data.message);
                    }

                })
                .catch(e => {
                    this.popSnack("Error: " + e.message);
                    console.error(e);
                })
                .finally(() => {
                    this.loading = false;
                })
            }
        }

    }
</script>

<style scoped>

</style>