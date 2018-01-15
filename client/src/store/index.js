import throttle from 'lodash/throttle';
import {applyMiddleware, createStore} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import rootReducer, {rootEpic} from '../modules';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('partituras.state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({
      favorites: state.favorites
    });
    localStorage.setItem('partituras.state', serializedState);
  } catch (err) {}
};

const store = createStore(
  rootReducer,
  loadState(),
  applyMiddleware(createEpicMiddleware(rootEpic))
);

store.subscribe(throttle(() => saveState(store.getState()), 1000));

export default store;
