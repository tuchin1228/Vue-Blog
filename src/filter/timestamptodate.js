import Vue from 'vue';

Vue.filter('timestamptodate', (time) => {
  const date = new Date(time * 1000);

  return `${date.getMonth() + 1}/${date.getDate()}`;
});
