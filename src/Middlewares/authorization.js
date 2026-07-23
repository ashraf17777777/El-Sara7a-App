export const authorization = (...roles) => {
  return (req, res, next) => {
    // 1️⃣ طباعة البيانات في الـ Console للتأكد والـ Debugging
    console.log(
      "Logged In User:",
      req.user,
      "Allowed Roles for this route:",
      roles,
    );

    // 2️⃣ التشييك على الصلاحية: هل دور اليوزر مِش موجود ضمن الأدوار المسموح لها؟
    if (!roles.includes(req.user.role)) {
      return next(
        new Error("You are not authorized to access this route", {
          cause: 403,
        }),
      );
    }

    // 3️⃣ لو دور اليوزر موجود ومسموح له.. عدي وروح للي بعده!
    next();
  };
};

export default authorization;
