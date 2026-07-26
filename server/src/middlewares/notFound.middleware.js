const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: `Route ${req.originalUrl} not found`,
    errors: [],
    data: null,
  });
};

export default notFoundHandler;