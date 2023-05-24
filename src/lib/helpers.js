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
      answer: responses[key] || '',
      comments: responses[`${key}_comment`],
      attachment: responses[`${key}_file`],
    };
  });
  return { isSubmit, responses: responseArray };
};

export const populateResponse = responses => {
  const object = {};
  responses?.forEach(response => {
    if (response.comment) {
      object[`${response.indicator}_comment`] = response.comment;
    }
    if (response.attachment) {
      object[`${response.indicator}_file`] = response.attachment;
    }
    if (response.response) {
      object[response.indicator] =
        response.response === 'true'
          ? true
          : response.response === 'false'
          ? false
          : response.response;
    } else {
      object[response.indicator] = '';
    }
  });
  return object;
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

export const getProgress = (data, total) => {
  const keys = Object.keys(data);
  const filteredKeys = keys.filter(key => !key.match(/(_comment|_file|isSubmit)$/));
  const uniqueKeys = [...new Set(filteredKeys)];

  const filled = uniqueKeys
  .map(key => data[key]?.toString() || data[`${key}_comment`]?.toString() || data[`${key}_file`]?.toString())
  ?.filter(value => value);
  
  const percentage = (filled.length / total) * 100;
  return Math.round(percentage);
};
