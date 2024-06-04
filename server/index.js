require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectionDB = require("./connectDB");
const connectDB = require("./connectDB");
const Book = require("./models/Books");

const app = express();
const PORT = process.env.PORT || 8000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
})();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

//get all books
app.get("/books", async (req, res) => {
  try {
    const category = req.query.category;

    const filter = {};

    if (category) {
      filter.category = category;
    }
    const data = await Book.find(filter);

    if (!data) {
      throw new Error("An error occurred while fetching books.");
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("*", (req, res) => {
  res.sendStatus("404");
});
