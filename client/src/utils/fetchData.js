export const fetchData = async (collectionName) => {
  try {
    let value = await fetch(`/${collectionName}`);
    const { questionObj } = await value.json();
    let questions = questionObj.reduce(function (obj, item) {
      obj[item._id] = {
        title: item.title,
        description: item.description,
        solution: item.solution,
        explanation: item.explanation,
      };
      return obj;
    }, {});
    return questions;
  } catch (err) {
    console.warn('err: ', err);
  }
};
