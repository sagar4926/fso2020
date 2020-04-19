const KEY = "blog_logged_in_user";

const storeUser = (user) => {
  window.localStorage.setItem(KEY, JSON.stringify(user));
};

const getUser = () => {
  const user = window.localStorage.getItem(KEY)
  return user ? JSON.parse(user) : undefined;
};

const removeUser = () => {
  window.localStorage.removeItem(KEY);
};

export default { storeUser, getUser, removeUser };
