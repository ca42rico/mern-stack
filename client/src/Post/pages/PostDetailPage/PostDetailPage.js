import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchPost } from "../../../actions/PostActions";
import "./PostDetailPage.css";

export function PostDetailPage() {
  const { cuid } = useParams();
  const post = useSelector((state) =>
    state.posts.data.find((currentPost) => currentPost.cuid === cuid)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!post) dispatch(fetchPost(cuid));
  }, []);

  return post ? (
    <div className="container post-detail-page">
      <div className="row">
        <div className="col-12 main">
          <label className="name">
            {new Date(post.dateAdded).toLocaleDateString()}, by {post.name}
          </label>
          <h1>{post.title}</h1>
          {post.image && <img src={post.image} width="450" height="400" />}
          <p className="content">{post.content}</p>
        </div>
      </div>
    </div>
  ) : (
    <h3 style={{ padding: "15px" }}>Loading...</h3>
  );
}
export default PostDetailPage;
