import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Lyrics = (props) => (
  <div className="lyrics mono">
    {props.data.text.split(/\n/).join('***')}
  </div>
);

Lyrics.propTypes = {
  data: PropTypes.shape({
    text: PropTypes.string,
  }).isRequired
};

export default Lyrics;
