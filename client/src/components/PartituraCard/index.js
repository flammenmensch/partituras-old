import React from 'react';
import T from 'prop-types';

import './styles.css';

const PartituraCard = (props) => (
  <figure className="partitura-card shadowed">
    {
      props.cover &&
      <img className="partitura-card__image" src={props.cover} alt={props.title}/>
    }
    {
      !props.cover &&
      <div className="partitura-card__placeholder" />
    }
    <figcaption className="partitura-card__info">
      <h4 className="partitura-card__title single-line">{props.title}</h4>
      {/*<p className="partitura-card__music">{props.music.join(', ')}</p>*/}
      <p className="partitura-card__genre">{props.genre && props.genre.join(', ')}</p>
    </figcaption>
  </figure>
);

PartituraCard.propTypes = {
  cover: T.string,
  title: T.string.isRequired,
  genre: T.array.isRequired,
  music: T.array.isRequired,
};

PartituraCard.defaultProps = {
  cover: ''
};

export default PartituraCard;
