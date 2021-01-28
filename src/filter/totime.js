export default function (time) {
  const date = new Date(time * 1000);
  return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`;
}
