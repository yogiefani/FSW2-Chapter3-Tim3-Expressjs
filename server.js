const express = require("express");

const app = express();

const { product } = require("./models");

const PORT = 3000;

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/products", async (req, res) => {
    try {
        const allProduct = await product.findAll();

        res.status(200).json({
            status: true,
            message: "get All Product Successfully!",
            total: allProduct.length,
            data: allProduct,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Can't Fetch from Database",
            error: error.message,
        });
    }
});

app.delete("/api/v1/product/:id", async (req, res) => {
    try {
        const productId = req.params.id
        const deleteProduct = await product.destroy({
            where: {
                id: productId
            }
        })

        if(deleteProduct === 0) {
            return res.status(404).json({
                "status": false,
                "message": "Product Not Found!"
            })
        }

        res.status(200).json({
            status: true,
            "message": "Product Deleted Successfully!",
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Can't Fetch from Database",
            error: error.message,
        });
    }
});

app.use("/", async (req, res) => {
    res.status(200).json({
        status: true,
        message: "Ping Successfully!",
    });
});

// middleware
app.use((req, res, next) => {
    res.status(404).json({
        status: false,
        message: "URL Not Found",
        data: null,
    });
});

app.listen(PORT, () => {
    const url = `http://localhost:${PORT}`;
    console.log(`Click to open:`, url);
});
