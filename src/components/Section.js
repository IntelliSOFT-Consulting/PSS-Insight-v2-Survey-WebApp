import React from 'react';
import {
  ExclamationCircleIcon,
  ChatBubbleLeftEllipsisIcon,
  DocumentPlusIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';
import { UploadOutlined } from '@ant-design/icons';
import { Collapse, Input, Button, Upload } from 'antd';

const { Panel } = Collapse;

export default function Section({ title, moreInfo = 'test', children }) {
 

  return (
    <div className='bg-white shadow overflow-hidden rounded mb-10'>
      <div className='flex justify-between border-b border-gray-200 bg-[#0067B9] px-4 py-5 sm:px-6'>
        {title && (
          <h3 className='text-base font-semibold leading-6 text-white'>
            {title}
          </h3>
        )}

        {moreInfo && (
          <div className='flex items-center cursor-pointer'>
            <ExclamationCircleIcon className='h-5 w-5 text-white' />
          </div>
        )}
      </div>
      <div className='bg-[#F4F4F4]'>
        <div className='px-4 py-5 sm:p-6'>{children}</div>
      </div>
    </div>
  );
}
