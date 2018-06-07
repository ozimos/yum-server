const validationErrors = (err, req, res, next) => {
  if (err.error && err.error.isJoi) {
    if (err.error.details[0].context.key === 'password') {
      return res.status(400).json({
        message: { password: 'passwords do not match' }
      });
    }
    res.status(400).json({
      message: err.error
    });
  } else next(err);
};

export default validationErrors;