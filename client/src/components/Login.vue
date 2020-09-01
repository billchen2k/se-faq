<template>
  <div>
    <div v-if="user">
      <v-btn
          color="error"
          class="mr-4"
          @click="authLogout"
      >
        注销
      </v-btn>
    </div>
    <div v-else>
      <v-form
          ref="form"
          lazy-validation
      >
        <v-text-field
            v-model="password"
            label="Password"
            required
        ></v-text-field>

        <v-btn
            color="success"
            class="mr-4"
            @click="authLogin"
        >
          验证
        </v-btn>
      </v-form>
    </div>
  </div>
</template>
<script>
import config from "../../config";
import VueJwtDecode from "vue-jwt-decode";
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      password: "",
      user: null,
    };
  },
  methods: {
    async authLogin() {
      try {
        let response = await axios.post(`${config.api}/login`, {
          password: this.password
        })
        let token = response.data.token;
        localStorage.setItem("jwt", token);
        if (token) {
          this.getUserDetails();
          this.$emit('loginStatusChanged');
        }
      } catch (err) {
        console.log(err.response);
      }
    },
    async authLogout() {
      localStorage.removeItem("jwt");
      this.getUserDetails();
      this.$emit('loginStatusChanged');
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
  created() {
    this.getUserDetails();
  }
};
</script>
