const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const userRouter = require("./app/routes/user.route");
const adminRouter = require("./app/routes/admin.route");
const menuRouter = require("./app/routes/menu.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Restaurant." });
});

// Xử lý user
app.use("/api/user", userRouter);
// Xử lý admin
app.use("/api/admin", adminRouter);

//Xử lý menu 
app.use("/api/menu", menuRouter);

app.use("/static", express.static('app/uploads/'));
// handle 404 response
app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route được định nghĩa nào
    // khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, "Resource not found"));
});
// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    // Middleware xử lý lỗi tập trung.
    // Trong các đoạn code xử lý ở các route, gọi next(error)
    // sẽ chuyển về middleware xử lý lỗi này
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});


module.exports = app;