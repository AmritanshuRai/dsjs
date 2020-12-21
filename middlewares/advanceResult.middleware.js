require('../utils/cache.util');

const advanceResult = (model, ...toPopulate) => async (req, res, next) => {
  let { select, sort, page, limit, ...reqQuery } = req.query;

  const queryStr = JSON.stringify(reqQuery);
  const queryStrModified = queryStr.replace(
    /\b(gt|gte|lt|lte|in)/g,
    (match) => `$${match}`
  );
  let query = model.find(JSON.parse(queryStrModified));
  // { title: new RegExp('ipsum dol', 'i')
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort({ _id: -1 });
  }

  //pagination
  const pageNumber = parseInt(req.query.page, 10) || 1;
  const limiter = parseInt(req.query.limit, 10) || 14;
  const startIndex = (pageNumber - 1) * limiter;
  const endIndex = pageNumber * limiter;
  query = query.skip(startIndex).limit(limiter);
  const totalQueryCount = await model
    .countDocuments(JSON.parse(queryStrModified))
    .cache({
      hashKey: query.mongooseCollection.name + 'Count',
    });

  const pagination = {};

  if (endIndex < totalQueryCount) {
    pagination.next = {
      pageNumber: pageNumber + 1,
      limiter,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      pageNumber: pageNumber - 1,
      limiter,
    };
  }

  if (toPopulate.length) {
    query = query.populate(...toPopulate);
  }
  const fetchedData = await query.cache({
    hashKey: query.mongooseCollection.name,
  });

  res.advanceResult = {
    success: true,
    count: fetchedData.length,
    pagination,
    totalQueryCount,
    data: fetchedData,
  };
  next();
};

module.exports = advanceResult;
// if (!!Object.keys(JSON.parse(queryStrModified)).length) {
//   totalQueryCount = await model.countDocuments(
//     JSON.parse(queryStrModified)
//   );
// } else {
//   totalQueryCount = await model.estimatedDocumentCount();
// }
