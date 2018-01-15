import {connect} from 'react-redux';
import {compose, pure, lifecycle} from 'recompose';

import {getRandomPartituras} from '../modules/home';

import withLoading from '../enhancers/withLoading';
import withError from '../enhancers/withError';

import HomeView from '../views/Home';

const mapStateToProps = (state) => state.home;

const enhance = compose(
  pure,
  connect(mapStateToProps),
  lifecycle({
    componentDidMount() {
      this.props.dispatch(getRandomPartituras());
    }
  }),
  withLoading,
  withError
);

export default enhance(HomeView);
