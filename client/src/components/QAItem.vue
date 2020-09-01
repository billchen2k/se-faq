<template>
  <v-card :loading="loading" class="my-2" :id="'Q' + question._id">
    <v-row>
      <v-col md="1" v-if="$vuetify.breakpoint.mdAndUp">
        <span class="pl-8 quote">“</span>
      </v-col>

      <v-col sm="12" md="11">
        <v-row class="pr-3">
          <v-col sm="12" class="py-0">
            <v-list nav>
              <v-list-item-group mandatory :color="mainColor + ' darken-1'">
                <v-tooltip bottom>
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
                            <strong>
                              <vue-markdown>{{ question.content }}</vue-markdown>
                              ></strong>
                            <v-list-item-subtitle align="right">{{ question.timestamp }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </template>


                      <v-card class="pa-6">
                        <v-textarea filled v-model="new_answer" :rules="[rules.length]"
                                    prepend-icon="mdi-lead-pencil" :color="mainColor" clearable
                                    counter
                                    label="添加回答" :placeholder="question.content"
                        ></v-textarea>
                        <v-text-field
                            prepend-icon="mdi-id-card" clearable
                            :rules="[rules.ecnuid]" v-model="ecnuid"
                            label="ECNU 学号" placeholder="仅作身份验证，前端不展示" :color="mainColor">
                        </v-text-field>
                        <v-card-actions>
                          <v-row>
                            <span class="text-body-2">预览：</span>
                            <div style="max-width: 75%;">
                              <vue-markdown :source="new_answer"></vue-markdown>
                            </div>
                            <v-spacer></v-spacer>
                            <v-btn @click="createAnswer" :color="mainColor" outlined>回复</v-btn>
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


        <!-- ANSWERS -->
        <v-row v-if="answers.length == 0 && !loading">
          <v-col :class="'pr-8 ' + ($vuetify.breakpoint.mdAndUp ? 'pl-16' : 'pl-5')" sm="12">
            <v-btn :color="mainColor" block outlined @click="dialog = true">
              <v-icon small class="mr-2">mdi-lead-pencil</v-icon>
              Be the first one to reply
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="pr-5" v-for="answer in answers" :key="answer._id">
          <v-col sm="10" :class="'py-0 pr-0 '  + ($vuetify.breakpoint.mdAndUp ? 'pl-16' : '')">
            <v-list nav>
              <v-list-item-group class="mb-1" multiple mandatory color="black">
                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon>mdi-lead-pencil</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <div v-if="answer.endorsed">
                      <v-alert type="success">
                        这个回答被认可了
                      </v-alert>
                    </div>
                    <vue-markdown>{{ answer.content }}</vue-markdown>
                    <v-list-item-subtitle align="right">
                      {{ answer.ecnuid ? (answer.ecnuid.substring(2, 4) + ' 级 || ') : '' }}{{ answer.timestamp }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
          <v-col sm="2" class="py-2 pl-1">
            <v-btn :disabled="ifUpvoted(answer._id) || ifDownvoted(answer._id)"
                   :outlined="!ifUpvoted(answer._id)"
                   :color="mainColor + ' lighten-2'" block class="mb-2" small
                   v-on:click="upvote(answer._id)"
            >
              <v-icon class="pr-2">mdi-arrow-up-thick</v-icon>
              <span style="font-size: 120%">{{ answer.upvote }}</span></v-btn>
            <v-btn :disabled="ifUpvoted(answer._id) || ifDownvoted(answer._id)"
                   :outlined="!ifDownvoted(answer._id)"
                   :color="mainColor + ' lighten-2'" block small
                   v-on:click="downvote(answer._id)"
            >
              <v-icon class="pr-2">mdi-arrow-down-thick</v-icon>
              <span style="font-size: 120%">{{ answer.downvote }}</span></v-btn>
            <div v-if="user">
              <v-switch v-model="answer.endorsed" label="认可" v-on:change="changeEndorsed(answer._id)"/>
              <v-switch v-model="answer.hide" label="隐藏" v-on:change="changeHidden(answer._id)"></v-switch>
            </div>
          </v-col>

        </v-row>


      </v-col>

    </v-row>

    <v-snackbar v-model="snackbar" :timeout="3000">
      {{ snackbar_text }}
      <template v-slot:action="{ attrs }">
        <v-btn :color="mainColor" text v-bind="attrs" @click="snackbar = false">
          关闭
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>

import VueMarkdown from 'vue-markdown'
import axios from 'axios';
import config from '../../config.js';
import {format} from 'date-fns';
import {mainColor} from "../../static/constants";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "QAItem",

  components: {VueMarkdown},

  props: {
    question: Object
  },

  data() {
    return {
      mainColor,
      user: null,
      new_answer: '',
      loading: true,
      answers: [],
      snackbar: false,
      snackbar_text: '',
      ecnuid: '',
      dialog: false,
      rules: {
        length: text => {
          if (text.length >= 314) {
            this.new_answer = this.new_answer.substring(0, 314);
            return "最多 314 字。"
          }
          if (text.length < 2) {
            return '至少输点什么吧'
          }
          return true;
        },
        ecnuid: text => {
          if (text.length != 11 || (text.substring(4, 8) != '5101' && text.substring(4, 8) != '5102') || (text.substring(0, 3) != '101' && text.substring(0, 3) != '102')) {
            return '非法的学号'
          }
          return true;
        }
      },
    }
  },

  methods: {
    fetchAnswers() {
      this.loading = true;
      axios.get(config.api + "/answerOfQuestion/" + this.question._id)
          .then(response => {
            if (response.data.success) {
              response.data.data.map(one => {
                one.timestamp = format(new Date(one.timestamp), 'yyyy-MM-dd HH:mm:ss');
                return one;
              })
                this.answers = response.data.data.filter((one) =>  (!one.hide || this.user));
            } else {
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
    },
    popSnack(msg) {
      this.snackbar_text = msg;
      this.snackbar = true;
    },

    ifUpvoted(answer_id) {
      let upvoted = Array.from(JSON.parse(localStorage.upvoted || '[]'));
      return upvoted.includes(answer_id);
    },


    ifDownvoted(answer_id) {
      let downvoted = Array.from(JSON.parse(localStorage.downvoted || '[]'));
      return downvoted.includes(answer_id);
    },

    upvote(answer_id) {
      axios.get(`${config.api}/upvoteAnswer/${answer_id}`)
          .then(response => {
            // if (!localStorage.upvoted) {
            //     localStorage.upvoted = JSON.stringify("[]");
            // }
            if (response.data.success) {
              let upvoted = Array.from(JSON.parse(localStorage.upvoted));
              upvoted.push(answer_id);
              localStorage.upvoted = JSON.stringify(upvoted);
              this.popSnack('You 👍 this.');
              this.fetchAnswers();
            } else {
              throw new Error(response.data.message);
            }

          })
          .catch(e => {
            this.popSnack("Error: " + e.message);
            console.error(e);
          });
    },

    downvote(answer_id) {
      axios.get(`${config.api}/downvoteAnswer/${answer_id}`)
          .then(response => {
            // if (!localStorage.downvoted) {
            //     localStorage.downvoted = JSON.stringify("[]");
            // }
            if (response.data.success) {
              let downvoted = Array.from(JSON.parse(localStorage.downvoted));
              downvoted.push(answer_id);
              localStorage.downvoted = JSON.stringify(downvoted);
              this.popSnack('You 👎 this.');
              this.fetchAnswers();
            } else {
              throw new Error(response.data.message);
            }
          })
          .catch(e => {
            this.popSnack("Error: " + e.message);
            console.error(e);
          });
    },

    changeEndorsed (answer_id) {
      console.log(answer_id);
      axios.get(`${config.api}/changeEndorsed/${answer_id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        }
      })
          .then(response => {
            if (response.data.success) {
              this.popSnack('已更改认可状态');
              this.fetchAnswers();
            } else {
              throw new Error(response.data.message);
            }
          })
          .catch(e => {
            this.popSnack("Error: " + e.message);
            console.error(e);
          });
    },

    changeHidden (answer_id) {
      console.log(answer_id);
      axios.get(`${config.api}/changeHidden/${answer_id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        }
      })
          .then(response => {
            if (response.data.success) {
              this.popSnack('已更改隐藏状态');
              this.fetchAnswers();
            } else {
              throw new Error(response.data.message);
            }
          })
          .catch(e => {
            this.popSnack("Error: " + e.message);
            console.error(e);
          });
    },

    createAnswer() {
      if (this.new_answer.length < 2 || this.new_answer.length > 314) {
        this.popSnack("长度不太对劲。")
        return;
      }
      console.log(this.rules.ecnuid(this.ecnuid));
      if (this.rules.ecnuid(this.ecnuid) != true) {
        this.popSnack("学号不太对劲。")
        return;
      }
      this.dialog = false;
      this.loading = true;

      axios.post(`${config.api}/answer`, {
        content: this.new_answer,
        question_id: this.question._id,
        ecnuid: this.ecnuid
      })
          .then(response => {
            if (response.data.success) {
              this.fetchAnswers();
            } else {
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
    },
    getUserDetails() {
      let token = localStorage.getItem("jwt");
      if (token) {
        this.user = VueJwtDecode.decode(token);
      } else {
        this.user = null;
      }
    },
  },
  mounted() {
    this.fetchAnswers();
  },
  created() {
    this.getUserDetails();
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
