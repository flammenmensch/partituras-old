import React from 'react';
import SearchBar from '../../components/SearchBar';
import PartituraList from '../../components/PartituraList';
import PartituraLink from '../../components/PartituraLink';
import Hero from '../../components/Hero';
import View from '../../components/View';

export default (props) => (
  <View title="Favorites" subtitle={`Total ${props.favorites.length} partituras`}>
    <PartituraList
      items={props.favorites}
      componentFactory={
        (ownerProps) => (item) => (
          <PartituraLink key={item.id} {...item} />
        )
      }
    />
  </View>
);
