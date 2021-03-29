import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPost } from "../../PostActions";
import { useParams } from "react-router-dom";
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
          <h1>{post.title}</h1>
          <p className="name">By {post.name}</p>
          {post.image && <img src={post.image} width="450" height="400" />}
          <p className="content">{post.content}</p>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
export default PostDetailPage;
