export const globalErrorHandler = (err, req, res, next) => {
  // 1️⃣ بنحدد كود الحالة: لو الإيرور جاي معاه كود (زي 400 أو 404) بناخده، لو مش جاي بنديله 500 (سيرفر إيرور)
  const statusCode = err.statusCode || 500;

  // 2️⃣ بنرد على الـ Postman أو الفرونت إند بشكل موحد ومنظم
  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    // السطر ده صايع جداً: بيظهر الـ stack (مكان الإيرور بالسطر والملف) في البيئة التجريبية بس عشان نصلحه، وبيخفيه في الإنتاج (Production) عشان الأمان
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
