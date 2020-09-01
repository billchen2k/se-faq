<template>
  <v-card :loading="loading" class="my-2" :id="'Q' + question._id">
    <v-row>
      <v-col md="1" v-if="$vuetify.breakpoint.mdAndUp">
        <span class="pl-8 quote">“</span>
      </v-col>

      <v-col sm="12" md="11">

        <!-- QUESTION -->
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
                            @click="new_answer = ''"
                        >
                          <v-list-item-avatar>
                            <v-icon>mdi-comment-question</v-icon>

                          </v-list-item-avatar>
                          <v-list-item-content>
                            <strong>
                              <vue-markdown>{{ question.content }}</vue-markdown>
                            </strong>
                            <v-list-item-subtitle align="right">{{ question.timestamp }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </template>


                      <v-card class="pa-6">
                        <v-textarea filled v-model="new_answer" :rules="[rules.length]" autofocus
                                    prepend-icon="mdi-lead-pencil" :color="mainColor" clearable
                                    counter style="font-family: 'Fira Code'"
                                    :label="new_answer.includes('Re:') ? '回复回答' : '添加回答'"
                                    :placeholder="question.content" ref="answerField"
                        ></v-textarea>
                        <v-text-field
                            style="font-family: 'Fira Code'"
                            prepend-icon="mdi-id-card" clearable
                            :rules="[rules.ecnuid]" v-model="ecnuid"
                            label="ECNU 学号" placeholder="仅作身份验证，前端不展示" :color="mainColor">
                        </v-text-field>
                        <v-card-actions>
                          <v-row>
                            <v-icon class="mr-2 pl-1">mdi-language-markdown</v-icon>
                            <v-col md="10" sm="6" class="pa-0 pr-4">
                              <v-slide-y-transition leave-absolute>
                                <v-card :key="new_answer.length>0" v-if="new_answer.length>0" outlined class="pa-2">
                                  <vue-markdown :source="new_answer"></vue-markdown>
                                </v-card>
                                <div v-else class="grey--text text-body-2 pl-1 pt-2">预览</div>
                              </v-slide-y-transition>
                            </v-col>
                            <v-btn align="right" @click="createAnswer" :color="mainColor" outlined>reply!</v-btn>
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
              <v-list-item-group class="mb-1" multiple mandatory :color="answer.hide ?  'grey' : (answer.endorsed ? 'orange darken-2' : 'black')">
                <v-list-item @click="prepareReply(answer.index, answer.content)">
                  <v-list-item-avatar>
                    <v-row no-gutters>
                      <v-col sm="12" no-gutters>
                        <v-icon v-if="answer.endorsed">mdi-star-box</v-icon>
                        <v-icon v-else color="grey darken-2">mdi-lead-pencil</v-icon>
                      </v-col>
                      <v-col sm="12" no-gutters>
                        <div style="font-size: 75%; color: #555555"> #{{ answer.index }}</div>
                      </v-col>
                    </v-row>
                  </v-list-item-avatar>
                  <v-list-item-content>

                    <vue-markdown>{{ answer.content }}</vue-markdown>
                    <v-list-item-subtitle class="" align="right">
                      {{ answer.ecnuid ? (answer.ecnuid.substring(2, 4) + ' 级 || ') : '' }}{{ answer.timestamp }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <v-row class="ml-5" v-if="user">
              <v-switch color="orange" class="ma-1" v-model="answer.endorsed" label="精选" v-on:change="changeEndorsed(answer._id)"/>
              <v-switch color="green" class="ma-1" v-model="answer.hide" label="隐藏" v-on:change="changeHidden(answer._id)"></v-switch>
              <span class="grey--text pa-2">IP : {{answer.ip == '::1' ? 'unknown' : answer.ip}}</span>
            </v-row>
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
            <!-- Only show the operations when admin is logged in. A back-end verification is still needed. -->


          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" :timeout="3000">
      {{ snackbar_text }}
      <template v-slot:action="{ attrs }">
        <v-btn :color="mainColor" text v-bind="attrs" @click="snackbar = false">
          CLOSE
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
import pangu from 'remark-pangu';
import remark from 'remark';
import {getUserDetails} from "@/plugins/auth";

export default {
  name: "QAItem",

  components: {VueMarkdown},

  props: {
    question: Object
  },

  data() {
    return {
      getUserDetails,
      mainColor: 'green',
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
              response.data.data.map((one, index) => {
                one.timestamp = format(new Date(one.timestamp), 'yyyy-MM-dd HH:mm:ss');
                one.index = index;
                remark().use(pangu).process(one.content, (err, doc) => {
                  one.content = String(doc);
                });
                return one;
              })
              this.answers = response.data.data.filter(one => (!one.hide || this.user));
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

    // We only need the answer_id, and we do endorsed = !endorsed to flip the value
    changeEndorsed(answer_id) {
      // Add a header, use Bearer token
      axios.get(`${config.api}/changeEndorsed/${answer_id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        }
      })
          .then(response => {
            // Changed successfully
            if (response.data.success) {
              this.popSnack('已更改精选状态');
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

    // Same, we do not need the original value, we flip the value, using hide = !hide
    changeHidden(answer_id) {
      // Authorization uses Bearer token (for JWT)
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

    prepareReply(index, content) {
      this.dialog = true;
      this.new_answer = `> Re:#${index} ${content.replace('\n\n', '\n')} \n\n`;
    }
  },

  mounted() {
    this.fetchAnswers();
  },
  created() {
    this.user = this.getUserDetails();
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
