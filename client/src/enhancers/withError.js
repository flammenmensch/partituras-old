import React from 'react';
import {branch, renderComponent} from 'recompose';

const ErrorComponent = ({error}) =>
  <div>{error.message}</div>

export default branch(
  (props) => props.error,
  renderComponent(ErrorComponent)
);
