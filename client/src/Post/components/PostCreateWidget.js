import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const positionSnackbar = {
  vertical: "top",
  horizontal: "right",
};

const PostCreateWidget = ({ addPost }) => {
  const [state, setState] = useState({ name: "", title: "", content: "" });
  const [sending, setSending] = useState(false);
  const classes = useStyles();
  const user = useSelector((state) => state.authentication.user);
  const inputRef = useRef();

  const [showSending, setShowSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (user) setState({ name: user.username });
  }, [user]);

  const submit = () => {
    setShowSending(true);
    setSending(true);
    addPost(state, (err) => {
      setShowSending(false);
      if (err) setShowError(true);
      else {
        setShowSuccess(true);
        resetState();
      }
      setSending(false);
    });
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const fileChangeHandler = (event) => {
    setState({ ...state, image: event.target.files[0] });
  };

  const resetState = () => {
    setState({ ...state, title: "", content: "", image: null });
    if (inputRef && inputRef.current) inputRef.current.value = null;
  };

  const resetImage = () => {
    setState({ ...state, image: null });
    if (inputRef && inputRef.current) inputRef.current.value = null;
  };

  const alertsConfig = [
    {
      message: "Sending post...",
      open: showSending,
      onClose: () => setShowSending(false),
      severity: "info",
    },
    {
      message: "Post created",
      open: showSuccess,
      onClose: () => setShowSuccess(false),
      severity: "success",
    },
    {
      message: "Post not created",
      open: showError,
      onClose: () => setShowError(false),
      severity: "error",
    },
  ];

  const alerts = () =>
    alertsConfig.map((alert, index) => (
      <Snackbar
        anchorOrigin={positionSnackbar}
        open={alert.open}
        autoHideDuration={6000}
        onClose={alert.onClose}
        key={index}
      >
        <Alert onClose={alert.onClose} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    ));

  return (
    <div className={`${classes.root} d-flex flex-column my-4 w-100 mt-4`}>
      {alerts()}

      <h3 style={{ marginTop: 0 }}>Create new post</h3>
      <TextField
        variant="filled"
        label="Author name"
        name="name"
        onChange={handleChange}
        value={state.name}
      />
      <TextField
        variant="filled"
        label="Post title"
        name="title"
        value={state.title}
        onChange={handleChange}
      />
      <TextField
        variant="filled"
        multiline
        rows="4"
        label="Post content"
        name="content"
        value={state.content}
        onChange={handleChange}
      />
      <div>
        <p>Post Image (Optional)</p>
        <input type="file" onChange={fileChangeHandler} ref={inputRef} />
        {state["image"] && <CloseIcon onClick={resetImage} />}
      </div>
      <Button
        className="mt-4"
        variant="contained"
        color="primary"
        onClick={() => submit()}
        disabled={!state.name || !state.title || !state.content || sending}
      >
        Submit
      </Button>
    </div>
  );
};

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default PostCreateWidget;
