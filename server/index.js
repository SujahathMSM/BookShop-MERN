require('dotenv').config();
const cors = require('cors');
const express = require('express');
const connectionDB = require('./connectDB');
const connectDB = require('./connectDB');
const Book = require('./models/Books');

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

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/",(req, res) => {
    res.send("Hello World");
})

//get all books
app.get("/books", async (req, res) => {
    try {
        await Book.find({}).limit(2)
        .sort({ createdAt: -1 })
        .then((books) => {
            res.json(books);
        })
        .catch((err) => {
            console.log(err.message)
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.get("*", (req, res) => {
    res.sendStatus("404");
})

