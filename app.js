const express = require('express');
const app = express();
const port = 3000;

const goodsRouter = require("./routes/goods");

const requestMiddleware = (req, res, next) => {
    console.log("Request URL: ", req.originalUrl, " - ", new Date());
    next();
};

app.use(requestMiddleware);

app.use("/api", goodsRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});

