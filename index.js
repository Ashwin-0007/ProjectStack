require('dotenv').config();
const express = require('express');
const authRouter = require('./route/authRoute');
const projectRouter = require('./route/projectRoute'); 
const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
const cors = require("cors");
const globalErrorHandler = require('./controller/errorCotroller');
const app = express();


app.use(
    cors({
      origin: "http://localhost:5173", // Allow frontend requests
      methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
      credentials: true, // Allow cookies and authentication headers
    })
  );
  
app.use(express.json());

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/projects", projectRouter)


app.use("*",
    catchAsync (async(req, res, next) => {
        throw new AppError (`Can't find ${req.originalUrl} on this server`, 404);
    })
);

app.use(globalErrorHandler)

const PORT = process.env.APP_PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})