import i18n from 'i18n';

const parseQuery = (query) => {
  const { select, sort, page = 1, limit = 25, ...rest } = query;

  const queryStr = JSON.stringify(rest).replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  const fields = select ? select.split(',').join(' ') : '';
  const sortBy = sort ? sort.split(',').join(' ') : '-createdAt';

  return {
    queryStr,
    fields,
    sortBy,
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };
};

export const advancedResults = (model, populate) => async (req, res, next) => {
  try {
    const { query } = req;

    const { queryStr, fields, sortBy, page, limit } = parseQuery(query);

    const total = await model.countDocuments(JSON.parse(queryStr));

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    console.log('req.params.examID', req.params.examID);
    
    let queryObj = model
      .find({
        ...JSON.parse(queryStr),
        _id: { $ne: req.user?._id },
        createdBy: req.user?._id,
        ...(req.params.examID && { exam: req.params.examID }),
      })
      .select(fields)
      .sort(sortBy);

    if (populate) queryObj = queryObj.populate(populate);

    const results = await queryObj.skip(startIndex).limit(limit);

    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.advancedResults = {
      success: true,
      count: results.length,
      pagination,
      data: results,
    };

    next();
  } catch (err) {
    console.log('error', err);
    res.status(500).json({ success: false, error: i18n.__('serverError') });
  }
};
