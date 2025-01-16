const express = require('express');
const authRouter = require('./route/authRoute');
const app = express();


app.get("/", (req, res) => {
    res.status(200).json({
        status: 'success',
        message:'Wohoo! REST APIs are working successfully',
    })
})

app.use(express.json()); 

app.use("/api/v1/auth", authRouter)

app.listen("3000", () => {
    console.log('Server is running on port 3000');
})