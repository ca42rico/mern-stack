import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Button, InputLabel, TextField } from "@material-ui/core";
// Import Components
// Import Actions

import Logo from "../../logo.svg";
import { useHistory } from "react-router-dom";
import { signinRequest } from "../AuthenticationActions";
import "./AuthenticationPage.css";

const SignInPage = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeat_password, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState("");

  const history = useHistory();
  const goToHomepage = () => history.push("/");

  const handleSignIn = () => {
    if (
      username &&
      username.length >= 6 &&
      password &&
      password.length >= 6 &&
      repeat_password &&
      repeat_password.length >= 6 &&
      password === repeat_password
    ) {
      setErrors("");
      dispatch(signinRequest({ username, password }, goToHomepage));
    } else {
      setErrors("Errors");
    }
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
            <h3 className="mt-4">Sign In</h3>
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
        <TextField
          className="text-field"
          variant="filled"
          label="Password"
          name="password"
          onChange={(event) => setRepeatPassword(event.target.value)}
          type="password"
          placeholder="Repeat the password"
        />
        <Button
          className="mt-4"
          variant="contained"
          color="primary"
          disabled={!username || !password || !repeat_password}
          onClick={() => handleSignIn(username, password)}
        >
          Sign In
        </Button>
        {errors && (
          <InputLabel error={true} style={{ margin: "20px 0" }}>
            {errors}
          </InputLabel>
        )}
      </div>
    </div>
  );
};

export default SignInPage;
