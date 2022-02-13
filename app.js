const express = require('express');
const connect = require("./schemas/index")
const app = express();
const port = 3000;

connect();

const goodsRouter = require("./routes/goods");

const requestMiddleware = (req, res, next) => {
    console.log(`Request URL: ${req.originalUrl} - ${new Date()}`);
    next();
};

app.use(express.static("static"));
app.use(express.json());
app.use(requestMiddleware)
app.use("/api", [goodsRouter]);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`서버 실행 @ ${port}번 포트`);
});

