import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import "./App.css";
import PostListPage from "./Post/pages/PostListPage/PostListPage";
import PostDetailPage from "./Post/pages/PostDetailPage/PostDetailPage";
import LoginPage from "./Authentication/pages/LoginPage";
import SignInPage from "./Authentication/pages/SignInPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Nav/components/Navbar";
import { login } from "./Authentication/AuthenticationActions";
import config from "./config";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1ecde2",
    },
  },
});

const checkUserInLocaleStorage = (store) => {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  if (username && token) {
    store.dispatch(login({ username, token }));
  }
};

function App({ store }) {
  checkUserInLocaleStorage(store);
  return (
    <ThemeProvider theme={theme}>
      <div className="w-100">
        <Provider store={store}>
          <div className="w-100 pt-5 mt-5">
            <BrowserRouter>
              <Navbar />
              <Switch>
                <Route path={config.HOME_PAGE} exact component={PostListPage} />
                <Route
                  path="/posts/:cuid/:slug"
                  exact
                  component={PostDetailPage}
                />
                <Route path={config.LOGIN_PAGE} exact component={LoginPage} />
                <Route path={config.SIGNIN_PAGE} exact component={SignInPage} />
              </Switch>
            </BrowserRouter>
          </div>
        </Provider>
      </div>
    </ThemeProvider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;

/*
TODO:
* if <in store > bearer authentication && user
	then


*/
