<template>
    <div class="userinfo">
        <div v-if="editRole == true" class="editbox">
            <v-btn
                v-if="!editing"
                tile
                color="success"
                depressed
                @click="editing = true"
            >
                <v-icon left> mdi-pencil </v-icon>
                編輯
            </v-btn>
        </div>

        <div v-if="!editing" class="infobox">
            <div class="infoimgbox">
                <img
                    v-if="this.$store.state.Userinfo.avator"
                    :src="this.$store.state.Userinfo.avator"
                />
                <img
                    v-if="!this.$store.state.Userinfo.avator"
                    src="@/assets/img/user.png"
                    class="avator"
                    alt=""
                />
            </div>

            <div class="infocontent">
                <h2>
                    <span>{{ this.$store.state.Userinfo.email }}</span
                    >({{ this.$store.state.Userinfo.nickname }})
                </h2>
                <h3>
                    <span>興趣</span
                    ><small>{{ this.$store.state.Userinfo.interest }}</small>
                </h3>
                <h3>
                    <span>專長</span
                    ><small>{{ this.$store.state.Userinfo.spec }}</small>
                </h3>
            </div>
        </div>
        <h4 v-if="!editing" class="ownpost">最近Po文</h4>
        <div v-if="!editing" class="ArticleList" style="margin: 0">
            <ArticleList
                :articlelist="this.$store.state.ArticleList.data"
                v-if="
                    this.$store.state.ArticleList.data &&
                    this.$store.state.ArticleList.data.length
                "
            />
            <h3 v-else style="text-align: center">無發佈任何文章</h3>
        </div>
        <form class="edit_area" v-if="editing">
            <div class="avatorbox">
                <div class="imgarea">
                    <img v-if="newInfo.avator.length" :src="newInfo.avator" />
                    <img
                        v-if="newInfo.avator.length === 0"
                        src="@/assets/img/user.png"
                        class="avator"
                        alt=""
                    />
                </div>

                <div class="uploadbtn">
                    <span>上傳頭像</span>
                    <input id="" type="file" name="" @change="uploadImg" />
                </div>
            </div>

            <div class="inputbox">
                <label for="">暱稱</label>
                <v-text-field v-model="newInfo.nickname" outlined dense />
            </div>
            <div class="inputbox">
                <label for="">興趣</label>
                <v-text-field v-model="newInfo.interest" outlined dense />
            </div>
            <div class="inputbox">
                <label for="">專長</label>
                <v-text-field v-model="newInfo.spec" dense outlined>
                    <label for="">更換頭像</label>
                </v-text-field>
            </div>
            <section class="edit_confirm">
                <v-btn depressed color="success" @click="submit"> 送出 </v-btn>
                <v-btn
                    v-if="editing"
                    depressed
                    color="error"
                    @click="editing = false"
                >
                    取消
                </v-btn>
            </section>
        </form>
    </div>
</template>

<script>
import jwtDecode from 'jwt-decode';
import ArticleList from '@/components/ArticleList.vue';

export default {
  components: {
    ArticleList,
  },
  data() {
    return {
      userinformation: {},
      editRole: false,
      editing: false,
      newInfo: {
        interest: '',
        spec: '',
        avator: '',
        nickname: '',
      },
    };
  },
  created() {
    this.getUserInfo();
    this.checkClient();
  },
  computed: {
    Userinfo() {
      return this.$store.getters.Userinfo;
    },
  },
  watch: {
    Userinfo() {
      this.$store.dispatch('getArticleListByUser', {
        kind: 'user',
        keyword: this.$route.params.id,
      });
      this.newInfo.interest = this.Userinfo.interest;
      this.newInfo.spec = this.Userinfo.spec;
      this.newInfo.avator = this.Userinfo.avator;
      this.newInfo.nickname = this.Userinfo.nickname;
    },
    $route() {
      this.getUserInfo();
      this.checkClient();
    },
  },
  methods: {
    submit() {
      const vm = this;
      const cookies = document.cookie;
      const cookiesObj = cookies
        .split(';')
        .map((ck) => ck.split('='))
        .reduce(
          (accumulator, [key, value]) => ({
            ...accumulator,
            [key.trim()]: decodeURIComponent(value),
          }),
          {},
        );
      const authtoken = cookiesObj.kaigangtoken;

      this.$store.commit('setLoadingStatus', true);
      this.$http
        .put(
          `${process.env.VUE_APP_baseUrl}/auth/userinformation/${this.$route.params.id}`,
          {
            newInfo: vm.newInfo,
            authtoken,
          },
        )
        .then((res) => {
          this.$store.commit('setLoadingStatus', false);
          if (res.data.message === 'success') {
            this.editing = false;
            this.getUserInfo();
            this.$store.dispatch('showalerts', {
              isShow: true,
              type: 'success',
              content: '修改成功',
            });
          } else {
            this.$store.dispatch('showalerts', {
              isShow: true,
              type: 'danger',
              content: '更新失敗',
            });
          }
        });
    },
    // 取得該頁用戶
    getUserInfo() {
      this.$store.dispatch('getUserInfo', this.$route.params.id);
    },
    checkClient() {
      const vm = this;
      const cookies = document.cookie;
      const cookiesObj = cookies
        .split(';')
        .map((ck) => ck.split('='))
        .reduce(
          (accumulator, [key, value]) => ({
            ...accumulator,
            [key.trim()]: decodeURIComponent(value),
          }),
          {},
        );
      if (cookiesObj.kaigangtoken) {
        const tokeobj = jwtDecode(cookiesObj.kaigangtoken);

        if (tokeobj.user_id === vm.$route.params.id) {
          vm.editRole = true;
        } else {
          vm.editRole = false;
        }
      } else {
        vm.editRole = false;
      }
    },
    uploadImg(event) {
      const vm = this;

      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('image', file);

      this.$store.commit('setLoadingStatus', true);

      vm.$http
        .post(
          `${process.env.VUE_APP_baseUrl}/auth/uploadavator`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then((res) => {
          this.$store.commit('setLoadingStatus', false);
          if (res.data.message === 'uploadsuccess') {
            this.$store.dispatch('showalerts', {
              isShow: true,
              type: 'success',
              content: '圖片上傳成功',
            });
            vm.newInfo.avator = `data:image/png;base64,${res.data.encode}`;
          }
        });
    },
  },
};
</script>
