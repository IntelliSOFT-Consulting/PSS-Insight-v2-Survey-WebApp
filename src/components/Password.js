import React, { useState } from 'react';
import ModalItem from './Modal';
import { Form, Input, Button } from 'antd';
import { confirmPassword } from '../api/api';

export default function Password({ modalOpen, setModalOpen, respondentId }) {
  const [error, setError] = useState(null);


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
            className='bg-[#218838] rounded-md px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#218838] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#218838]'
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </ModalItem>
  );
}
