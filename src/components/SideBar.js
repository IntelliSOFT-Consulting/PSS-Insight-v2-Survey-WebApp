import React from 'react';
import { Progress, Tooltip } from 'antd';
import Countdown from './Countdown';
import { PaperClipIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function SideBar({ progress, info, form }) {
  return (
    <nav className='flex-1 flex space-y-1  pb-4 items-center mt-14 flex-col'>
      <h1 className='my-4 font-bold'>YOUR PROGRESS</h1>
      <Progress
        type='circle'
        percent={progress}
        strokeColor='#0D8E0D'
        strokeWidth={10}
        format={percent => `${percent}%`}
      />
      <p className='py-8 text-sm'>
        Form expires in:{' '}
        <b>
          {info?.expiresAt && (
            <Countdown expiryDate={new Date(info?.expiresAt)} />
          )}
        </b>
      </p>
      <div className='flex flex-col w-full text-sm px-2'>
        <Tooltip title="To find a specific indicator in the document, use the search function (typically Ctrl+F or Command+F) and enter the name or keyword of the indicator you're looking for.">
          <a
            href={`${process.env.REACT_APP_REFERENCE_URL}/api/v1/national-template/view-file/${info?.referenceSheet}`}
            target='_blank'
            rel='noreferrer'
            className='bg-[#CCE0F1] hover:bg-[#CCE0F1] py-2 px-4 w-full flex justify-center rounded text-primaryDark'
          >
            <PaperClipIcon className='h-4 w-4 mr-2' />
            Reference Sheet
          </a>
        </Tooltip>
        <button className='bg-[#CCE0F1] hover:bg-[#CCE0F1] py-2 mt-1 px-4 w-full flex justify-center rounded text-primaryDark'>
          <EnvelopeIcon className='h-4 w-4 mr-2' />
          admin@pss.com
        </button>
        <div className='flex justify-betweween mt-4'>
          <button
            className='bg-[#CCE0F1] hover:bg-[#CCE0F1] py-1 w-full flex pl-2 rounded mr-4 items-center text-sm text-primaryDark justify-center'
            onClick={() => {
              form.setFieldValue('isSubmit', false);
              form.submit();
            }}
          >
            <span className='material-symbols-outlined text-sm mr-1'>save</span>
            {/* <BookmarkSquareIcon className='h-4 w-4 mr-1' /> */}
            Save Draft
          </button>
          <button
            className='bg-[#218838] hover:bg-[#218838] text-white py-1 w-full flex pl-2 rounded items-center text-sm justify-center'
            onClick={() => {
              form.setFieldValue('isSubmit', true);
              form.submit();
            }}
          >
            {/* <PaperAirplaneIcon className='h-4 w-4 mr-1' /> */}
            <span className='material-symbols-outlined -rotate-45 text-sm mr-1'>
              send
            </span>
            Submit Survey
          </button>
        </div>
      </div>
    </nav>
  );
}
