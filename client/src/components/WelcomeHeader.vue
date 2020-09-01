<template>
  <div>
    <div class="text-welcome mb-12">
      <span v-text="titleText" contenteditable :style="{outline: 'none', color: mainColor}"></span>
      <span v-if="dash">_</span>
      <span v-else>&#12288;</span>
    </div>
    <div class="text-main">欢迎来到<span style="color:#B70031">华东师范大学</span><span :style="{color: mainColor}">{{
        schoolName
      }}</span>就读。
    </div>
    <div class="text-main">接下来的几年里，你将从 C 语言开始，逐步探索计算机的世界，发现自己无限的创造力。有的课会很难，有的知识会很深，祝你一路顺风。</div>
    <v-divider></v-divider>
    <div class="my-3">
      <v-btn rounded outlined
             :key="item.link"
             class="mr-3 my-2"
             dark :color="mainColor"
             v-for="item in referenceLists"
             @click="jump(item.link)"
      >
        <v-icon size="20" class="mr-2">{{ item.icon || 'mdi-link' }}</v-icon>
        {{ item.title }}
      </v-btn>

    </div>
    <v-divider></v-divider>
    <div class="text-main">这里有一些常常被新生问到的问题。无论你是新人还是老人，如果你刚好路过这里，都欢迎你在这里提问/回答。</div>
  </div>
</template>

<script>
import {mainColor, schoolName, schoolNameAbbr, schoolQQ, schoolWeb} from "../../static/constants";
import {getUserDetails} from "@/plugins/auth";

export default {
  name: "WelcomeHeader",
  data() {
    return {
      getUserDetails,
      mainColor,
      schoolName,
      schoolNameAbbr,
      titleText: "$ > ",
      fullText: "Hello, Computer Science.",
      dash: true,
      referenceLists: [
        {
          title: `华东师范大学${schoolName}学院`,
          link: `${schoolWeb}`
        },
        {
          title: "学生公共数据库",
          link: "https://idc.ecnu.edu.cn"
        },
        {
          title: "大夏学堂",
          link: "https://elearning.ecnu.edu.cn/"
        },
        {
          title: `${schoolNameAbbr}新生群`,
          link: `${schoolQQ}`,
          icon: "mdi-qqchat"
        },
        {
          title: "EOJ 在线评测系统",
          link: "https://acm.ecnu.edu.cn",
          icon: "mdi-laptop-mac"
        },
        {
          title: "VisuAlgo 算法可视化",
          link: "https://visualgo.net/en",
          icon: "mdi-file-tree"
        },
        {
          title: "课表导出在线工具（Provided by BillChen）",
          link: "https://class2ics.billc.io",
          icon: "mdi-calendar"
        }
      ]
    }
  },

  methods: {
    jump(url) {
      window.open(url);
    },

    blink() {
      setInterval(() => {
        this.dash = !this.dash;
      }, 500);
    },

    addWord(pos) {
      if (pos < this.fullText.length) {
        setTimeout(() => {
          this.titleText += this.fullText[pos];
          this.addWord(pos + 1);
          // console.log('add');
        }, 100);
      } else {
        this.blink();
      }
    }
  },

  mounted() {
    this.addWord(0);
  },

  created() {
    this.getUserDetails();
  }
}
</script>

<style scoped>
.text-welcome {
  font-family: Fira Code;
  font-size: 250%;
  font-weight: bold;
}

.text-main {
  color: #444444;
  margin-bottom: 20px;
  margin-top: 20px;
}

</style>

<style scoped src="../../static/style/main.css"></style>
