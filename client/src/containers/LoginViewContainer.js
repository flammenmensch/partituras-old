import {compose, pure} from 'recompose';
import LoginView from '../views/Login';

const enhance = compose(
  pure
);

export default enhance(LoginView);
