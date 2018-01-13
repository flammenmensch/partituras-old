import * as api from '../../services/partiturasApi';

const SET_LOADING = 'app/home/setLoading';
const SET_RANDOM_PARTITURAS = 'app/home/setRandomPartituras';
const GET_RANDOM_PARTITURAS = 'app/home/getRandomPartituras';

const initialState = {
  items: [],
  loading: false
};

export const getRandomPartituras = () => ({
  type: GET_RANDOM_PARTITURAS
});

export const loadRandomPartiturasEpic = (action$) =>
  action$.ofType(GET_RANDOM_PARTITURAS)
    .switchMap(() =>
      api.getRandomPartituras()
    )
    .map((results) => ({
      type: SET_RANDOM_PARTITURAS,
      payload: results.data
    }))
    .startWith({
      type: SET_LOADING,
      payload: false
    });

export default (state=initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SET_RANDOM_PARTITURAS:
      return {
        ...state,
        loading: false,
        items: action.payload
      };
    default:
      return state;
  }
};
