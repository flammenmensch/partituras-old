import {branch, renderComponent} from 'recompose';
import Loader from '../components/Loader';

export default branch(
  (props) => props.loading,
  renderComponent(Loader)
);
