<template>
  <div class="ma-6">
    <v-row align="center" justify="center">
      <div class="grey--text text-sm-body-2">East China Normal University</div>
    </v-row>
    <v-row align="center" justify="center">
      <div class="grey--text text-sm-body-2">This is NOT an official site.</div>
    </v-row>
    <v-row align="center" justify="center">
      <v-dialog v-model="showLogin" max-width="400">
        <v-card outlined>
          <v-card-title>Sudo mode</v-card-title>
          <v-card-text>
            <Login @loginStatusChanged="loginStatusChanged"/>

          </v-card-text>
        </v-card>
      </v-dialog>
      <a v-if="$route.query.admin != undefined || this.user" style="text-decoration: none" class="grey--text text-sm-body-2" @click="showLogin = !showLogin;"><v-icon small>mdi-hammer-wrench</v-icon><span class="grey--text text-sm-body-2 mx-2">Manage</span></a>
      <a style="text-decoration: none" target="_blank" href="https://github.com/BillChen2K/se-faq"><v-icon small>mdi-github</v-icon><span class="grey--text text-sm-body-2 mx-2">GitHub</span></a>
      <a style="text-decoration: none" target="_blank" href="maito:Bill.Chen@live.com"><v-icon small>mdi-email</v-icon><span class="grey--text text-sm-body-2 mx-2">Contact</span></a>

    </v-row>
  </div>
</template>

<script>
import {mainColor} from "../../static/constants";
import Login from "@/components/Login";
import {getUserDetails} from "@/plugins/auth";

export default {
  name: "Footer",
  components: {
    Login
  },
  data() {
    return {
      mainColor,
      getUserDetails,
      user: null,
      showLogin: false,
    }
  },
  methods: {
    loginStatusChanged() {
      this.showLogin = false;
      this.$emit("loginStatusChanged");
    }
  },

  created() {
    this.user = this.getUserDetails();
  }
}
</script>
