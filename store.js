import { createStore } from 'redux';

// Define a action type
const SET_CURRENT_USER = 'SET_CURRENT_USER';

// Define a action creator
export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user
});

// Define o estado inicial
const initialState = {
  currentUser: null
};

// Define o reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
};

// Crie o store
const store = createStore(reducer);

export default store;
