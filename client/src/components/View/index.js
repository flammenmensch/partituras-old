import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const View = (props) => (
  <div className={`view ${props.modifiers.map((c) => 'view--'.concat(c))}`}>
    {(props.title || props.subtitle) && <div className="view__header">
      {props.title && <h1 className="view__title single-line">{props.title}</h1>}
      {props.subtitle && <h2 className="view__subtitle single-line">{props.subtitle}</h2>}
    </div>}
    <div className="view__body">
      {props.children}
    </div>
  </div>
);

View.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
  modifiers: PropTypes.arrayOf(PropTypes.string)
};

View.defaultProps = {
  modifiers: [],
};

export default View;
