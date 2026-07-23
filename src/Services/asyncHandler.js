export const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      // بنشغل الـ Controller بتاعك وباصي له الـ req والـ res والـ next بتوعه
      await fn(req, res, next);
    } catch (error) {
      // لو حصل أي إيرور في أي سطر، بنزحلقه للـ Global Error Handler فوراً
      next(error);
    }
  };
};
