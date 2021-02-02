<template>
  <div class="manage_article">
    <div class="filterbar">
      <select name="" id="" v-model="filterBoardname">
        <option value="" disabled>選擇看板</option>
        <option :value="item.boardname" v-for="item in boardlist" :key="item._id">{{
          item.chinese
        }}</option>
      </select>
      <input type="text" placeholder="作者搜尋" v-model="filterUsername" />
      <input type="date" name="" id="" v-model="filterDate" />
    </div>

    <table>
      <tr>
        <th width="10%">日期</th>
        <th width="10%">作者</th>
        <th width="10%">看板</th>
        <th>標題</th>
        <th width="20%">指令</th>
      </tr>
      <tr v-for="item in articlelist_filter" :key="item.time">
        <td class="text-center">{{ item.time | timestamptodate }}</td>
        <td class="text-center">{{ item.author }}</td>
        <td class="text-center">{{ item.chineseboard }}</td>
        <td>{{ item.title }}</td>
        <td>
          <div class="manage_btn">
            <v-btn depressed color="success" :to="{ path: `/${item.boardname}/${item.time}` }"
              >查看</v-btn
            >
            <v-btn depressed color="error" @click="deleteModel(item.boardname, item.time)"
              >刪除</v-btn
            >
          </div>
        </td>
      </tr>
    </table>

    <v-dialog v-model="deletedialog" max-width="290">
      <v-card>
        <v-card-title class="headline red accent-2 white--text font-weight-black">
          刪除文章
        </v-card-title>

        <v-card-text class="text-center py-4 text-h6 font-weight-black">
          確認刪除此文?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn class="red--text text--accent-2" text @click="deleteArticle">
            確認
          </v-btn>

          <v-btn class="grey--text " text @click="deletedialog = false">
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['UserId'],
  data() {
    return {
      filterBoardname: '',
      filterUsername: '',
      filterDate: '',
      articlelist: [],
      deletedialog: false,
      deleteinfo: {
        boardname: '',
        time: '',
      },
    };
  },
  watch: {
    filterBoardname() {
      this.getArticle();
    },
  },
  computed: {
    articlelist_filter() {
      const vm = this;
      return this.articlelist
        .filter((item) => {
          const fulldate = new Date(item.time * 1000);
          const year = fulldate.getFullYear();
          const month = (fulldate.getMonth() + 1 < 10 ? '0' : '') + (fulldate.getMonth() + 1);
          const date = fulldate.getDate();
          const checkdate = `${year}-${month}-${date}`;
          if (checkdate === vm.filterDate) {
            return item;
          }
          if (vm.filterDate.length === 0) {
            return vm.articlelist;
          }
          return 0;
        })
        .filter((item) => {
          if (item.author.indexOf(vm.filterUsername.toLowerCase()) !== -1) {
            return item;
          }
          return 0;
        });
    },
    boardlist() {
      return this.$store.getters.boardlist;
    },
  },
  created() {
    this.$store.dispatch('getBoardList');
  },
  methods: {
    deleteModel(boardname, time) {
      if (!this.UserId || this.UserId.role !== 'admin') {
        this.$store.dispatch('showalerts', {
          isShow: true,
          type: 'danger',
          content: '權限不足',
        });
      } else {
        this.deletedialog = true;
        this.deleteinfo.boardname = boardname;
        this.deleteinfo.time = time;
      }
    },
    deleteArticle() {
      const vm = this;
      vm.deletedialog = false;

      this.$store.commit('setLoadingStatus', true);
      this.$http
        .delete(
          `${process.env.VUE_APP_baseUrl}/deletearticle/${vm.deleteinfo.boardname}/${vm.deleteinfo.time}`,
        )
        .then((res) => {
          this.$store.commit('setLoadingStatus', false);
          if (res.data.message === 'success') {
            this.getArticle();
          }
        });
    },
    getArticle() {
      const vm = this;
      this.$store.commit('setLoadingStatus', true);
      this.$http
        .get(`${process.env.VUE_APP_baseUrl}/articlelist/boardname/${vm.filterBoardname}`)
        .then((res) => {
          this.$store.commit('setLoadingStatus', false);
          vm.articlelist = res.data.data;
        });
    },
  },
};
</script>

<style></style>
