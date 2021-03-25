import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, TextField } from "@material-ui/core";
// Import Components
// Import Actions

import Logo from "../../logo.svg";
import callApi from "../../util/apiCaller";
import { useHistory } from "react-router-dom";
import { loginRequest } from "../AuthenticationActions";
import "./AuthenticationPage.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const goToHomepage = () => history.push("/");
  const goToSignInPage = () => history.push("/signin");

  const handleLogin = () => {
    dispatch(loginRequest({ username, password }, goToHomepage));
  };

  return (
    <div className="container authentication">
      <div className="row">
        <div className="col-12 d-flex align-items-center">
          <img
            className="mx-3"
            src={Logo}
            alt="Logo"
            style={{ height: "72px" }}
          />
          <h1 className="mt-4">Alaya Blog</h1>
        </div>
      </div>
      <hr />
      <div
        className={`d-flex flex-column mx-auto my-4 w-100 authentication-form`}
      >
        <div className="row" style={{ padding: "15px 0" }}>
          <div className="col-12">
            <h3 className="mt-4">Login</h3>
          </div>
        </div>
        <TextField
          className="text-field"
          variant="filled"
          label="Username"
          name="username"
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Insert a username"
        />
        <TextField
          className="text-field"
          variant="filled"
          label="Password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          placeholder="Insert a password"
        />
        <Button
          className="mt-4"
          variant="contained"
          color="primary"
          disabled={!username || !password}
          onClick={() => handleLogin(username, password)}
        >
          Login
        </Button>
        <Button
          className="mt-4"
          variant="contained"
          onClick={goToSignInPage}
        >
          Not already a member?
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
