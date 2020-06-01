export const fetchData = async (collectionName, query) => {
  try {
    let value;
    if (!query) {
      value = await fetch(`${collectionName}`);
    } else {
      value = await fetch(`${collectionName}?${query}`);
    }
    const { data, totalQueryCount } = await value.json();

    let questions = data.reduce(function (obj, item) {
      obj[item._id] = {
        title: item.title,
        description: item.description,
        solution: item.solution,
        explanation: item.explanation,
      };
      return obj;
    }, {});
    return { questions, totalQueryCount };
  } catch (err) {
    console.warn('err: ', err);
  }
};
