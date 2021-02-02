import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    boardlist: {},
    ArticleList: [],
    Userinfo: {},
    ArticleContent: {},
    AuthorInfo: {},
    isLoading: false,
    Alert: {
      isShow: false,
      type: '',
      content: '',
    },
  },
  mutations: {
    SET_BOARDLIST(state, boardlist) {
      state.boardlist = boardlist;
    },
    SET_ARTICLELIST_BY_BOARD(state, articlelistBoard) {
      state.ArticleList = articlelistBoard;
    },
    SET_ARTICLELIST_BY_USER(state, articlelistUser) {
      state.ArticleList = articlelistUser;
    },
    SET_USER_INFO(state, userinfo) {
      state.Userinfo = userinfo;
    },
    SET_ARTICLE_CONTENT(state, articlecontent) {
      state.ArticleContent = articlecontent;
    },
    SET_AUTHOR_INFO(state, authorinfo) {
      state.AuthorInfo = authorinfo;
    },

    setLoadingStatus(state, payload) {
      state.isLoading = payload;
    },
    setAlert(state, payload) {
      state.Alert = payload;
    },
  },
  actions: {
    showalerts({ commit }, payload) {
      commit('setAlert', payload);
      setTimeout(() => {
        commit('setAlert', { isShow: false });
      }, 3000);
    },
    getBoardList({ commit }) {
      axios.get(`${process.env.VUE_APP_baseUrl}/boardlist`).then((res) => {
        commit('SET_BOARDLIST', res.data.data);
      });
    },
    getArticleListByBoard({ commit }, { kind, keyword, page }) {
      commit('setLoadingStatus', true);
      axios.get(`${process.env.VUE_APP_baseUrl}/articlelist/${kind}/${keyword}/${page}`).then((res) => {
        commit('SET_ARTICLELIST_BY_BOARD', res.data);
        commit('setLoadingStatus', false);
      });
    },
    getArticleListByUser({ commit }, { kind, keyword }) {
      commit('setLoadingStatus', true);
      axios.get(`${process.env.VUE_APP_baseUrl}/articlelist/${kind}/${keyword}`).then((res) => {
        commit('SET_ARTICLELIST_BY_USER', res.data);

        commit('setLoadingStatus', false);
      });
    },
    getUserInfo({ commit }, userID) {
      commit('setLoadingStatus', true);
      axios.get(`${process.env.VUE_APP_baseUrl}/auth/userinformation/${userID}`).then((res) => {
        commit('setLoadingStatus', false);
        commit('SET_USER_INFO', res.data.data);
      });
    },
    async getArticleContent({ commit }, time) {
      commit('setLoadingStatus', true);
      const articlecontent = await axios.get(
        `${process.env.VUE_APP_baseUrl}/articlecontent/${time}`,
      );
      const authorinfo = await axios.get(
        `${process.env.VUE_APP_baseUrl}/auth/authorinfo/${articlecontent.data.data.authorID}`,
      );

      commit('SET_ARTICLE_CONTENT', articlecontent.data);
      commit('SET_AUTHOR_INFO', authorinfo.data);

      commit('setLoadingStatus', false);
    },

  },
  modules: {},
  getters: {
    Userinfo: (state) => state.Userinfo,
    boardlist: (state) => state.boardlist,
    ArticleContent: (state) => state.ArticleContent,
    AuthorInfo: (state) => state.AuthorInfo,
    ArticleList: (state) => state.AuthorInfo,
    isLoading: (state) => state.isLoading,
  },
});
