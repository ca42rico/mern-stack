import React from "react";
import { Button, TextField } from "@material-ui/core";

import Logo from "../../logo.svg";

const LoginComponent = ({
  setUsername,
  setPassword,
  disableSubmit,
  submit,
  goToSignInPage,
}) => {
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
          onChange={setUsername}
          placeholder="Insert a username"
        />
        <TextField
          className="text-field"
          variant="filled"
          label="Password"
          name="password"
          onChange={setPassword}
          type="password"
          placeholder="Insert a password"
        />
        <Button
          className="mt-4"
          variant="contained"
          color="primary"
          disabled={disableSubmit}
          onClick={submit}
        >
          Login
        </Button>
        <Button className="mt-4" variant="contained" onClick={goToSignInPage}>
          Not already a member?
        </Button>
      </div>
    </div>
  );
};

export default LoginComponent;
