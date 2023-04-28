import axios from 'axios';

// const api = axios.create({
//   baseURL: `${process.env.REACT_APP_API_URL}`,
// });

export const confirmPassword = async datas => {
  const { data } = await axios.post(
    '/api/v1/survey-respondents/verify-password',
    datas
  );
  return data;
};

export const getQuestions = async respondentId => {
  const { data } = await axios.get(
    `/api/v1/survey-respondents/details/${respondentId}?questions=true&responses=true&respondentDetails=true`
  );
  return data;
};

export const attachFile = async (file, config) => {
  const { data } = await axios.post('/api/v1/file/upload', file, config);
  return data;
};

export const saveResponse = async datas => {
  const { data } = await axios.post(
    '/api/v1/survey-respondents/response/save',
    datas
  );
  return data;
};

export const requestExpiryUpdate = async (respondentId, datas) => {
  const { data } = await axios.post(
    `/api/v1/survey-respondents/request-link/${respondentId}`,
    datas
  );
  return data;
};
