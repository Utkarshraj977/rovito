const getPagination = (page = 1, limit = 10) => {
  page = Number(page);
  limit = Number(limit);

  const skip = (page - 1) * limit;
  const take = limit;

  return {
    page,
    limit,
    skip,
    take,
  };
};

export default getPagination;