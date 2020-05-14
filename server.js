require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.APP_PORT;
const userRouter = require('./api/users/user.router.js');
app.use(express.json());

app.use('/api/users', userRouter);
app.listen(port, () => console.log(`your app running at ${port}`));

