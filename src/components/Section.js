import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { Collapse } from 'antd';

export default function Section({
  title,
  hide,
  moreInfo = 'test',
  children,
  ...props
}) {
  return (
    <div
      className={`bg-white shadow overflow-hidden rounded mb-10 ${
        hide ? 'hidden' : null
      }`}
    >
      <div className='flex justify-between border-b border-gray-200 bg-[#0067B9] px-4 py-5 sm:px-6'>
        {title && (
          <h3 className='text-base font-semibold leading-6 text-white'>
            {title}
          </h3>
        )}

        {moreInfo && (
          <div className='flex items-center cursor-pointer'>
            <ExclamationCircleIcon
              className='h-5 w-5 text-white'
              onClick={() => props.setIndicatorInfo(props.indicator)}
            />
          </div>
        )}
      </div>
      <div className='bg-[#F4F4F4]'>
        <div className='pb-5 sm:pb-6'>{children}</div>
      </div>
    </div>
  );
}
