const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'public')));

// MongoDB connection string
const MONGODB_URI = "mongodb+srv://harshithabhandary03:harshithabhandary2003@cluster0.uru2uku.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=Cluster0";



mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Create 'public/images' directory if it doesn't exist
const imagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Multer storage configuration for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('productImage'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({ image_url: imageUrl });
});





// Schema for creating product
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

// Endpoint for adding product
app.post('/addproduct', async (req, res) => {
  try {
    const { name, image, category, new_price, old_price, available } = req.body;
    if (!name || !image || !category || !new_price || !old_price) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    let products = await Product.find({});
    let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const productDetails = {
      id: id,
      name: name,
      image: image, // Ensure 'image' here is the complete URL from the frontend
      category: category,
      new_price: new_price,
      old_price: old_price,
      date: new Date(),
      available: available !== undefined ? available : true,
    };

    const product = new Product(productDetails);
    await product.save();

    res.json({
      success: true,
      product: productDetails,
    });
  } catch (error) {
    console.error('Error in /addproduct endpoint:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// Endpoint to fetch all products
app.get('/allproduct', async (req, res) => {
  try {
    let products = await Product.find({});
    console.log("All products fetched");
    res.json(products); // Sending JSON response with all products
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Endpoint to remove a product
app.post('/removeproduct', async (req, res) => {
  try {
    const { id } = req.body;
    await Product.findOneAndDelete({ id: id });
    console.log(`Product with ID ${id} removed`);
    res.json({
      success: true,
      message: `Product with ID ${id} removed successfully`,
    });
  } catch (error) {
    console.error('Error removing product:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Endpoint for registering user
app.post('/signup', async (req, res) => {
  try {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({ success: false, error: "Existing user found with the same email address" });
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }
    const user = new Users({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      CartData: cart,
    });

    await user.save();

    const data = {
      user: {
        id: user.id
      }
    };
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
  } catch (error) {
    console.error('Error in /signup endpoint:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// Endpoint for user login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = await Users.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Check password
    const isPasswordValid = (password === user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, error: "Invalid password" });
    }

    // Generate JWT token for user
    const token = jwt.sign({ user: { id: user.id } }, 'secret_ecom');

    // Return success response with token
    res.json({ success: true, token: token });
  } catch (error) {
    console.error('Error in /login endpoint:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// Endpoint for fetching new collection data
app.get('/newcollection', async (req, res) => {
  try {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8); // Adjust as per your new collection logic
    console.log("New Collection Fetched");
    res.send(newcollection);
  } catch (error) {
    console.error('Error fetching new collection:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});








// Server listening
app.listen(port, (error) => {
  if (!error) {
    console.log("Server running at port " + port);
  } else {
    console.log("Error: " + error);
  }
});
