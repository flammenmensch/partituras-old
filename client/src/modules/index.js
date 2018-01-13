import {combineReducers} from 'redux';
import {combineEpics} from 'redux-observable';
import home, {loadRandomPartiturasEpic} from './home';
import favorites from './favorites';

export const rootEpic = combineEpics(
  loadRandomPartiturasEpic
);

export default combineReducers({
  home,
  favorites
});
