<template>
    <div>
      <div class="text-welcome green--text mb-12">
          <span v-text="titleText" contenteditable style="outline: none"></span>
          <span v-if="dash">_</span>
          <span v-else>&#12288;</span>
      </div>
      <div class="text-main">欢迎来到华东师范大学软件工程学院就读。</div>
      <div class="text-main">接下来的几年里，你将从 C 语言开始，逐步探索计算机的世界，发现自己无限的创造力。有的课会很难，有的知识会很深，祝你一路顺风。</div>
      <v-divider></v-divider>
      <div class="my-3">
        <v-btn rounded outlined
               :key="item.link"
               class="mr-3 my-2"
               dark color="green"
               v-for="item in referenceLists"
               @click="jump(item.link)"
        ><v-icon size="20" class="mr-2">{{ item.icon || 'mdi-link'}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-dialog v-model="leaflet_dialog" max-width="400px">
          <template v-slot:activator="{on}" >
            <v-btn rounded outlined
                   class="mr-3 my-2"
                   dark color="green"
                   v-on="on"
            ><v-icon size="20" class="mr-2">mdi-book-open-variant</v-icon>
              （过时的）华师大全攻略
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              仅供参考。
            </v-card-title>
            <v-card-text>
              这份手册全名为「一起爱上华师大——华东师范大学学习生活全攻略」，由上古时代的华师大贴吧吧友编写于 2013 年 7 月，许多内容已经过时。确定下载？
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outlined color="green" @click="leaflet_dialog=false">取消</v-btn>
              <v-btn outlined color="green" @click="downloadLeaflet">确定</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </div>
      <v-divider></v-divider>
      <div class="text-main">这里有一些常常被新生问到的问题。无论你是新人还是老人，如果你刚好路过这里，都欢迎你在这里提问 / 回答。</div>
    </div>
</template>

<script>
    export default {
        name: "WelcomeHeader",

        data() {
            return {
                titleText: "$ > ",
                fullText: "Hello, Software Engineering.",
                dash: true,
                leaflet_dialog: false,
                referenceLists: [
                    {
                        title: "华东师范大学软件学院",
                        link: "https://sei.ecnu.edu.cn"
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
                        title: "2020届软工新生群",
                        link: "https://qm.qq.com/cgi-bin/qm/qr?k=u46UI6LoM1ui-SomySwwBR3de9X090dD",
                        icon: "mdi-qqchat"
                    },
                    {
                        title: "Telegram",
                        link: "https://t.me/joinchat/QqRPzVEWLbVFChXCcOljjA",
                        icon: "mdi-telegram"
                    },
                    {
                        title: "EOJ 在线评测系统",
                        link: "https://acm.ecnu.edu.cn",
                        icon: "mdi-laptop-mac"
                    },
                    {
                        title: "HDU 航电 OJ",
                        link: "http://acm.hdu.edu.cn",
                        icon: "mdi-laptop-mac"
                    },
                    {
                        title: "VisuAlgo 算法可视化",
                        link: "https://visualgo.net/en",
                        icon: "mdi-file-tree"
                    },
                    {
                        title: "课表导出在线工具",
                        link: "https://class2ics.billc.io",
                        icon: "mdi-calendar"
                    },
                    {
                        title: "课表导出捷径（iOS 专用）",
                        link: "https://sharecuts.cn/shortcut/4812",
                        icon: "mdi-calendar"
                    }
                ]
            }
        },

        methods: {
            jump(url){
                window.open(url);
            },

            blink() {
              setInterval(() => {
                  this.dash = !this.dash;
              }, 500);
            },

            addWord(pos){
                if(pos < this.fullText.length) {
                    setTimeout(() => {
                        this.titleText += this.fullText[pos];
                        this.addWord(pos + 1);
                        // console.log('add');
                    }, 100);
                }
                else {
                    this.blink();
                }
            },

            downloadLeaflet() {
                window.open('leaflet.pdf');
                this.leaflet_dialog = false;
            }
        },



        mounted() {
            this.addWord(0);
        }
    }
</script>

<style scoped>
  .text-welcome{
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
