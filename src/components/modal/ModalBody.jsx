import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addOneRequest } from '../../redux/actions/index';
import Form from '../formCalendar/Form';

const ModalBodyCs = (props) => {
  const { type, description, action } = props;
  const dispatch = useDispatch();

  switch (type) {
    case 'edit': {
      const purposes = { purpose: '' };
      return <Form title='' action={action} initialData={purposes} />;
    }
    case 'add': {
      const handleAdd = (values, form) => {
        dispatch(addOneRequest(values));
        form.restart();
      };
      return <Form title='Add Request' action={handleAdd} />;
    }
    default: {
      return <>{description}</>;
    }
  }
};

ModalBodyCs.propTypes = {
  type: PropTypes.string,
  description: PropTypes.string,
  action: PropTypes.func,
};

ModalBodyCs.defaultProps = {
  type: 'delete',
  description: null,
  action: () => {},
};

export default ModalBodyCs;
