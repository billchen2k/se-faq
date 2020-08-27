<template>
    <div>
      <div class="text-welcome green--text mb-12">
        <v-scale-transition leave-absolute mode="in-out">
          <span v-text="titleText + (dash ? '_' : '')"></span>
        </v-scale-transition>
      </div>
      <div class="text-main">欢迎来到华东师范大学软件工程学院就读。</div>
      <v-divider></v-divider>

      <div class="my-3">
        <v-btn rounded outlined
               :key="item.link"
               class="mr-3 my-2"
               dark color="green"
               v-for="item in referenceLists"
               @click="jump(item.link)"
        ><v-icon class="mr-2">{{ item.icon || 'mdi-link'}}</v-icon>
          {{item.title}}
        </v-btn>
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
                fullText: "Welcome to Software Engineering.",
                dash: true,
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
                        title: "EOJ 华师大在线评测系统",
                        link: "https://acm.ecnu.edu.cn"
                    },
                    {
                        title: "HDUOJ 杭电在线评测系统",
                        link: "http://acm.hdu.edu.cn/"
                    },
                    {
                        title: "课程表导出工具",
                        link: "http://class2ics.billc.io",
                        icon: "mdi-calendar"
                    },
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
                        console.log('add');
                    }, 100);
                }
                else {
                    this.blink();
                }
            }
        },



        mounted() {
            this.addWord(0);
        }
    }
</script>

<style scoped>
  .text-welcome{
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
