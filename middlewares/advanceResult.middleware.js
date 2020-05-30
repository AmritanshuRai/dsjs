const advanceResult = (model, populate) => async (req, res, next) => {
  let { select, sort, page, limit, ...reqQuery } = req.query;

  const queryStr = JSON.stringify(reqQuery);
  const queryStrModified = queryStr.replace(
    /\b(gt|gte|lt|lte|in)/g,
    (match) => `$${match}`
  );
  let query = model.find(JSON.parse(queryStrModified)).populate('courses');

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
  const limiter = parseInt(req.query.limit, 10) || 10;
  const startIndex = (pageNumber - 1) * limiter;
  const endIndex = pageNumber * limiter;
  query = query.skip(startIndex).limit(limiter);
  const totalQueryCount = await model.countDocuments(
    JSON.parse(queryStrModified)
  );
  // if (!!Object.keys(JSON.parse(queryStrModified)).length) {
  //   totalQueryCount = await model.countDocuments(
  //     JSON.parse(queryStrModified)
  //   );
  // } else {
  //   totalQueryCount = await model.estimatedDocumentCount();
  // }
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

  if (populate) {
    query = query.populate(populate);
  }
  const fetchedData = await query;

  res.advanceResult = {
    success: true,
    count: fetchedData.length,
    pagination,
    data: fetchedData,
  };
  next();
};

module.exports = advanceResult;
