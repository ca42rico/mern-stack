import callApi from "../util/apiCaller";

export const LOGIN = "LOGIN";
export const SIGNIN = "SIGNIN";
export const LOGOUT = "LOGOUT";

export function login(user) {
  return {
    type: LOGIN,
    user,
  };
}

export function loginRequest(user, callback) {
  return (dispatch) => {
    callApi("/users/login", "post", {
      user: {
        username: user.username,
        password: user.password,
      },
    }).then((res, err) => {
      if (res && res.token && res.username) {
        dispatch(login(res));
        localStorage.setItem("username", res.username);
        localStorage.setItem("token", res.token);
        callback();
      }
    });
  };
}

export function signin(user) {
  return {
    type: SIGNIN,
    user,
  };
}

export function signinRequest(user, callback) {
  return (dispatch) => {
    callApi("/users/signin", "post", {
      user: {
        username: user.username,
        password: user.password,
      },
    }).then((res, err) => {
      if (res && res.token && res.username) {
        dispatch(signin(res));
        callback();
      }
    });
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function logoutRequest() {
  return (dispatch) => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    dispatch(logout());
  };
}

export const getUser = (state) => state.user;
