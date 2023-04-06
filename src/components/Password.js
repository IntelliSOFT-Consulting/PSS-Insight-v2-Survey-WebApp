import React, { useState } from 'react';
import ModalItem from './Modal';
import { Form, Input, Button } from 'antd';
import { confirmPassword } from '../api/api';
import {createUseStyles} from 'react-jss';

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
  }
})

export default function Password({ modalOpen, setModalOpen, respondentId }) {
  const [error, setError] = useState(null);

  const classes = useStyles();


  const onsubmit = async values => {
    try {
      const confirmed = await confirmPassword({
        password: values.password,
        respondentId,
      });
      if (confirmed) {
        setError(null);
        setModalOpen(false);
      }
    } catch (error) {
      setError(error.response.data?.details);
    }
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
          />
        </Form.Item>
        <Form.Item className='flex justify-end'>
          <Button
            htmlType='submit'
            className={classes.btn}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </ModalItem>
  );
}
