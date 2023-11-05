    const queries = require("./queries");
    const pool = require("../../db");

    const addProduct = async (req,res) => {
        try {
            console.log(req.body);
            const reqAddBody = req.body;
            const newTodo = await pool
                .query(queries.addProduct_qr, [reqAddBody.id_product, reqAddBody.name_product, reqAddBody.description]);

            res.json(newTodo.rows[0]);
        } catch (error) {
            console.log(error.message);
        }
    };

    const getProduct = async (req,res) => {
        try {
            const listProduct = await pool.query(queries.getProduct_qr);
            res.json(listProduct.rows);
        } catch (error) {
            console.log(error.message);
        }
    };

    const getProductById = async (req,res) => {
        try {
            const {id} = req.params;
            const product = await pool.query(queries.getProductById_qr,[id]);
            res.json(product.rows);
        } catch (error) {
            console.log(error);
        }
    };

    const updateProduct = async (req,res) => {
        try {
            console.log(req.body);
            const {id} = req.params;
            const reqUpdateBody = req.body;
            const productUpdate = await pool.query(queries.updateProduct_qr, [reqUpdateBody.name_product, reqUpdateBody.description, id]);
            res.json(productUpdate.rows);
        } catch (error) {
            console.log(error);
        }
    };

    module.exports = {
        addProduct,
        getProduct,
        getProductById,
        updateProduct
    }