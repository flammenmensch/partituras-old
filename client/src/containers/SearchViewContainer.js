import {Observable} from 'rxjs';
import {compose, pure, withHandlers} from 'recompose';

import {mapPropsStream} from '../enhancers/fromStream';
import withLoading from '../enhancers/withLoading';
import withError from '../enhancers/withError';

import {searchPartituras} from '../services/partiturasApi';
import {parseQueryString} from '../utils/url-utils';

import Search from '../views/Search';

const getProp = (source, key) => source[key];

const stream$ = (props$) =>
  props$
    .switchMap((props) => {
      if (props.location.search === '') {
        return Observable.of({
          query: '',
          items: []
        });
      }
      const query = decodeURIComponent(getProp(parseQueryString(props.location.search), 'query'));
      return searchPartituras(query)
        .map((results) => ({
          query,
          items: results.data
        }));
    })
    .startWith({ loading: true })
    .catch((err) => Observable.of({ error: err }));

const enhance = compose(
  pure,
  mapPropsStream(stream$),
  withLoading,
  withError,
  withHandlers({
    onSearch: (ownerProps) => (event) => {
      console.log('Search', event);
    }
  }),
);

export default enhance(Search);
