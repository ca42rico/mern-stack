import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { logoutRequest } from "../../Authentication/AuthenticationActions";
import "./Navbar.css";
import config from "../../config";

function Navbar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [page, setPage] = useState("");

  const authentication = useSelector((state) => state.authentication);
  const user = authentication ? authentication.user : null;

  const handleLogout = async () => {
    dispatch(logoutRequest());
    history.go(0);
  };

  const goToPage = (pathname) => () => {
    if (pathname !== window.location.pathname) {
      setPage(pathname);
      history.push(pathname);
    }
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6">
          <Link className="text-white" onClick={goToPage(config.HOME_PAGE)}>
            Home
          </Link>
        </Typography>
        {history.location.pathname !== config.LOGIN_PAGE &&
        history.location.pathname !== config.SIGNIN_PAGE ? (
          !user ? (
            <Typography variant="h6">
              <Link
                className="text-white"
                onClick={goToPage(config.LOGIN_PAGE)}
              >
                Login
              </Link>
            </Typography>
          ) : (
            <Typography variant="h6">
              <Link className="text-white" onClick={handleLogout}>
                Logout
              </Link>
            </Typography>
          )
        ) : null}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
