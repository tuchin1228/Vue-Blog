<template>
  <div
    class="alerts"
    :class="{
      show: Alert.isShow,
      success: Alert.type === 'success',
      danger: Alert.type === 'danger'
    }"
  >
    {{ Alert.content }}
  </div>
</template>

<script>
export default {
  computed: {
    Alert() {
      return this.$store.state.Alert;
    },
  },
};
</script>

<style scoped lang="scss">
.alerts {
  z-index: 1100;
  position: fixed;
  bottom: 6%;
  right: -5%;
  padding: 5px 15px;
  border-radius: 5px;
  color: white;
  transition: 0.3s;
  transform: scale(0);
  letter-spacing: 1.5px;
  font-size: 1.1em;
}

.show {
  right: 5%;
  transform: scale(1) !important;
}

.success {
  background: #61b861;
  box-shadow: 3px 3px 3px #c0dcb9;
}

.danger {
  background: #ff7e7e;
  box-shadow: 3px 3px 3px #d6bcbc;
}
</style>
