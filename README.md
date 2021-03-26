# Vue-Blog 部落格
![b1](https://user-images.githubusercontent.com/51053467/106904805-945dc400-6736-11eb-99f1-929dbb462f31.png)
<br/>
### Demo

- SPA版本
  - https://tuchin1228.github.io/Vue-Blog/#/chat
  - > 因後端伺服器上傳空間為免費 Heroku 空間，故載入速度較慢。
- SSR(Nuxt)版本
  - https://nuxt-kaigang-blog.herokuapp.com/chat
  - > 因前後端伺服器上傳空間為免費 Heroku 空間，故載入速度較慢。

### 網站介紹

> Front-End

- 前台
  - 帳號申請.登入
  - 會員資料修改瀏覽.最近 Po 文瀏覽
  - 文章標題搜尋
  - 回應者個人資料瀏覽
  - Po 文.編輯.刪除(需驗證會員.作者身分)
  - 回應內容(需驗證會員身分)
  - 看板列表.文章列表(無限滾動載入)
    <br/>
- 後台(需驗證管理員身分)
  - 新增看板
  - 文章過濾.刪除文章(不限作者)
    <br/>

> Back-End

- Node.js (Express 建立 API 路徑)
- MongoDB (串接 Atlas 雲端資料庫)

### 網站畫面
- 文章內容<br/>
![b2](https://user-images.githubusercontent.com/51053467/106904891-ae97a200-6736-11eb-8480-fefe158c65fe.png)
<br/>

- 回文內容<br/>
![b3](https://user-images.githubusercontent.com/51053467/106905010-ccfd9d80-6736-11eb-916f-fb313f9da2dc.png)
<br/>

- Po文<br/>
![b5](https://user-images.githubusercontent.com/51053467/106905082-e0a90400-6736-11eb-97ac-d5528dbe496e.png)
<br/>

- 選擇看板<br/>
![b8](https://user-images.githubusercontent.com/51053467/106905132-ee5e8980-6736-11eb-8324-d5b30d448aa9.png)
<br/>

- 會員資料<br/>
![b9](https://user-images.githubusercontent.com/51053467/106905180-fb7b7880-6736-11eb-8548-ec002077ef15.png)
<br/>

- 登入/註冊<br/>
![b11](https://user-images.githubusercontent.com/51053467/106905226-07673a80-6737-11eb-972a-042789acca53.png)
<br/>

- 新增看板<br/>
![b6](https://user-images.githubusercontent.com/51053467/106905302-1d74fb00-6737-11eb-90eb-e0437072a19e.png)
<br/>

- 文章管理<br/>
![b7](https://user-images.githubusercontent.com/51053467/106905336-2665cc80-6737-11eb-9f6c-fa9dd5a0d5a3.png)


### 使用技術
  - Vue.js
  - Vue CLI
  - Vuex
  - Vue Router
  - axios 串接RESTful API
  - 使用 SCSS 開發與管理樣式
  - ESLint (airbnb)
  - Vuetify Framework


### 使用套件

- ckeditor(文章編輯器)
- jwt-decode.vue-cookie(解讀 jwt.操作 cookies)
- vee-validate (驗證)

