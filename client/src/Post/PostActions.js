import callApi from "../util/apiCaller";

export const ADD_POST = "ADD_POST";
export const ADD_POSTS = "ADD_POSTS";
export const DELETE_POST = "DELETE_POST";

export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function addPostRequest(post) {
  return async (dispatch, getState) => {
    const token = getState().authentication.user
      ? getState().authentication.user.token
      : null;

    const data = new FormData();
    data.append("name", post.name);
    data.append("title", post.title);
    data.append("content", post.content);
    data.append("image", post.image);

    const result = await callApi("posts", "post", data, token, true);
    if (result && result.post) dispatch(addPost(result.post));
    return result;
  };
}

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts,
  };
}

export function fetchPosts() {
  return async (dispatch, getState) => {
    const token = getState().authentication.user
      ? getState().authentication.user.token
      : null;

    const result = await callApi("posts", "get", null, token);
    if (result && result.posts) dispatch(addPosts(result.posts));
    return result;
  };
}

export function fetchPost(cuid) {
  return async (dispatch, getState) => {
    const token = getState().authentication.user
      ? getState().authentication.user.token
      : null;

    const result = await callApi(`posts/${cuid}`, "get", null, token);
    if (result && result.post) dispatch(addPost(result.post));
    return result;
  };
}

export function deletePost(cuid) {
  return {
    type: DELETE_POST,
    cuid,
  };
}

export function deletePostRequest(cuid) {
  return (dispatch, getState) => {
    const token = getState().authentication.user
      ? getState().authentication.user.token
      : null;
    return callApi(`posts/${cuid}`, "delete", {}, token).then(() =>
      dispatch(deletePost(cuid))
    );
  };
}
