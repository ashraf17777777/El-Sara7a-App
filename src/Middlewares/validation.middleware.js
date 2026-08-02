const validation = (schema) => {
  return (req, res, next) => {
    // 🛡️ حماية: لو الـ Schema مش واصلة صح
    if (!schema || typeof schema.validate !== "function") {
      return next(
        new Error("Validation schema is missing or invalid", { cause: 500 }),
      );
    }
    const data = { ...req.body, ...req.params, ...req.query };
    const result = schema.validate(data, { abortEarly: false });
    if (result.error) {
      const messageList = result.error.details.map((x) => x.message);
      return next(new Error(messageList.join(","), { cause: 400 }));
    }
    return next();
  };
};

export default validation;
