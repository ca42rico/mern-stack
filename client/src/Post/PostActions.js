import callApi from "../util/apiCaller";

// Export Constants
export const ADD_POST = "ADD_POST";
export const ADD_POSTS = "ADD_POSTS";
export const DELETE_POST = "DELETE_POST";

// Export Actions
export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function addPostRequest(post) {
  return (dispatch, getState) => {
    const token = getState().authentication.user
      ? getState().authentication.user.token
      : null;
    return callApi(
      "posts",
      "post",
      {
        post: {
          name: post.name,
          title: post.title,
          content: post.content,
        },
      },
      token
    ).then((res) => {
      if (res && res.post) dispatch(addPost(res.post));
    });
  };
}

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts,
  };
}

export function fetchPosts() {
  return (dispatch, getState) => {
    const token = getState().authentication.user
      ? getState().authentication.user.token
      : null;
    return callApi("posts", "get", null, token).then((res) => {
      console.log("res:", res);
      if (res && res.posts) dispatch(addPosts(res.posts));
    });
  };
}

export function fetchPost(cuid) {
  return (dispatch, getState) => {
    console.log("fetch On");
    const token = getState().authentication.user
      ? getState().authentication.user.token
      : null;
    return callApi(`posts/${cuid}`, "get", null, token).then((res) => {
      if (res && res.post) dispatch(addPost(res.post));
    });
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
