export const fetchData = async (collectionName, query) => {
  try {
    let value;
    if (!query) {
      value = await fetch(`/api/v1/${collectionName}`);
    } else {
      value = await fetch(`/api/v1/${collectionName}?${query}`);
    }
    const { data, totalQueryCount } = await value.json();

    let questions = data.reduce(function (obj, item) {
      obj[item._id] = {
        title: item.title,
        description: item.description,
        solution: item.solution,
        explanation: item.explanation,
        level: item.level,
      };
      return obj;
    }, {});
    return { questions, totalQueryCount };
  } catch (err) {
    console.warn('err: ', err);
  }
};
