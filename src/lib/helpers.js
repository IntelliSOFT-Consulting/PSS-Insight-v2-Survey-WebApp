export const groupQuestions = data => {
  const groupedQuestions = data?.map(category => {
    return category.indicators;
  });

  return groupedQuestions?.flat();
};

export const transformSubmissions = submissions => {
  const { isSubmit, ...responses } = submissions;

  const filteredKeys = Object.keys(responses).filter(
    key => !key.match(/(_comment|_file)$/)
  );

  const uniqueKeys = [...new Set(filteredKeys)];
  const responseArray = uniqueKeys.map(key => {
    return {
      indicatorId: key,
      answer: responses[key],
      comments: responses[`${key}_comment`],
      attachment: responses[`${key}_file`],
    };
  });
  return { isSubmit, responses: responseArray };
};

export const populateResponse = responses => {
  const datas = responses.map(response => {
    return response.responses.map(response => {
      const object = {};
      if (response.comment) {
        object[`${response.indicator}_comment`] = response.comment;
      }
      if (response.attachment) {
        object[`${response.indicator}_file`] = response.attachment;
      }
      if (response.response) {
        object[response.indicator] = response.response;
      }
      return object;
    });
  });
  return datas;
};

export const loadData = data => {
  const { responses, ...rest } = data;
  const transformedData = responses.reduce((acc, response) => {
    const { indicator, response: value, comment, attachment } = response;

    acc[indicator] = value;
    acc[`${indicator}_comment`] = comment;
    acc[`${indicator}_file`] = attachment;

    return acc;
  }, {});
  return { ...rest, ...transformedData };
};

// write a function that takes an object, get the keys, removes _comment and _file from the keys, removes duplicates, returns the percentage of the keys that have a value
// write the most efficient code you can think of
export const getProgress = data => {
  const keys = Object.keys(data);
  const filteredKeys = keys.filter(key => !key.match(/(_comment|_file)$/));
  const uniqueKeys = [...new Set(filteredKeys)];

  const filled = uniqueKeys
    .map(key => data[key]?.toString())
    ?.filter(value => value);

  const percentage = (filled.length / (uniqueKeys.length - 1)) * 100;
  return Math.round(percentage);
};
