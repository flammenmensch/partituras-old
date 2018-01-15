import {Observable} from 'rxjs';
import * as api from '../../services/partiturasApi';

const SET_LOADING = 'app/home/setLoading';
const SET_ERROR = 'app/home/setError';
const SET_RANDOM_PARTITURAS = 'app/home/setRandomPartituras';
const GET_RANDOM_PARTITURAS = 'app/home/getRandomPartituras';

const initialState = {
  items: null,
  loading: false,
  error: null,
};

export const getRandomPartituras = () => ({
  type: GET_RANDOM_PARTITURAS
});

export const loadRandomPartiturasEpic = (action$, store) =>
  action$.ofType(GET_RANDOM_PARTITURAS)
    .switchMap(() => {
      if (store.getState().home.items) {
        return Observable.of(store.getState().home.items);
      }
      return api.getRandomPartituras(5).map((results) => results.data)
    })
    .map((results) => ({
      type: SET_RANDOM_PARTITURAS,
      payload: results
    }))
    .catch((err) => Observable.of({ type: SET_ERROR, payload: err }))
    .startWith({
      type: SET_LOADING,
      payload: true
    });

export default (state=initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: null
      };
    case SET_RANDOM_PARTITURAS:
      return {
        ...state,
        error: null,
        loading: false,
        items: action.payload
      };
    default:
      return state;
  }
};
