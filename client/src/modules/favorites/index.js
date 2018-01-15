const ADD_TO_FAVORITES = 'app/favorites/add';
const REMOVE_FROM_FAVORITES = 'app/favorites/remove';

const initialState = {
  favorites: []
};

export const addToFavorites = (item) => ({
  type: ADD_TO_FAVORITES,
  payload: item
});

export const removeFromFavorites = (item) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: item
});

export default (state=initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [ ...state.favorites, action.payload ]
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter((item) => item._id !== action.payload._id)
      };
    default:
      return state;
  }
};
