import {Observable} from 'rxjs';
import {Redirect, withRouter} from 'react-router-dom';
import {compose, pure, branch, withProps, withHandlers, renderComponent} from 'recompose';
import {connect} from 'react-redux';

import {mapPropsStream} from '../enhancers/fromStream';
import withLoading from '../enhancers/withLoading';
import withError from '../enhancers/withError';

import {getPartituraById} from '../services/partiturasApi';

import PartituraDetails from '../views/PartituraDetails';
import PartituraNotFound from '../views/PartituraNotFound';
import {addToFavorites, removeFromFavorites} from "../modules/favorites";

const enhanceRedirect = withProps((ownerProps) => ({
  to: `/partitura/${ownerProps.match.params.id}/scores`
}));

const createMenuActions = (item) => {
  const actions = [];
  if (item.scores) {
    actions.push({ label: 'Scores', data: 'scores' });
  }
  if (item.lyrics) {
    actions.push({ label: 'Lyrics', data: 'lyrics' });
  }
  return actions;
};

const stream$ = (props$) =>
  props$
    .switchMap((props) =>
      getPartituraById(props.match.params.id)
        .map((results) => ({ item: results.data, ...props }))
    )
    .startWith({ loading: true })
    .catch((error) => Observable.of({ error }));

const redirectToScores = branch(
  (props) => (props.match.params.section === undefined),
  renderComponent(enhanceRedirect(Redirect))
);

const redirectToNotFound = branch(
  (props) => !props.item,
  renderComponent(PartituraNotFound)
);

const mapStateToProps = (state) => state.favorites;

const enhance = compose(
  pure,
  connect(mapStateToProps),
  mapPropsStream(stream$),
  withLoading,
  withError,
  redirectToNotFound,
  redirectToScores,
  withRouter,
  withProps((ownerProps) => {
    const actions = createMenuActions(ownerProps.item);
    const selectedAction = actions.find(
      (action) =>
        action.data === ownerProps.match.params.section
    );
    return {
      actions,
      selectedAction,
      isFavorite: ownerProps.favorites.indexOf(ownerProps.item._id) > -1,
    };
  }),
  withHandlers({
    onGoToSource: (ownerProps) => () => {

    },
    onToggleFavorite: (ownerProps) => (value) => {
      const action = value ?
        removeFromFavorites(ownerProps.item._id)
        :
        addToFavorites(ownerProps.item._id);
      ownerProps.dispatch(action);
    },
    onAction: (ownerProps) => (action) => {
      ownerProps.history.push(`/partitura/${ownerProps.item._id}/${action}`);
    }
  })
);

export default enhance(PartituraDetails);
