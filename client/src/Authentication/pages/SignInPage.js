import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";
import { signinRequest } from "../../actions/AuthenticationActions";
import config from "../../config";
import SignInComponent from "../components/SignInComponent";
import "./AuthenticationPage.css";

const SignInPage = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeat_password, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [sending, setSending] = useState(false);

  const history = useHistory();
  const goToHomepage = () => history.push(config.HOME_PAGE);

  const handleSignIn = () => {
    if (
      username &&
      username.length >= 3 &&
      password &&
      password.length >= 6 &&
      repeat_password &&
      password === repeat_password
    ) {
      setErrors("");
      setSending(true);
      dispatch(
        signinRequest({ username, password }, (err) => {
          if (err) {
            setSending(false);
            setErrors(err);
          } else goToHomepage();
        })
      );
    } else {
      if (username && username.length < 3) {
        setErrors("Username too short");
      } else if (password && password.length < 6) {
        setErrors("Password too short");
      } else if (password !== repeat_password) {
        setErrors("Repeat password not matching");
      } else {
        setErrors("Errors");
      }
    }
  };

  return (
    <SignInComponent
      setUsername={(event) => setUsername(event.target.value)}
      setPassword={(event) => setPassword(event.target.value)}
      setRepeatPassword={(event) => setRepeatPassword(event.target.value)}
      disableSubmit={!username || !password || !repeat_password || sending}
      submit={() => handleSignIn(username, password)}
      errors={errors}
    />
  );
};

export default SignInPage;
