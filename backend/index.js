const express = require("express");
const app = express();
const cors = require("cors");
const productRouter = require("./src/product/router");


const PORT = 5000;


// middleware for api 
app.use(cors());
app.use(express.json());

// API
app.use('/api/v1/product',productRouter);

app.listen(PORT, () => {
    console.log(`server has started on port ${PORT} \n with link : http://localhost:${PORT}/`);
})