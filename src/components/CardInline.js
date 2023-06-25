import React, { useState } from 'react';
import {
  ChatBubbleLeftEllipsisIcon,
  DocumentPlusIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';
import { UploadOutlined } from '@ant-design/icons';
import { Collapse, Input, Button, Upload, Form } from 'antd';
import { attachFile } from '../api/api';
import { createUseStyles } from 'react-jss';

const { Panel } = Collapse;

const useStyles = createUseStyles({
  '@global': {
    '.ant-form-item': {
      marginBottom: '0px !important',
    },
  },
});

const CardInline = ({ Form, form, children, id, disabled }) => {
  const [showPanel, setShowPanel] = useState(false);
  const classes = useStyles();

  const handleFileUpload = async ({ file, onSuccess, onError, onProgress }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const config = {
        headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress: event => {
          const percent = (event.loaded / event.total) * 100;
          onProgress({ percent });
        },
      };

      const response = await attachFile(formData, config);
      form.setFieldValue(`${id}_file`, response?.id);
      onSuccess('Ok');
    } catch (error) {
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

  const fileList = form.getFieldValue(`${id}_file`)
    ? [
        {
          uid: id,
          name: 'Attached File',
          status: 'done',
          type: 'file',
          url: form.getFieldValue(`${id}_file`),
        },
      ]
    : [];
  return (
    <div
      className={`shadow-sm overflow-hidden mb-4 bg-[#CCE1F1] ${
        disabled ? 'unclickable' : null
      }`}
    >
      <div className='grid md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-x-6 items-center'>
        <div className='px-4 py-4'>{children}</div>
        <Collapse
          bordered={false}
          className='relative bg-[#CCE1F1] rounded-none'
          onChange={() => setShowPanel(!showPanel)}
        >
          <Panel showArrow={false} header={panelHeader} key='1' />
        </Collapse>

        <div
          className={`bg-white col-span-2 transition duration-500 ease-in-out ${
            showPanel ? 'opacity-100' : 'hidden opacity-0'
          }`}
        >
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
                defaultFileList={fileList}
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
      </div>
    </div>
  );
};

export default CardInline;
