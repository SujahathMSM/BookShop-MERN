import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home/Home";
import Book from "./routes/Books/Book";
import About from "./routes/About/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/books" element={<Book />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
