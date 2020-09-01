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
        components: { QAItem },

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
                        "如何贡献",
                        "[Github](https://github.com/CCXXXI/telegram_bot/blob/master/web/ecnu_faq.json) 直接发pr即可"
                    ],
                    [
                        "但是我不会用Github",
                        "软工的学生应该学会使用Github，这正是一个上手的机会\n或者也可以写在[石墨文档](https://shimo.im/sheets/833jc3RGHxdVg9yj/MODOC/)，然后等待其他人将其同步至Github"
                    ],
                    [
                        "电脑放宿舍里会被偷吗",
                        "出门锁门就行了"
                    ],
                    [
                        "能发下培养方案来康康吗",
                        "[here](http://www.sei.ecnu.edu.cn/data/list/%E5%9F%B9%E5%85%BB%E6%96%B9%E6%A1%881)"
                    ],
                    [
                        "迁户口有什么用吗",
                        "没用"
                    ],
                    [
                        "学工号就是学号吗",
                        "yes"
                    ],
                    [
                        "随申码是随申办里的那个吗",
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
                        "软工暑假要上课吗",
                        "可选"
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
                        "何院士退休了吗",
                        "去同济了"
                    ],
                    [
                        "软工会分方向吗",
                        "会的，大二下分方向，可以在数据库查到各自的培养计划"
                    ],
                    [
                        "软工有搞acm的风气吗",
                        "有acm培训的"
                    ],
                    [
                        "群",
                        "(qq)[华东师大软工本科2020](https://jq.qq.com/?_wv=1027&k=r4scwe3X)\n(qq)[ECNU 计科/软工 2020](https://jq.qq.com/?_wv=1027&k=972N8BUZ)\n(tg)[华东师范大学信息学部计算机科学与技术学院与华东师范大学信息学部软件工程学院](https://t.me/joinchat/QqRPzVEWLbVFChXCcOljjA)"
                    ],
                    [
                        "宿舍有洗衣机吗",
                        "yes"
                    ],
                    [
                        "有白送服务器的吗",
                        "【我还有个亚马逊服务器 有人要吗 白给他ssh】\n(华东师大软工本科2020 15-计科-虫和 2020/8/21 13:29:18)"
                    ],
                    [
                        "有玩fgo/明日方舟/pcr的吗",
                        "559210511"
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
                        "学软工秃头吗",
                        "敲代码很休闲的"
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
        },

        mounted() {

        }
    }
</script>

<style scoped>

</style>
