const ADD_TO_FAVORITES = 'app/favorites/add';
const REMOVE_FROM_FAVORITES = 'app/favorites/remove';

const initialState = {
  favorites: []
};

export const addToFavorites = (id) => ({
  type: ADD_TO_FAVORITES,
  payload: id
});

export const removeFromFavorites = (id) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: id
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
        favorites: state.favorites.filter((id) => id !== action.payload)
      };
    default:
      return state;
  }
};
