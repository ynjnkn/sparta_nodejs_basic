const express = require('express');
const connect = require("./schemas/index")
const app = express();
const port = 3000;

connect();

const goodsRouter = require("./routes/goods");
const cartsRouter = require("./routes/carts");

const requestMiddleware = (req, res, next) => {
    console.log(`Request URL: ${req.originalUrl} - ${new Date()}`);
    next();
};

app.use(express.json());
app.use(requestMiddleware)
app.use("/api", [goodsRouter, cartsRouter]);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`포트 ${port}번으로 서버 실행`);
});

