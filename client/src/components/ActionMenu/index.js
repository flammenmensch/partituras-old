import React from 'react';
import classnames from 'classnames';
import T from 'prop-types';

import './styles.css';

const ActionMenu = (props) => (
  <menu className="action-menu">
    {
      props.actions.map((action, index) => {
        const cn = classnames('action-menu__button', {
          'action-menu__button--selected': props.selectedAction === action
        });
        return (
          <li key={index} className="action-menu__item">
            <button className={cn} type="button" onClick={() => props.onAction(action.data)}>{action.label}</button>
          </li>
        );
      })
    }
  </menu>
);

const ActionType = T.shape({
  label: T.string,
  data: T.any,
});

ActionMenu.propTypes = {
  onAction: T.func,
  selectedAction: ActionType,
  actions: T.arrayOf(ActionType)
};

ActionMenu.defaultProps = {
  actions: [],
  onAction: () => {}
};

export default ActionMenu;
