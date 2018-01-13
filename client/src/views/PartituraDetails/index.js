import React from 'react';
import {Route} from 'react-router-dom';
import T from 'prop-types';
import View from '../../components/View';
import Scores from '../../components/ScoreList';
import Lyrics from '../../components/Lyrics';
import ActionMenu from '../../components/ActionMenu';
import IconButton from '../../components/IconButton';

const PartituraDetails = (props) => (
  <View title={props.item.title} subtitle={props.item.genre.join(', ')}>
    {
      props.actions.length > 1 &&
      <ActionMenu actions={props.actions} onAction={props.onAction} selectedAction={props.selectedAction}/>
    }
    <div>
      <Route path="/partitura/:id/scores" render={() => (<Scores data={props.item.scores} />)} />
      <Route path="/partitura/:id/lyrics" render={() => (<Lyrics data={props.item.lyrics} />)} />
    </div>
    <div className="partitura-action-list-container">
      <ul className="partitura-action-list">
        <li>
          {
            props.isFavorite ?
              <IconButton
                onClick={() => props.onToggleFavorite(true)}
                icon="heart"
                title="Remove from favorites" />
              :
              <IconButton
                onClick={() => props.onToggleFavorite(false)}
                icon="heart-outline"
                title="Add to favorites" />
          }

        </li>
        <li>
          <IconButton onClick={() => false} icon="link" title="Source" />
        </li>
        <li>
          <IconButton onClick={() => false} icon="printer" title="Print to PDF" />
        </li>
      </ul>
    </div>
    {/*<div className="action-button-container">
      <button type="button" className="action-button--print action-button" />
    </div>*/}
  </View>
);

PartituraDetails.propTypes = {
  actions: T.array,
  onAction: T.func.isRequired,
  onGoToSource: T.func.isRequired,
  onToggleFavorite: T.func.isRequired,
  item: T.object.isRequired,
  isFavorite: T.bool,
};

PartituraDetails.defaultProps = {
  actions: [],
  isFavorite: false,
};

export default PartituraDetails;
