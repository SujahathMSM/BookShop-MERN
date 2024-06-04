import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Book = () => {
  const baseUrl = "http://localhost:8000/books";
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {

        let url = baseUrl;
        if (selectedCategory){
            // console.log(selectedCategory)
            url+= `?category=${selectedCategory}`;
            // console.log(url)
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to Fetch Data");
        }

        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setError("Error fetching data. Try again later.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);
  return (
    <div>
      <h1>Here you can see the Available with us</h1>
      {/* {to view all the books in JSON format} */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

      <div className="filters">
        <label>Categories</label>
        <select onChange={(e) => setSelectedCategory(e.target.value) }>
          <option value="">All</option>
          <option value="romance">Romance</option>
          <option value="science">Science</option>
          <option value="adventure">Adventure</option>
          <option value="crime">Crime</option>
          <option value="fiction">Fiction</option>
          <option value="thriller">Thriller</option>
          <option value="other">Other</option>
        </select>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="books">
          {data.map((book) => {
            return (
              <li key={book._id}>
                <Link to={`/books/${book.slug}`}>
                  <img
                    src={`http://localhost:8000/uploads/${book.thumbnail}`}
                    alt={book.title}
                  />
                  <h3>{book.title}</h3>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Book;
