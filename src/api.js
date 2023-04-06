import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.104.91.99:7001/api/v1',
});

export const getSurvey = id => {
  const { data } = api.get(`/survey/${id}`);
  return data;
};

export const uploadFile = file => {
  let formData = new FormData();

  formData.append('file', file);

  const { data } = api.post('/upload-file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const saveData = payload => {
  const { data } = api.post('/data-entry/response/save', payload);
  return data;
};
