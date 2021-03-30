import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import PostList from "../../components/PostList";
import PostCreateWidget from "../../components/PostCreateWidget";
import {
  addPostRequest,
  deletePostRequest,
  fetchPosts,
} from "../../../actions/PostActions";
import Logo from "../../../logo.svg";
import "./PostListPage.css";

const PostListPage = ({ showAddPost }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.data);
  const user = useSelector((state) => state.authentication.user);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const handleDeletePost = (post) => {
    if (confirm("Do you want to delete this post")) {
      dispatch(deletePostRequest(post, user));
    }
  };

  const handleAddPost = (post, callback) => {
    dispatch(addPostRequest(post, (err) => callback(err)));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex align-items-center">
          <img className="mx-3 logo" src={Logo} alt="Logo" />
          <h1 className="mt-4">Alaya Blog</h1>
        </div>
      </div>
      <hr />
      <div className={`main ${user ? "" : "single"}`}>
        {user && (
          <div className="col-12">
            <PostCreateWidget
              addPost={handleAddPost}
              showAddPost={showAddPost}
            />
          </div>
        )}
        <div className="col-12">
          <PostList handleDeletePost={handleDeletePost} posts={posts} />
        </div>
      </div>
    </div>
  );
};

PostListPage.propTypes = {
  showAddPost: PropTypes.bool.isRequired,
};

export default PostListPage;
