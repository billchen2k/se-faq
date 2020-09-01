<template>
  <div>
    <div v-if="user">
      <v-btn color="error" class="mr-4" @click="logout" outlined block>
        注销
      </v-btn>
    </div>
    <div v-else>
        <v-text-field v-model="password" label="密码" color="green" required type="password" prepend-icon="mdi-lock"/>
        <v-btn color="success" class="mr-4" @click="login" outlined block>
          验证
        </v-btn>
    </div>
  </div>
</template>

<script>
import { authLogin, getUserDetails } from "@/plugins/auth";

export default {
  name: "Login",
  data() {
    return {
      authLogin,
      getUserDetails,
      password: "",
      user: null
    };
  },
  methods: {
    async login () {
      const success = await this.authLogin(this.password);
      if (success) {
        this.user = this.getUserDetails();
        // Emit this event, to notify the high level components to re-generate the view (if necessary)
        this.$emit('loginStatusChanged');
      } else {
        console.log('密码错误');
      }
    },
    async logout () {
      // Logout, clear the local storage, and clear the user data
      localStorage.removeItem("jwt");
      this.getUserDetails();
      // Same, emit the event
      this.$emit('loginStatusChanged');
      location.reload();
    }
  },
  mounted() {
    this.user = this.getUserDetails();
  }
};
</script>
