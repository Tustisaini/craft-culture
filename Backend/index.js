const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const port = 4000;

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ✅ MongoDB Connection
mongoose.connect("mongodb+srv://tustisaini2004:tusti123saini@cluster0.0ohijmj.mongodb.net/craft_culture")
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Image Upload Setup
const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });
app.use("/images", express.static("upload/images"));

// ✅ Product Schema
const ProductSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true }
}, { versionKey: false });

const Product = mongoose.model("Product", ProductSchema);

// ✅ User Schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    date: { type: Date, default: Date.now }
});
const Users = mongoose.model("Users", UserSchema);

// ✅ Auth Middleware
const fetchUser = async (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send({ errors: "Please authenticate using a valid token" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const data = jwt.verify(token, "secret_ecom");
        req.user = data; // { id: "..." }
        next();
    } catch (error) {
        return res.status(401).send({ errors: "Invalid or expired token" });
    }
};


// ✅ Routes

app.get("/", (req, res) => {
    res.send("🚀 Express app is running");
});

// Upload Product Image
app.post("/upload", upload.single("product"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: "No file uploaded" });
    }

    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Add Product
app.post("/addproduct", async (req, res) => {
    try {
        let products = await Product.find({});
        let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        const product = new Product({
            id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price
        });

        await product.save();
        res.json({ success: true, message: "Product added successfully", product });
    } catch (error) {
        console.error("❌ Error Saving Product:", error);
        res.status(400).json({ success: false, message: "Error saving product", error });
    }
});

// Remove Product
app.post("/removeproduct", async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({ id: req.body.id });

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product removed successfully", deletedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
});

// Get All Products
app.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching products", error });
    }
});

app.get("/allproducts", async (req, res) => {
    let products = await Product.find({});
    console.log("📦 All Products Fetched");
    res.send(products);
});

// Signup
app.post("/signup", async (req, res) => {
    try {
        let existingUser = await Users.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Empty cart init
        let cart = {};
        for (let i = 0; i < 300; i++) cart[i] = 0;

        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart
        });

        await user.save();

        const token = jwt.sign({ id: user.id }, "secret_ecom", { expiresIn: "1h" });
        res.json({ success: true, token });

    } catch (error) {
        console.error("❌ Signup Error:", error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
});

// ✅ FIXED Login — unified token format
app.post("/login", async (req, res) => {
    try {
        let user = await Users.findOne({ email: req.body.email });

        if (!user) {
            return res.json({ success: false, errors: "Wrong Email Id" });
        }

        if (req.body.password !== user.password) {
            return res.json({ success: false, errors: "Wrong Password" });
        }

        const token = jwt.sign({ id: user.id }, "secret_ecom", { expiresIn: "1h" });
        res.json({ success: true, token });

    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
});

// New Collection
app.get("/newcollections", async (req, res) => {
    try {
        let products = await Product.find({});
        let newCollection = products.slice(-8);
        console.log("New collection fetched");
        res.send(newCollection);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// Popular in Pottery & Ceramics
app.get("/popularinPottery&Ceramics", async (req, res) => {
    let products = await Product.find({ category: "Pottery & Ceramics" });
    let popular_in_pottery = products.slice(0, 4);
    console.log("Popular in Pottery & Ceramics fetched");
    res.send(popular_in_pottery);
});

// Add to Cart
app.post('/addtocart', fetchUser, async (req, res) => {
    try {
        let userData = await Users.findOne({ _id: req.user.id });
        userData.cartData[req.body.itemId] += 1;

        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });

        res.json({ success: true, message: "Item added to cart" });
    } catch (error) {
        console.error("❌ Error in /addtocart:", error);
        res.status(500).json({ success: false, message: "Failed to add to cart", error });
    }
});

// Remove from Cart
app.post('/removefromcart', fetchUser, async (req, res) => {
    try {
        let userData = await Users.findOne({ _id: req.user.id });

        if (userData.cartData[req.body.itemId] && userData.cartData[req.body.itemId] > 0) {
            userData.cartData[req.body.itemId] -= 1;
            await Users.findOneAndUpdate(
                { _id: req.user.id },
                { cartData: userData.cartData }
            );
        }

        res.json({ success: true, message: "Item removed from cart" });
    } catch (error) {
        console.error("❌ Error removing from cart:", error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
});
//creating endpoint to get cartdata

app.post("/getcart",fetchUser,async(req,res)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})
// Start Server
app.listen(port, (error) => {
    if (!error) {
        console.log(`🚀 Server running on port: ${port}`);
    } else {
        console.error("❌ Server Error:", error);
    }
});
