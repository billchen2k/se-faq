<template>
  <v-card  class="my-2" elevation="">
    <v-row>
      <v-col sm="1">
        <span class="pl-8 quote">“</span>
      </v-col>

      <v-col sm="11">
        <v-row class="pr-3">
          <v-col sm="12" class="py-0">
            <v-list nav>
              <v-list-item-group mandatory color="green darken-1">
                <v-tooltip right>
                  <template v-slot:activator="{ on: tooltip }">
                    <v-dialog v-model="dialog" max-width="800px">
                      <template v-slot:activator="{on: dialog}">
                        <v-list-item
                                v-on="{...dialog, ...tooltip}"
                        >
                          <v-list-item-avatar>
                            <v-icon>mdi-comment-question-outline</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title><strong>{{question}}</strong></v-list-item-title>
                            <v-list-item-subtitle align="right">{{question}}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </template>


                      <v-card class="pa-6">
                        <v-textarea filled v-model="new_answer"
                                    prepend-icon="mdi-lead-pencil" color="green" clearable counter
                                    label="添加回答" placeholder=""
                        ></v-textarea>
                        <v-card-actions>
                          <v-row>
                            <span class="text-body-2">预览：</span>
                            <div style="max-width: 75%;">
                              <vue-markdown :source="new_answer"></vue-markdown>
                            </div>
                            <v-spacer></v-spacer>
<!--                            <v-text-field label="联系方式（可选）" color="green"></v-text-field>-->
                            <v-btn color="green" outlined>reply!</v-btn>

                          </v-row>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

                  </template>
                  <span>点击问题以添加答案</span>
                </v-tooltip>
              </v-list-item-group>
            </v-list>
          </v-col>
        </v-row>

        <v-row class="pr-5">
          <v-col sm="10" class="py-0 pr-0 pl-16">

            <v-list nav>
              <v-list-item-group mandatory  color="black">
                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon>mdi-lead-pencil</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      <vue-markdown>{{answer}}</vue-markdown>

                    </v-list-item-title>
                    <v-list-item-subtitle align="right">{{answer}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>

          </v-col>
          <v-col sm="2" class="py-2 pl-1">
              <v-btn color="green lighten-2"  block class="mb-2" small dark outlined
              >
                <v-icon class="mr-2">mdi-arrow-up-thick</v-icon> 0</v-btn>
              <v-btn  color="green lighten-2" outlined block small dark
              >
                <v-icon class="mr-2">mdi-arrow-down-thick</v-icon> 0 </v-btn>
          </v-col>
        </v-row>




      </v-col>

    </v-row>

  </v-card>
</template>

<script>

  import VueMarkdown from 'vue-markdown'

    export default {
        name: "QAItem",

        components: { VueMarkdown },

        props: {
          question: Object,
          answer: Object,
        },

        data() {
            return {
                new_answer: '',
                dialog: false,
            }
        }
    }
</script>

<style scoped>
.quote {
  font-size: 500%;
  color: grey;
  font-family: sans-serif;
  overflow: hidden;
}

.v-application p {
  margin-bottom: 0px !important;
}

p {
  margin-bottom: 0px;
}
</style>