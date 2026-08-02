export const authorization = (...roles) => {
  return (req, res, next) => {
    // 2️⃣ التأكد من وجود req.user والتشييك على الدور (Role)
    if (!req.user?.role || !roles.includes(req.user.role)) {
      return next(
        new Error("You are not authorized to access this route", {
          cause: 403,
        }),
      );
    }

    // 3️⃣ كل حاجة تمام.. كمل للـ Controller!
    next();
  };
};

export default authorization;
