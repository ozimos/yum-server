const validationErrors = (err, req, res) => {
  if (err.error.isJoi) {
    res.status(400).json({
      type: err.type,
      message: err.error.toString()
    });
  }
};

export default validationErrors;