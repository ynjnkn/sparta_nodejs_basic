const express = require('express');
const Goods = require("../schemas/goods");
const Cart = require("../schemas/carts");
const router = express.Router();

// ???
router.get('/', (req, res) => {
    res.send('This is root page');
});



// 상품 목록 조회 API
router.get('/goods', async (req, res) => {
    const { category } = req.query;

    const goods = await Goods.find({ category });

    res.json({
        goods,
    });
});



// 장바구니 목록 조회 API
router.get("/goods/cart", async (req, res) => {
    const carts = await Cart.find();
    const goodsIds = carts.map((cart) => cart.goodsId);

    const goods = await Goods.find({ goodsId: goodsIds });

    res.json({
        cart: carts.map((cart) => ({
            quantity: cart.quantity,
            goods: goods.find((item) => item.goodsId === cart.goodsId),
        })),
    });
});



// 상품 상세 조회 API
router.get('/goods/:goodsId', async (req, res) => {
    const { goodsId } = req.params;

    // filter returns an array
    // [detail] => destructuring assignment of the first or only item of the filtered array
    const [goods] = await Goods.find({ goodsId: Number(goodsId) });

    res.json({
        goods,
    });
});



// 상품 추가 API
router.post("/goods", async (req, res) => {
    const { goodsId, name, thumbnailUrl, category, price } = req.body;

    const goods = await Goods.find({ goodsId });

    if (goods.length) {
        return res
            .status(400)
            .json({ success: false, errorMessage: "이미 있는 데이터입니다." });
    }

    const createdGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price });

    res.json({ goods: createdGoods });
});



// 장바구니 추가 API
// router.post('/goods/:goodsId/cart', async (req, res) => {
//     const { goodsId } = req.params;
//     const { quantity } = req.body;

//     const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
//     if (existsCarts.length) {
//         return res
//             .status(400)
//             .json({ success: false, errorMessage: "이미 장바구니에 들어있는 상품입니다." });
//     }

//     await Cart.create({ goodsId: Number(goodsId), quantity });
//     res.json({ success: true });
// });


// 장바구니 수정 API
router.put('/goods/:goodsId/cart', async (req, res) => {
    const { goodsId } = req.params;
    const { quantity } = req.body;

    const existsCarts = await Cart.find({ goodsId: Number(goodsId) });

    // 추가한 상품이 장바구니에 없다면
    if (!existsCarts.length) {
        // 장바구니에 해당 상품 추가
        await Cart.create({ goodsId: Number(goodsId), quantity });
    }
    // 추가한 상품이 장바구니에 있다면
    else {
        // 장바구니에 있는 해당 상품 수량 수정
        await Cart.updateOne({ goodsId: Number(goodsId) }, { $set: { quantity } });
    }

    res.json({ success: true });
});



// 장바구니 비우기 API
router.delete('/goods/:goodsId/cart', async (req, res) => {
    const { goodsId } = req.params;
    const existsCarts = await Cart.find({ goodsId });
    if (existsCarts.length) {
        await Cart.deleteOne({ goodsId: Number(goodsId) });
    }
    res.json({ success: true });
});



module.exports = router;