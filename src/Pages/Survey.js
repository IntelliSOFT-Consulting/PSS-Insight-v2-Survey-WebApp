import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3BottomLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import {
  PaperClipIcon,
  BookmarkSquareIcon,
  EnvelopeIcon,
} from '@heroicons/react/20/solid';
import { Form, Progress, Input, Radio } from 'antd';
import Card from '../components/Card';
import { useParams, useNavigate } from 'react-router-dom';
import Password from '../components/Password';
import InputField from '../components/InputField';
import { getQuestions, saveResponse } from '../api/api';
import {
  getProgress,
  groupQuestions,
  populateResponse,
  transformSubmissions,
} from '../lib/helpers';
import Section from '../components/Section';
import Notification from '../components/Notification';
import Loading from '../components/Loading';

export default function Survey() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [progress, setProgress] = useState(0);
  const [info, setInfo] = useState(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);
  const [requestSent, setRequestSent] = useState(false);

  const [form] = Form.useForm();

  const surveyId = new URLSearchParams(window.location.search).get('id');
  const navigate = useNavigate();

  const fetchQuestions = async () => {
    try {
      const data = await getQuestions(surveyId);
      setQuestions(groupQuestions(data?.questions));
      setInfo(data?.respondentDetails);
      const responses = populateResponse(data?.responses);
      form.setFieldsValue(responses);
      setProgress(getProgress(responses));
    } catch (err) {
      console.log(err);
      if (err?.response?.status === 500) {
        navigate('/404');
      }
      setError('Oops! Something went wrong');
    }
  };

  useEffect(() => {
    if (!modalOpen && !requestSent) {
      fetchQuestions();
    }
  }, [modalOpen]);

  const onValuesChange = (_, allValues) => {
    setProgress(getProgress(allValues));
  };

  const submitSurvey = async values => {
    try {
      const submissions = transformSubmissions(values);
      submissions.respondentId = surveyId;

      const saved = await saveResponse(submissions);
      if (saved) {
        const message = values.isSubmit
          ? 'Survey submitted successfully'
          : 'Survey saved successfully';
        setSaved(message);
      }
    } catch (err) {
      setError('Oops! Something went wrong');
    }
  };

  return (
    <>
      {requestSent && (
        <Notification message='Request sent successfully' status='success' />
      )}

      {infoOpen && !modalOpen ? (
        <div className='bg-primary min-h-screen py-14 sm:py-22'>
          {info?.landingPage ? (
            <div className='mx-auto max-w-7xl px-6 lg:px-8'>
              <h1 className='text-white font-extrabold text-3xl mt-2 sm:text-4xl'>
                PSS INSIGHTS SURVEY
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
          ) : (
            <div className='absolute flex w-screen h-screen items-center justify-center transition-all ease-linear duration-300'>
              {!requestSent && <Loading />}
            </div>
          )}
        </div>
      ) : (
        <div>
          {!modalOpen && (
            <>
              <Notification
                status={error ? 'error' : saved ? 'success' : null}
                message={saved}
                onClose={() => setError(null)}
                key={error ? 'error' : saved ? 'success' : 'notification'}
              />
              <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog
                  as='div'
                  className='relative z-40 lg:hidden'
                  onClose={setSidebarOpen}
                >
                  <Transition.Child
                    as={Fragment}
                    enter='transition-opacity ease-linear duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='transition-opacity ease-linear duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className='fixed inset-0 bg-gray-600 bg-opacity-75' />
                  </Transition.Child>

                  <div className='fixed inset-0 z-40 flex'>
                    <Transition.Child
                      as={Fragment}
                      enter='transition ease-in-out duration-300 transform'
                      enterFrom='-translate-x-full'
                      enterTo='translate-x-0'
                      leave='transition ease-in-out duration-300 transform'
                      leaveFrom='translate-x-0'
                      leaveTo='-translate-x-full'
                    >
                      <Dialog.Panel className='relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4'>
                        <Transition.Child
                          as={Fragment}
                          enter='ease-in-out duration-300'
                          enterFrom='opacity-0'
                          enterTo='opacity-100'
                          leave='ease-in-out duration-300'
                          leaveFrom='opacity-100'
                          leaveTo='opacity-0'
                        >
                          <div className='absolute top-0 right-0 -mr-12 pt-2'>
                            <button
                              type='button'
                              className='ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                              onClick={() => setSidebarOpen(false)}
                            >
                              <span className='sr-only'>Close sidebar</span>
                              <XMarkIcon
                                className='h-4 w-4 text-white'
                                aria-hidden='true'
                              />
                            </button>
                          </div>
                        </Transition.Child>

                        <div className='mt-5 h-0 flex-1 overflow-y-auto'>
                          <nav className='space-y-1 px-2 flex flex-col items-center'>
                            <h1 className='my-4 font-bold'>YOUR PROGRESS</h1>
                            <Progress
                              type='circle'
                              percent={progress}
                              strokeColor='#0D8E0D'
                            />
                            <p className='py-8 text-sm'>
                              Form expires in: <b>1hr: 30mins: 20secs</b>
                            </p>
                            <div className='flex flex-col w-full text-sm px-2'>
                              <button className='bg-[#CCE0F1] hover:bg-[#CCE0F1] py-2 px-4 w-full flex justify-center rounded text-primaryDark'>
                                <PaperClipIcon className='h-4 w-4 mr-2' />
                                Reference Sheet
                              </button>
                              <button className='bg-[#CCE0F1] hover:bg-[#CCE0F1] py-2 mt-1 px-4 w-full flex justify-center rounded text-primaryDark'>
                                <EnvelopeIcon className='h-4 w-4 mr-2' />
                                admin@pss.com
                              </button>
                              <div className='flex justify-betweween mt-4'>
                                <button
                                  className='bg-[#CCE0F1] hover:bg-[#CCE0F1] py-1 w-full flex pl-2 rounded mr-4 items-center text-sm text-primaryDark'
                                  onClick={() => {
                                    form.setFieldValue('isSubmit', false);
                                    form.submit();
                                  }}
                                >
                                  <BookmarkSquareIcon className='h-4 w-4 mr-1' />
                                  Save Draft
                                </button>
                                <button
                                  className='bg-[#218838] hover:bg-[#218838] text-white py-1 w-full flex pl-2 rounded items-center text-sm'
                                  onClick={() => {
                                    form.setFieldValue('isSubmit', true);
                                    form.submit();
                                  }}
                                >
                                  <span class='material-symbols-outlined'>
                                    send
                                  </span>
                                  {/* <PaperAirplaneIcon className='h-4 w-4 mr-1' /> */}
                                  Submit Survey
                                </button>
                              </div>
                            </div>
                          </nav>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                    <div className='w-14 flex-shrink-0' aria-hidden='true'>
                      {/* Dummy element to force sidebar to shrink to fit close icon */}
                    </div>
                  </div>
                </Dialog>
              </Transition.Root>

              {/* Static sidebar for desktop */}
              <div className='hidden lg:fixed lg:inset-y-0 lg:flex lg:w-80 lg:flex-col'>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className='flex flex-grow flex-col overflow-y-auto ring-1 ring-gray-300 pt-5'>
                  <div className='flex flex-shrink-0 items-center px-4'>
                    <img
                      className='h-8 w-auto'
                      src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300'
                      alt='Your Company'
                    />
                  </div>
                  <div className='mt-5 flex flex-1 flex-col'>
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
                        Form expires in: <b>1hr: 30mins: 20secs</b>
                      </p>
                      <div className='flex flex-col w-full text-sm px-2'>
                        <button className='bg-[#CCE0F1] hover:bg-[#CCE0F1] py-2 px-4 w-full flex justify-center rounded text-primaryDark'>
                          <PaperClipIcon className='h-4 w-4 mr-2' />
                          Reference Sheet
                        </button>
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
                            <span class='material-symbols-outlined text-sm mr-1'>
                              save
                            </span>
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
                            <span class='material-symbols-outlined -rotate-45 text-sm mr-1'>
                              send
                            </span>
                            Submit Survey
                          </button>
                        </div>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
              <div className='flex flex-1 flex-col lg:pl-0'>
                <div className='sticky top-0 z-10 flex h-16 flex-shrink-0 bg-primaryDark shadow'>
                  <button
                    type='button'
                    className='border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden'
                    onClick={() => setSidebarOpen(true)}
                  >
                    <span className='sr-only'>Open sidebar</span>
                    <Bars3BottomLeftIcon
                      className='h-4 w-4'
                      aria-hidden='true'
                    />
                  </button>
                  <div className='flex flex-1 justify-between px-4 bg-primaryDark'>
                    <div className='flex flex-1 bg-primaryDark items-center text-white font-semibold'>
                      <h1>Pharmaceutical System Strengthening V2.0</h1>
                    </div>
                  </div>
                </div>

                <main className='pl-4  p-4 md:p-10 sm:pl-10 xs:pl-10 lg:pl-80 xl:pl-80'>
                  <div className='md:px-8'>
                    {!modalOpen && (
                      <>
                        <Form
                          form={form}
                          layout='vertical'
                          onValuesChange={onValuesChange}
                          onFinish={submitSurvey}
                        >
                          {questions?.map((category, index) => (
                            <Section title={category.indicatorName} key={index}>
                              {category.indicatorDataValue?.map(
                                (indicator, index) => (
                                  <Card
                                    key={index}
                                    Form={Form}
                                    form={form}
                                    id={indicator.id}
                                  >
                                    <Form.Item
                                      label={indicator.name}
                                      name={indicator.id}
                                      rules={[
                                        {
                                          required: true,
                                          message: 'This field is required',
                                        },
                                      ]}
                                    >
                                      <InputField
                                        label={indicator.name}
                                        type={indicator.valueType}
                                        size='large'
                                        name={indicator.id}
                                        required
                                      />
                                    </Form.Item>
                                  </Card>
                                )
                              )}
                            </Section>
                          ))}
                          <Form.Item name='isSubmit' hidden>
                            <Input />
                          </Form.Item>
                        </Form>
                      </>
                    )}
                  </div>
                </main>
              </div>
            </>
          )}
        </div>
      )}
      <Password
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        respondentId={surveyId}
        setRequestSent={setRequestSent}
      />
    </>
  );
}
