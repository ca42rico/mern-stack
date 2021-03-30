import React from "react";
import PropTypes from "prop-types";

import PostListItem from "./PostListItem";

function PostList(props) {
  return (
    <div className="d-flex flex-column w-100 mt-4">
      <h3>Posts</h3>
      <div>
        {props.posts.map((post) => (
          <PostListItem
            post={post}
            key={post.cuid}
            onDelete={() => props.handleDeletePost(post.cuid)}
          />
        ))}
      </div>
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      cuid: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleDeletePost: PropTypes.func.isRequired,
};

export default PostList;
