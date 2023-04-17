import React, { useState } from 'react';
import ModalItem from './Modal';
import { Form, Input, Button } from 'antd';
import { confirmPassword, requestExpiryUpdate } from '../api/api';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  btn: {
    backgroundColor: '#218838',
    color: 'white !important',
    borderColor: '#218838',
    '&:hover': {
      backgroundColor: '#218838',
      color: 'white !important',
      borderColor: '#218838',
      outline: 'none !important',
    },
  },
});

export default function Password({ modalOpen, setModalOpen, respondentId, setRequestSent }) {
  const [error, setError] = useState(null);
  const [noPaste, setNoPaste] = useState(null);
 

  const classes = useStyles();

  const onsubmit = async values => {
    try {
      let confirmed;
      if (error?.includes('expired')) {
        confirmed = await requestExpiryUpdate(respondentId, {
          comment: values.comment,
        });
        if (confirmed) {
          setRequestSent(true);
        }
      } else {
        confirmed = await confirmPassword({
          password: values.password,
          respondentId,
        });
      }
      if (confirmed) {
        setError(null);
        setModalOpen(false);
      }
    } catch (error) {
      console.log(error)
      setError(error.response.data?.details);
    }
  };

  const handlePaste = e => {
    e.preventDefault();
    setNoPaste('Paste is not allowed');
    setTimeout(() => {
      setNoPaste(null);
    }, 2000);
  };

  return (
    <ModalItem
      open={modalOpen}
      type={error ? 'error' : 'info'}
      title={error ? error : 'Enter Password'}
      footer={null}
      closable={false}
      maskStyle={{ backgroundColor: '#112128' }}
    >
      <Form layout='vertical' onFinish={onsubmit}>
        {error?.includes('expired') ? (
          <Form.Item name='comment' label='Enter comment'>
            <Input.TextArea placeholder='Enter comment' size='large' />
          </Form.Item>
        ) : (
          <Form.Item
            name='password'
            label='Enter password sent on your email address'
            rules={[
              {
                required: true,
                message: 'Please enter password',
              },
            ]}
          >
            <Input
              placeholder='Enter password'
              size='large'
              type='password'
              onChange={onchange}
              onPaste={handlePaste}
            />
          </Form.Item>
        )}
        {noPaste && <p className='text-red-500 text-sm'>{noPaste}</p>}

        <Form.Item className='flex justify-end'>
          <Button htmlType='submit' className={classes.btn}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </ModalItem>
  );
}
