const validation = (schema) => {
  return (req, res, next) => {
    const data = { ...req.body, ...req.params, ...req.query };
    const result = schema.validate(data, { abortEarly: false });
    if (result.error) {
      const messageList = result.error.details.map((x) => x.message);
      return next(new Error(messageList, { cause: 400 }));
    }
    return next();
  };
};

export default validation;
