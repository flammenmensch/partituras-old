import React from 'react';
import T from 'prop-types';
import PartituraCard from '../PartituraCard';

import './styles.css';

const createListItems = (factoryFn) => (items) =>
  items.map((item, index) => <li className="partitura-list__item" key={index}>{factoryFn(item)}</li>);

const PartituraList = (props) => [
  props.header ? <h3 key="header" className="partitura-list-header">{props.header}</h3> : null,
  <ul key="list" className="partitura-list">
    {createListItems(props.componentFactory(props))(props.items)}
  </ul>
];

PartituraList.propTypes = {
  header: T.string,
  items: T.array,
  componentFactory: T.func
};

PartituraList.defaultProps = {
  items: [],
  componentFactory: (props) => (item) => <PartituraCard key={item._id} {...item} />
};

export default PartituraList;
