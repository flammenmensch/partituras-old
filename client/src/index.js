import React from 'react';
import ReactDOM from 'react-dom';
import throttle from 'lodash/throttle';
import {createStore, applyMiddleware} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer, {rootEpic} from './modules';

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
    const serializedState = JSON.stringify(state);
    localStorage.setItem('partituras.state', serializedState);
  } catch (err) {}
};

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

const store = createStore(
  rootReducer,
  loadState(),
  applyMiddleware(createEpicMiddleware(rootEpic))
);

store.subscribe(throttle(() => saveState(store.getState()), 1000));

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);

registerServiceWorker();
