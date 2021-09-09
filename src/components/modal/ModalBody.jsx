import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { editOneRequest, addOneRequest } from '../../redux/actions/index';
import { useGetOneRequest } from '../../cusom-hooks/GetOneRequest';
import Form from '../forms/FormRequest';

const ModalBodyCs = (props) => {
  const { type, id, description } = props;
  const dispatch = useDispatch();

  switch (type) {
    case 'edit': {
      const listRequests = useGetOneRequest(id);
      const handleEdit = (values) => {
        dispatch(editOneRequest(values, id));
      };
      return <Form title='Edit Request' action={handleEdit} initialData={listRequests?.rowData[0]} />;
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
  id: PropTypes.string,
};

ModalBodyCs.defaultProps = {
  type: 'delete',
  description: null,
  id: '',
};

export default ModalBodyCs;
