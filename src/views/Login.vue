<template>
  <div class="login">
    <div v-if="status == 'signin'" class="login_signin">
      <h2>會員登入</h2>
      <v-text-field
        v-model="email"
        flat
        solo
        label="Email"
        prepend-inner-icon="mdi-account-circle"
      />
      <v-text-field
        v-model="password"
        flat
        solo
        label="password"
        prepend-inner-icon="mdi-account-circle"
      />
      <div class="login_btn">
        <v-btn depressed large class="white--text" @click="status = 'signup'">
          註冊
        </v-btn>
        <v-btn depressed large class="white--text" @click="signin">
          登入
        </v-btn>
      </div>
    </div>
    <div v-if="status == 'signup'" class="login_signup">
      <h2>會員註冊</h2>
      <v-text-field
        v-model="email"
        flat
        solo
        label="Email*"
        prepend-inner-icon="mdi-account-circle"
      />
      <v-text-field
        v-model="password"
        flat
        solo
        label="password*"
        prepend-inner-icon="mdi-account-circle"
      />

      <v-text-field
        v-model="nickname"
        flat
        solo
        label="暱稱*"
        prepend-inner-icon="mdi-account-circle"
      />
      <div class="login_btn">
        <v-btn depressed large class="white--text" @click="status = 'signin'">
          回上頁
        </v-btn>
        <v-btn depressed large class="white--text" @click="signup">
          註冊並登入
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: 'signin',
      email: '',
      password: '',
      nickname: '',
    };
  },

  methods: {
    signin() {
      const vm = this;

      this.$store.commit('setLoadingStatus', true);
      this.$http
        .post(`${process.env.VUE_APP_baseUrl}/auth/signin`, {
          email: vm.email,
          password: vm.password,
        })
        .then((res) => {
          this.$store.commit('setLoadingStatus', false);
          if (res.data.message === 'success') {
            console.log('配token');
            document.cookie = `kaigangtoken=${res.data.token}`;
            this.$router.push('/');
          }
        });
    },
  },
};
</script>

<style lang="scss">
.login {
  background: url("../assets/img/bg.png");
}
</style>
