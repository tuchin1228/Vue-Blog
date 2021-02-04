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
        type="password"
        v-model="password"
        flat
        solo
        label="password"
        prepend-inner-icon="mdi-lock"
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
    <validation-observer v-slot="{ invalid }">
      <div v-if="status == 'signup'" class="login_signup">
        <h2>會員註冊</h2>

        <validation-provider rules="required|email" v-slot="{ errors, classes }">
          <div class="textbar">
            <input type="text" :class="classes" name="Email" v-model="email" placeholder="信箱*" />

            <span class="invalid-feedback">{{ errors[0] }}</span>
          </div>
        </validation-provider>

        <validation-provider rules="required" v-slot="{ errors, classes }">
          <div class="textbar">
            <input
              type="password"
              :class="classes"
              name="密碼"
              v-model="password"
              placeholder="密碼*"
            />

            <span class="invalid-feedback">{{ errors[0] }}</span>
          </div>
        </validation-provider>

        <validation-provider rules="required" v-slot="{ errors, classes }">
          <div class="textbar">
            <input
              type="text"
              :class="classes"
              name="暱稱"
              v-model="nickname"
              placeholder="暱稱*"
            />

            <span class="invalid-feedback">{{ errors[0] }}</span>
          </div>
        </validation-provider>

        <div class="login_btn">
          <v-btn depressed large class="white--text" @click="status = 'signin'">
            回上頁
          </v-btn>
          <v-btn depressed large class="white--text" @click="signup" :disabled="invalid">
            註冊並登入
          </v-btn>
        </div>
      </div>
    </validation-observer>
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
            this.$store.dispatch('showalerts', {
              isShow: true,
              type: 'success',
              content: '登入成功',
            });
            document.cookie = `kaigangtoken=${res.data.token}`;
            this.$router.push('/');
          } else {
            this.$store.dispatch('showalerts', {
              isShow: true,
              type: 'danger',
              content: '登入失敗',
            });
          }
        });
    },
    signup() {
      const vm = this;
      this.$store.commit('setLoadingStatus', true);
      this.$http
        .post(`${process.env.VUE_APP_baseUrl}/auth/signup`, {
          email: vm.email,
          password: vm.password,
          nickname: vm.nickname,
          role: 'ordinary',
          interest: '',
          spec: '',
          avator: '',
        })
        .then((res) => {
          this.$store.commit('setLoadingStatus', false);
          if (res.data.success) {
            this.$store.dispatch('showalerts', {
              isShow: true,
              type: 'success',
              content: '成功註冊',
            });
            vm.status = 'signin';
            vm.email = '';
            vm.password = '';
          } else {
            this.$store.dispatch('showalerts', {
              isShow: true,
              type: 'danger',
              content: '帳號已被註冊',
            });
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
