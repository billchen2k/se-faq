<template>
  <div class="ma-6">
    <v-row align="center" justify="center">
      <div class="grey--text text-sm-body-2">华东师范大学新生问答</div>
    </v-row>
    <v-row align="center" justify="center">
      <div class="grey--text text-sm-body-2">这<em>不是</em>一个官方的站点</div>
    </v-row>
    <v-row align="center" justify="center">
      <div class="grey--text text-sm-body-2" @click="showLogin = true;">管理入口</div>
      <v-card v-if="showLogin">
        <Login @loginStatusChanged="loginStatusChanged"/>
      </v-card>
    </v-row>
    <v-row align="center" justify="center">
      The CS version is maintained by <a style="text-decoration: none" target="_blank" href="maito:jxtxzzw@126.com">
      <v-icon small>mdi-email</v-icon>
      <span class="grey--text text-sm-body-2 mx-2">jxtxzzw</span></a> at
      <a style="text-decoration: none" target="_blank" href="https://github.com/jxtxzzw/se-faq">
        <v-icon small>mdi-github</v-icon>
        <span class="grey--text text-sm-body-2 mx-2">GitHub</span></a>
    </v-row>
    <v-row align="center" justify="center">
      (Forked from the SE version: <a style="text-decoration: none" target="_blank"
                                      href="https://github.com/BillChen2K/se-faq">
      <v-icon small>mdi-github</v-icon>
      <span class="grey--text text-sm-body-2 mx-2">GitHub</span></a>, powered and maintained by
      <a style="text-decoration: none" target="_blank" href="maito:Bill.Chen@live.com">
        <v-icon small>mdi-email</v-icon>
        <span class="grey--text text-sm-body-2 mx-2">BillC</span></a>)
    </v-row>
  </div>
</template>

<script>
import {mainColor} from "../../static/constants";
import Login from "@/components/Login";

export default {
  name: "Footer",
  components: {
    Login
  },
  data() {
    return {
      mainColor,
      showLogin: false,
    }
  },
  methods: {
    loginStatusChanged () {
      this.showLogin = false;
      this.$emit("loginStatusChanged");
    }
  }
}
</script>

<style scoped>

</style>
