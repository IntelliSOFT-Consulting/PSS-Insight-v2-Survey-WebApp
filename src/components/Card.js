import React from 'react';
import {
  ChatBubbleLeftEllipsisIcon,
  DocumentPlusIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';
import { UploadOutlined } from '@ant-design/icons';
import { Collapse, Input, Button, Upload } from 'antd';
import { attachFile } from '../api/api';

const { Panel } = Collapse;

export default function Card({ Form, form, children, id, ...props }) {
  const handleFileUpload = async ({ file, onSuccess, onError, onProgress }) => {
    const formData = new FormData();
    formData.append('file', file);

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: event => {
        const percent = (event.loaded / event.total) * 100;
        onProgress({ percent });
      },
    };

    try {
      const response = await attachFile(formData, config);
      form.setFieldValue(`${id}_file`, response?.id);
      onSuccess('Ok');
    } catch (error) {
      console.log(error);
      onError('Error');
    }
  };

  const panelHeader = (
    <div className='flex items-center'>
      <div className='flex items-center mr-8'>
        <ChatBubbleLeftEllipsisIcon className='h-5 w-5 text-primaryDark' />
        <p className='text-sm font-medium text-primaryDark'>Enter Comment</p>
      </div>
      <div className='flex items-center'>
        <DocumentPlusIcon className='h-5 w-5 text-primaryDark' />
        <p className='text-sm font-medium text-primaryDark'>Attach File</p>
      </div>
    </div>
  );

  return (
    <div
      className={`shadow overflow-hidden rounded mb-4 mx-4 ${
        props.disabled ? 'unclickable bg-gray-100' : 'bg-white'
      }`}
    >
      <div className=''>
        <div className='px-4 py-5 sm:p-6'>{children}</div>
        <Collapse
          bordered={false}
          style={{ background: '#CCE1F1', borderRadius: '0px' }}
        >
          <Panel showArrow={false} header={panelHeader} key='1'>
            <div className='bg-white'>
              <div className='px-4 py-5 sm:p-6 grid grid-cols-2 xs:grid-cols-1 gap-6'>
                <div className=''>
                  <Form.Item name={`${id}_comment`} label='Enter Comment'>
                    <Input.TextArea
                      placeholder='Enter Comment'
                      rows={4}
                      className='w-full'
                      autoComplete='off'
                    />
                  </Form.Item>
                </div>
                <div className=''>
                  <label className='block text-sm font-medium text-gray-700 my-2'>
                    Attach File
                  </label>
                  <Upload
                    maxCount={1}
                    showUploadList={{
                      showDownloadIcon: false,
                      removeIcon: (
                        <XCircleIcon className='h-5 w-5 text-primaryDark' />
                      ),
                    }}
                    customRequest={handleFileUpload}
                    listType='picture'
                  >
                    <Button
                      className='text-primaryDark'
                      block
                      icon={<UploadOutlined />}
                    >
                      Select file
                    </Button>
                  </Upload>
                  <Form.Item name={`${id}_file`} hidden>
                    <Input />
                  </Form.Item>
                </div>
              </div>
            </div>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
}
