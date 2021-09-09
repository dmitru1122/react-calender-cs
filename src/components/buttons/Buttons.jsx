import React from 'react';
import { TrashCan32 as Delete, Edit32 as Edit, Add32 as Add } from '@carbon/icons-react';
import { Button } from 'carbon-components-react';

import PropTypes from 'prop-types';

const ButtonsPropTypes = {
  type: PropTypes.string,
  buttonLabel: PropTypes.string,
  action: PropTypes.func,
};
const ButtonDefaultProps = {
  type: '',
  buttonLabel: '',
  action: () => {},
};
const button = {
  add: { renderIcon: Add, iconDescription: 'Add new', kind: 'primary' },
  delete: { renderIcon: Delete, iconDescription: 'Delete row', kind: 'ghost' },
  edit: { renderIcon: Edit, iconDescription: 'Edit row', kind: 'ghost' },
  '': { renderIcon: null, iconDescription: '', kind: 'danger' },
};

const Buttons = ({ action, type, buttonLabel }) => {
  return (
    <Button
      hasIconOnly
      renderIcon={button[type].renderIcon}
      onClick={action}
      tooltipAlignment='center'
      tooltipPosition='bottom'
      iconDescription={button[type].iconDescription}
      kind={button[type].kind}>
      {buttonLabel && buttonLabel}
    </Button>
  );
};
Buttons.propTypes = ButtonsPropTypes;
Buttons.defaultProps = ButtonDefaultProps;

export default Buttons;
