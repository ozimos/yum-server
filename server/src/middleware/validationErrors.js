const validationErrors = (err, req, res, next) => {
  if (err.error.isJoi) {
    res.status(400).json({
      type: err.type,
      message: err.error
    });
  } else next(err);
};

export default validationErrors;