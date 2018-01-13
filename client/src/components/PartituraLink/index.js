import React from 'react';
import {Link} from 'react-router-dom';
import PartituraCard from '../PartituraCard';

export default (props) => (
  <Link to={`/partitura/${props._id}`}>
    <PartituraCard {...props} />
  </Link>
);
