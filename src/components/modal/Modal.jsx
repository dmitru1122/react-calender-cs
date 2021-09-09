import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import ModalBodyCs from './ModalBody';
import Buttons from '../buttons/Buttons';

const Confirm = (props) => {
  const { type, isShowModal, title, buttonLabel, description, action, continueAction, id, closeAction } = props;
  const [modal, setModal] = useState(isShowModal);
  useEffect(() => {
    setModal(isShowModal);
  }, [isShowModal]);
  const toggle = () => {
    setModal(!modal);
    if (closeAction) closeAction();
  };

  return (
    <>
      {type !== 'notice' && <Buttons action={toggle} type={type} buttonLabel={buttonLabel} />}
      <Modal isOpen={modal} toggle={toggle} data-test='modal'>
        <ModalHeader toggle={toggle} data-testid='modal-header'>
          {title}
        </ModalHeader>
        <ModalBody>
          <ModalBodyCs type={type} description={description} id={id} />
        </ModalBody>
        <ModalFooter>
          {type === 'delete' && (
            <Button color='primary' onClick={continueAction}>
              {action}
            </Button>
          )}

          <Button color='secondary' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

Confirm.propTypes = {
  type: PropTypes.string,
  isShowModal: PropTypes.bool,
  buttonLabel: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  action: PropTypes.string,
  continueAction: PropTypes.func,
  closeAction: PropTypes.func,
  id: PropTypes.string,
};
Confirm.defaultProps = {
  type: 'delete',
  isShowModal: false,
  buttonLabel: null,
  title: '',
  description: null,
  action: 'Continue',
  continueAction: null,
  closeAction: () => {},
  id: '',
};

export default Confirm;
