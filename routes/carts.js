const express = require("express");
const Goods = require("../schemas/goods");
const Carts = require("../schemas/carts");
const router = express.Router();

router.get("/carts", async (req, res) => {
    const carts = await Carts.find()
    const goodsIds = carts.map((cart) => cart.goodsId);
    const goods = await Goods.find({ goodsId: goodsIds });

    res.json({
        carts: carts.map((cart) => ({
            quantity: cart.quantity,
            goods: goods.find((item) => item.goodsId === cart.goodsId)
        })),
    })
});

module.exports = router;