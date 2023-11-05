const getProduct_qr = "SELECT * FROM product";
const getProductById_qr = "SELECT * FROM product WHERE id_product = ($1)";
const addProduct_qr = "INSERT INTO product (id_product, name_product, description) VALUES ($1, $2, $3) RETURNING *";
const updateProduct_qr = "UPDATE product SET name_product = $1, description = $2 WHERE id_product = $3 RETURNING * ";

module.exports = {
    getProduct_qr,
    getProductById_qr,
    addProduct_qr,
    updateProduct_qr,
};