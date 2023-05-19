import React from 'react';
import Loading from '../components/Loading';

export default function Home({ info, setInfoOpen }) {
  return (
    <div className={`min-h-screen py-14 sm:py-22`}>
      {!info?.surveyName ? (
        <Loading />
      ) : (
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <h1 className='text-white font-extrabold text-3xl mt-2 sm:text-4xl'>
            PSS INSIGHT SURVEY
          </h1>
          <div className='bg-whiteTransparent p-4 rounded-md my-6'>
            <h1 className='mt-2 text-xl font-bold tracking-tight text-primaryDark sm:text-2xl text-center'>
              {info?.surveyName}
            </h1>
            <p className='mt-6 text-md leading-8'>{info?.landingPage}</p>

            <div className='flex justify-center mt-6'>
              {/* cancel button */}
              <button
                className='bg-disabled rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-disabled focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-disabled mr-4'
                onClick={() => {
                  // close the tab
                  window.close();
                }}
              >
                CANCEL
              </button>
              <button
                onClick={() => {
                  setInfoOpen(false);
                }}
                className='bg-success rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-success focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success'
                disabled={!info}
              >
                START SURVEY
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
