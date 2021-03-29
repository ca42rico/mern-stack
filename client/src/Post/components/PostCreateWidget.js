import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import Dropzone from "react-dropzone";
/*
import { Icon } from "@material-ui/core";
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">
          Click here or drag and drop to upload image
        </p>
*/ const useStyles = makeStyles(
  (theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
);

const PostCreateWidget = ({ addPost }) => {
  const [state, setState] = useState({ name: "", title: "", content: "" });
  const classes = useStyles();
  const user = useSelector((state) => state.authentication.user);

  useEffect(() => {
    if (user) setState({ name: user.username });
  }, [user]);

  const submit = () => {
    if (state.name && state.title && state.content) {
      addPost(state);
    }
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

  return (
    <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
      <h3>Create new post</h3>
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
        onChange={handleChange}
      />
      <TextField
        variant="filled"
        multiline
        rows="4"
        label="Post content"
        name="content"
        onChange={handleChange}
      />
      <div>
        <p>Post Image (Optional)</p>
        <input type="file" onChange={fileChangeHandler} />
      </div>
      <Button
        className="mt-4"
        variant="contained"
        color="primary"
        onClick={() => submit()}
        disabled={!state.name || !state.title || !state.content}
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
