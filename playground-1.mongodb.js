// 1. بنقول لمونجو: ادخل على الداتابيز دي (لو مش موجودة، كريتها)
use("blog_app_mongo");

// 2. بنعمل أول جدول ونرمي فيه يوزر تجريبي عشان الداتابيز تثبت وتظهر
db.users.insertOne({
  firstName: "Ashraf",
  email: "ashraf@gmail.com",
});
