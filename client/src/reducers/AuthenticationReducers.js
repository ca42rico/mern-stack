import { LOGIN, LOGOUT, SIGNIN } from "../actions/AuthenticationActions";

const initialState = { user: null };

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        user: action.user,
      };

    case SIGNIN:
      return {
        user: action.user,
      };

    case LOGOUT:
      return {
        user: null,
      };

    default:
      return state;
  }
};

export default UserReducer;
