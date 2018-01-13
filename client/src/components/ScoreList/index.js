import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const ScoreList = (props) => (
  <ol className="score-list">
    {props.data.pages.map((item, index) => <li className="score-list__item" key={index}><img className="score-sheet" title={`Page ${index + 1}`} alt={`Page ${index + 1}`} src={item} /></li>)}
  </ol>
);

ScoreList.propTypes = {
  data: PropTypes.shape({
    pages: PropTypes.array,
    pageCount: PropTypes.number
  }).isRequired
};

export default ScoreList;
