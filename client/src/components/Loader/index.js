import React from 'react';
import styled from 'styled-components';

const Loader = ({ className }) => (
  <div className={className}>Loading...</div>
);

export default styled(Loader)`
  font-family: Menlo, "Courier New", sans-serif;
  text-align: center;
`;
