export default function (username) {
  const newuser = username.split('').slice(0, username.indexOf('@')).join('');
  return newuser;
}
