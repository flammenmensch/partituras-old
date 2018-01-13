import React from 'react';
import View from '../../components/View';
import SearchBar from '../../components/SearchBar/index';
import PartituraLink from '../../components/PartituraLink';
import PartituraList from '../../components/PartituraList';

export default (props) => (
  <View title="Search partituras">
    <SearchBar query={props.query} onSubmit={props.onSearch} />
    {props.items.length > 0 &&
      <PartituraList
        header="Search results"
        items={props.items}
        componentFactory={
          (ownerProps) => (item) => (
            <PartituraLink key={item.id} {...item} />
          )
        }
      />
    }
    {props.items.length === 0 && <p className="mono">Nothing was found</p>}
  </View>
);
