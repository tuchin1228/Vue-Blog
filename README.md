# Vue-Blog 部落格

### Demo

https://tuchin1228.github.io/Vue-Blog/#/chat

> 因後端伺服器上傳空間為免費 Heroku 空間，故載入速度較慢。

### 網站介紹

> Front-End

- 前台
  - 帳號申請.登入
  - 會員資料修改瀏覽.最近 Po 文瀏覽
  - 文章標題搜尋
  - 回應者個人資料瀏覽
  - Po 文.編輯.刪除(需驗證會員.作者身分)
  - 回應內容(需驗證會員身分)
    <br/>
- 後台(需驗證管理員身分)
  - 新增看板
  - 文章過濾.刪除文章(不限作者)
    <br/>

> Back-End

- Node.js (Express 建立 API 路徑)
- MongoDB (串接 Atlas 雲端資料庫)

### 使用套件

- ckeditor(文章編輯器)
- jwt-decode.vue-cookie(解讀 jwt.操作 cookies)
- vee-validate (驗證)

