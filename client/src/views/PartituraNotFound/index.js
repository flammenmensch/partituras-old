import React from 'react';
import {Link} from 'react-router-dom';
import View from '../../components/View';

export default (props) => (
  <View title="Not found :(">
    <Link to="/">Return back</Link>
  </View>
);
