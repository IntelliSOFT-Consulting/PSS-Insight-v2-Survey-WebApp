import React from 'react';
import Modal from './Modal';
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  modal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
  },
  iconError: {
    color: '#FD0C0B',
    width: '6rem',
    height: '6rem',
    marginBottom: '1rem',
  },
  iconSuccess: {
    color: '#218838',
    width: '6rem',
    height: '6rem',
    marginBottom: '1rem',
  },
});

export default function Notification({ status, message, onClose, ...props }) {
  const classes = useStyles();
  return (
    <Modal
      open={message}
      type={status}
      title={status === 'error' ? 'Error' : 'Success'}
      footer={null}
      closable={status === 'error' || !props.darkened }
      onCancel={onClose}
      maskStyle={{
        backgroundColor: props.darkened ? '#112128' : 'rgba(0,0,0,.5)',
      }}
      {...props}
    >
      <div className={classes.modal}>
        {status === 'error' ? (
          <XCircleIcon className={classes.iconError} />
        ) : (
          <CheckCircleIcon className={classes.iconSuccess} />
        )}
        {message}
      </div>
    </Modal>
  );
}
