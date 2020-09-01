<template>
  <div>
    <q-a-item v-for="item in questions" :question="item" :key="item._id"
              v-on:submit="newAnswer=> $emit('submit', newAnswer)"></q-a-item>
  </div>
</template>

<script>

import config from '../../config.js';
import axios from 'axios';
import QAItem from "@/components/QAItem";

export default {
  name: "QAItemList",
  components: {QAItem},

  props: {
    questions: Array
  },

  data() {
    return {
      egquestions: [
        [
          "ECNU?",
          "East China Normal University <del>东中国正常大学</del> 华东师范大学"
        ],
        [
          "SE?",
          "Software Engineering 软件工程\n暂时没有其它系的同学在维护这篇FAQ所以只有SE"
        ],
        [
          "2020?",
          "明年改成2021大概能接着用"
        ],
        [
          "FAQ?",
          "Frequently Asked Questions 常见问题（及解答）"
        ],
        [
          "学工号就是学号吗",
          "yes"
        ],
        [
          "宿舍晾衣服干得快吗",
          "取决于天气，另外宿舍有烘干机"
        ],
        [
          "易班有用吗",
          "用不太上，但注册还是要注册的，后面会有一个形式政策考试要用"
        ],
        [
          "开学学习任务累吗，快乐吗",
          "不重，快乐\n<del>至少Yoshino-s是这样回答的</del>"
        ],
        [
          "请问下软工上课用电脑时间久吗，想买个游戏本担心续航跟不上",
          "* 需要用电脑的课 基本在机房 在机房就有电源插座\n* 有时候上其他不用电脑的课也需要带电脑赶Project，买游戏本主要考虑上课背着沉不沉"
        ],
        [
          "软工的晚自习是到九点半吗",
          "软工没有晚自习"
        ],
        [
          "那可以混到计科那边上晚自习吗",
          "可以 快去"
        ],
        [
          "大一要带/买电脑吗",
          "要，如果你想在宿舍而不是机房做作业"
        ],
        [
          "台式能放宿舍里吗",
          "yes"
        ],
        [
          "宿舍有洗衣机吗",
          "yes"
        ],
        [
          "EOJ是我们学校自己的吗",
          "yes"
        ],
        [
          "分班吗",
          "有行政班 但是没啥用 课都是你自己选的 大一上除外"
        ],
        [
          "电脑保险柜有必要吗",
          "无"
        ]
      ]
    }
  },

  methods: {
    importer() {
      this.egquestions.forEach(one => {
        axios.post(config.api + '/question', {content: one[0]})
            .then(response => {
              axios.post(config.api + '/answer', {
                content: one[1],
                question_id: response.data.data._id
              })
                  .then(res => {
                    console.warn(res);
                  })
            })
      })
    }
  }
}
</script>

<style scoped>

</style>
