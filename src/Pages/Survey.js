import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3BottomLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Form, Input, Checkbox } from 'antd';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
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
import InfoModal from '../components/InfoModal';
import { divideIndicatorQuestions } from '../lib/surveyController';
import CardInline from '../components/CardInline';
import { createUseStyles } from 'react-jss';
import SideBar from '../components/SideBar';
import background from '../assets/bg.svg';

const useStyles = createUseStyles({
  checkbox: {
    '& span': {
      fontWeight: '500 !important',
    },
    '& .ant-checkbox-checked': {
      '& .ant-checkbox-inner': {
        backgroundColor: 'white !important',
        borderColor: '#064972 !important',
        position: 'relative',
        borderRadius: '2px',
        display: 'flex !important',
        justifyContent: 'center',
        alignItems: 'center',
        '&:after': {
          content: '""',
          width: '12px',
          height: '12px',
          backgroundColor: '#064972 !important',
          transform: 'initial !important',
          position: 'relative !important',
          top: '0px !important',
          insetInlineStart: '0px !important',
          border: 'none !important',
          transition: 'all 0.3s ease-in-out !important',
        },
      },
    },
    '&:hover': {
      '& .ant-checkbox-checked': {
        '& .ant-checkbox-inner': {
          '&:after': {
            border: 'none !important',
          },
        },
      },
    },
  },
  background: {
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
});

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
  const [resent, setResent] = useState([]);
  const [indicatorInfo, setIndicatorInfo] = useState(null);
  const [indicatorQuestions, setIndicatorQuestions] = useState([]);

  const [form] = Form.useForm();
  const classes = useStyles();

  const surveyId = new URLSearchParams(window.location.search).get('id');
  const navigate = useNavigate();

  const fetchQuestions = async () => {
    try {
      const data = await getQuestions(surveyId);
      setResent(data?.resentQuestions);
      setQuestions(groupQuestions(data?.questions));
      setInfo(data?.respondentDetails);
      const responses = populateResponse(data?.responses);
      form.setFieldsValue(responses);
    } catch (err) {
      if (err?.response?.status === 500) {
        navigate('/404');
      }
      setError('Oops! Something went wrong');
    }
  };

  const countIndicatorQuestions = () => {
    const count = questions.map(category => {
      if (indicatorQuestions?.includes(category.categoryId)) {
        return 1;
      }
      return category?.indicatorDataValue?.length - 1;
    });

    const total = count.reduce((a, b) => a + b, 0);
    setProgress(getProgress(form.getFieldsValue(), total));
  };

  useEffect(() => {
    countIndicatorQuestions();
  }, [indicatorQuestions, questions]);

  useEffect(() => {
    if (!modalOpen && !requestSent) {
      fetchQuestions();
    }
  }, [modalOpen]);

  const onValuesChange = (_, allValues) => {
    countIndicatorQuestions();
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
        <div className={`${classes.background} min-h-screen py-14 sm:py-22`}>
          {info?.landingPage ? (
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
                message={error || saved}
                onClose={() => {
                  setError(null);
                  if (!form.getFieldValue('isSubmit') && saved) {
                    return setSaved(null);
                  }
                }}
                darkened={form.getFieldValue('isSubmit')}
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
                          <SideBar
                            progress={progress}
                            info={info}
                            form={form}
                          />
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
                  <div className='mt-5 flex flex-1 flex-col'>
                    <SideBar progress={progress} info={info} form={form} />
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
                      <h1>PSS Insight</h1>
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
                          {questions?.map((category, index) => {
                            const formattedQuestions =
                              divideIndicatorQuestions(category);

                            return (
                              <Section
                                hide={
                                  resent?.length &&
                                  !resent?.includes(category.categoryId)
                                }
                                title={category.indicatorName}
                                indicator={{
                                  categoryName: category.categoryName,
                                  description: category.description,
                                  indicatorName: category.indicatorName,
                                }}
                                setIndicatorInfo={setIndicatorInfo}
                                key={index}
                              >
                                {formattedQuestions?.map((indicator, index) => {
                                  if (index === 0) {
                                    return (
                                      <CardInline
                                        key={index}
                                        Form={Form}
                                        form={form}
                                        id={indicator?.id}
                                        disabled={
                                          !indicatorQuestions?.includes(
                                            category.categoryId
                                          )
                                        }
                                      >
                                        <Form.Item
                                          name={indicator?.id}
                                          rules={[
                                            {
                                              validator: (_, value) => {
                                                if (
                                                  value &&
                                                  indicator?.valueType ===
                                                    'NUMBER'
                                                ) {
                                                  if (isNaN(value)) {
                                                    return Promise.reject(
                                                      'Please enter a number'
                                                    );
                                                  }
                                                }
                                                return Promise.resolve();
                                              },
                                            },
                                          ]}
                                        >
                                          <InputField
                                            label={indicator?.name}
                                            type={indicator?.valueType}
                                            size='large'
                                            name={indicator?.id}
                                            placeholder={
                                              indicator?.valueType === 'NUMBER'
                                                ? 'Enter Number'
                                                : ''
                                            }
                                          />
                                        </Form.Item>
                                      </CardInline>
                                    );
                                  } else if (index === 1) {
                                    return (
                                      <div key={index} className='my-4 mx-6'>
                                        <Checkbox
                                          key={index}
                                          name={indicator?.id}
                                          checked={
                                            !indicatorQuestions?.includes(
                                              category.categoryId
                                            )
                                          }
                                          className={classes.checkbox}
                                          onChange={e => {
                                            if (e.target.checked) {
                                              form.setFieldValue(
                                                formattedQuestions[0].id,
                                                ''
                                              );
                                              form.setFieldValue(
                                                formattedQuestions[0].id +
                                                  '_file',
                                                ''
                                              );
                                              form.setFieldValue(
                                                formattedQuestions[0].id +
                                                  '_comment',
                                                ''
                                              );
                                              setIndicatorQuestions(prev => {
                                                return prev.filter(
                                                  item =>
                                                    item !== category.categoryId
                                                );
                                              });
                                            } else {
                                              setIndicatorQuestions(prev => {
                                                return [
                                                  ...prev,
                                                  category.categoryId,
                                                ];
                                              });
                                              const indicatorQuestions =
                                                formattedQuestions.slice(2);
                                              indicatorQuestions.forEach(
                                                item => {
                                                  form.setFieldValue(
                                                    item.id,
                                                    null
                                                  );
                                                  form.setFieldValue(
                                                    item.id + '_file',
                                                    null
                                                  );
                                                  form.setFieldValue(
                                                    item.id + '_comment',
                                                    null
                                                  );
                                                }
                                              );
                                            }
                                          }}
                                        >
                                          {indicator?.name}
                                        </Checkbox>
                                      </div>
                                    );
                                  }
                                  return (
                                    <Card
                                      key={index}
                                      Form={Form}
                                      form={form}
                                      id={indicator.id}
                                      disabled={indicatorQuestions?.includes(
                                        category.categoryId
                                      )}
                                    >
                                      <Form.Item
                                        label={indicator.name}
                                        name={indicator.id}
                                      >
                                        <InputField
                                          label={indicator.name}
                                          type={indicator.valueType}
                                          size='large'
                                          name={indicator.id}
                                        />
                                      </Form.Item>
                                    </Card>
                                  );
                                })}
                              </Section>
                            );
                          })}
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
      <InfoModal
        open={indicatorInfo}
        setOpen={setIndicatorInfo}
        title={indicatorInfo?.categoryName || 'DEFINITION'}
        onCancel={() => setIndicatorInfo(null)}
        footer={null}
        type='info'
      />

      <Password
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        respondentId={surveyId}
        setRequestSent={setRequestSent}
      />
    </>
  );
}
