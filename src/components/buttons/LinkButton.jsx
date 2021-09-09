import { Button } from 'carbon-components-react';
import { Undo32 as Undo } from '@carbon/icons-react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function LinkButton({ link, label }) {
  const history = useHistory();
  const handleClickReturn = () => {
    history.push(link);
  };
  return (
    <Button data-testid='LinkButton' renderIcon={Undo} kind='ghost' onClick={handleClickReturn}>
      {label}
    </Button>
  );
}
const propTypes = {
  link: PropTypes.string,
  label: PropTypes.string,
};
const defaultProps = {
  link: '/',
  label: 'Return to the list requests',
};

LinkButton.propTypes = propTypes;
LinkButton.defaultProps = defaultProps;

export default LinkButton;
