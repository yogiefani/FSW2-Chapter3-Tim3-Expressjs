const express = require("express");

const app = express();

const { product } = require("./models");
const { category } = require("./models");

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

app.post("/api/v1/product/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const { name, price, stock } = req.body;

        if (!name || !price || !stock) {
            return res.status(400).json({
                status: false,
                message: "Name, Price, and Stock are required!"
            });
        }

        const newProduct = await product.create({
            name,
            price,
            stock
        });

        // Respond with success
        res.status(201).json({
            status: true,
            message: "Product Created Successfully!",
            data: newProduct,
        });
    } catch (error) {
        // Handle any errors
        return res.status(500).json({
            status: false,
            message: "Failed to create product",
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

        res.status(200).json({
            status: true,
            "message": "Product Deleted Successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Can't Fetch from Database",
            error: error.message,
        });
    }
});

app.delete("/api/v1/categories/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const categoryToDelete = await category.findByPk(id);

    if (!categoryToDelete) {
      return res.status(404).json({
        status: "Failed",
        message: "Category not found!",
        isSuccess: false,
      });
    }

    await categoryToDelete.destroy();

    return res.status(204).json({
      status: "Success",
      message: "Category deleted successfully!",
      isSuccess: true,
      data: null, 
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: "Failed to delete category data!",
      isSuccess: false,
      error: error.message,
    });
  }
});

app.patch("/api/v1/categories/:id", async(req,res)=>{
    const id = req.params.id;
    
    try {
        const categoryToUpdate = await category.findByPk(id);

        // if category not found
        if (!categoryToUpdate) {
            return res.status(404).json({
                status: "Failed",
                message: "Category not found!",
                isSuccess: false,
            });
        }

        // object destructuring
        const { category_name, description } = req.body;

        // update category
        await categoryToUpdate.update({
            category_name: category_name || categoryToUpdate.category_name,
            description: description || categoryToUpdate.description
        });

        return res.status(200).json({
            status: "Success",
            message: "Category updated successfully!",
            isSuccess: true,
            data: categoryToUpdate, // Mengembalikan data kategori yang telah diupdate
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: "Failed to update category!",
            isSuccess: false,
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
