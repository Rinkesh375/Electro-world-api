const express = require("express");
const productRouter = express.Router();
const Product = require("../models/productModel");


productRouter.get("/", async (req, resp) => {
    try {
        let { category, brand, _page, _limit, _order, _sort, minPrice, maxPrice } = req.query;
        const filters = {};
        const sortDb = {};
        
        category && (filters.category = category);
        brand && (filters.brand= { $in: brand })
        minPrice && maxPrice && (filters.$and = [{ offer_price: { $gte: minPrice , $lte: maxPrice } }])
        _sort && _order && (sortDb[_sort] = _order === "asc" ? 1 : -1)
        if (_page >= 1) {
            const limit = +_limit;
            const page = +_page
            const totalCount = await Product.find(filters).count();
            const totalPages = Math.ceil(totalCount / limit);
            const product = await Product.find(filters).skip((page - 1) * limit).limit(limit).sort(sortDb)
            resp.status(200).send({ product, totalPages, page })
        }
        else {
            const product = await Product.find(filters).sort(sortDb);
            resp.status(200).send(product)

        }

    } catch (error) {
        resp.status(500).send({ error })
    }
})


module.exports = productRouter