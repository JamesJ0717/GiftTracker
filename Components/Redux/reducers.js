const LOGGED_IN = "LOGGED_IN";

const initialState = {
  loggedIn: false
};

function applyLogIn(state) {
  return {
    ...state,
    loggedIn: true
  };
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN:
      return applyLogIn(state);
    default:
      return state;
  }
}

function logIn() {
  return {
    type: LOGGED_IN
  };
}

export { reducer, logIn };
