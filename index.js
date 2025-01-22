require('dotenv').config();
const express = require('express');
const authRouter = require('./route/authRoute');
const app = express();

app.use(express.json());
app.get("/", (req, res) => {
    res.status(200).json({
        status: 'success',
        message:'Wohoo! REST APIs are working successfully',
    })
})

app.use(express.json());

app.use("/api/v1/auth", authRouter)

app.use("*", (req, res, next) => {
    res.status(404).json({
        status:'fail',
        message:'Route not Found'
    })
})

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})