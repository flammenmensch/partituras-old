import React from 'react';
import T from 'prop-types';
import './styles.css';

const IconButton = (props) => (
  <button
    title={props.title}
    type="button"
    onClick={props.onClick}
    className={`icon-button icon-button--${props.icon}`}
  />
);

IconButton.propTypes = {
  title: T.string,
  icon: T.string.isRequired,
  onClick: T.func.isRequired,
};

IconButton.defaultProps = {
  title: ''
};

export default IconButton;
