import {compose, pure} from 'recompose';
import {connect} from 'react-redux';
import Favorites from '../views/Favorites';
import {getFavorites} from '../modules/favorites';

const mapStateToProps = (state) => state.favorites;

const enhance = compose(
  pure,
  connect(mapStateToProps)
);

export default enhance(Favorites);
