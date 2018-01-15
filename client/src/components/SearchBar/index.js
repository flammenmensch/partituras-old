import React from 'react';
import T from 'prop-types';

import './styles.css';

const SearchBar = (props) => (
  <form autoComplete="off" className="search-form" action="/search" onSubmit={props.onSubmit}>
    <input
      className="search-form__input"
      defaultValue={props.query}
      type="search"
      name="query"
      placeholder="Search"
      autoFocus={true}
    />
  </form>
);

SearchBar.propTypes = {
  query: T.string,
  onSubmit: T.func,
};

SearchBar.defaultProps = {
  query: '',
  onSubmit: () => null,
};

export default SearchBar;
