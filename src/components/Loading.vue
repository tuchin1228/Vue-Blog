<template>
  <div class="LoadingBg">
    <img src="@/assets/img/loading.gif" alt="Loading" />
  </div>
</template>

<style scoped lang="scss">
.LoadingBg {
  z-index: 1010;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.808);

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
