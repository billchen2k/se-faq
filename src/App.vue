<template>
  <v-app>
    <v-navigation-drawer right app v-model="drawer">
      <v-container fluid>
        <side-navigation></side-navigation>
      </v-container>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>

      <v-row align="center" justify="center">
          <v-col md="11" lg="9">

              <welcome-header></welcome-header>
              <notice :key="item.content" v-for="item in notices" :content="item.content" :title="item.title" :icon="item.icon"></notice>
              <q-a-item question="示例问题" answer="示例**答**案 *abc* <br>"></q-a-item>
              <Footer></Footer>

          </v-col>
        </v-row>

      </v-container>

    </v-main>
  </v-app>

</template>

<script>

  import WelcomeHeader from "@/components/WelcomeHeader";
  import Footer from "@/components/Footer";
  import QAItem from "@/components/QAItem";
  import Notice from "@/components/Notice";
  import SideNavigation from "@/components/SideNavigation";

export default {
  name: 'App',

  components: {
    WelcomeHeader, Footer, QAItem, Notice, SideNavigation
  },

  data: () => ({
      drawer: true,
    notices: [
        {
            icon: "",
            title: "一个提示",
            content: "所有问题 / 答案发表后便无法再次编辑，除非被不赞同次数过多被自动隐藏。畅所欲言之时，也请稍加谨慎。\n点击回答即可添加回复，回复和提问均支持 <a href='https://guides.github.com/features/mastering-markdown/'>Markdown</a> 语法。"
        }
    ]
  })
};
</script>

<style scoped>

</style>
