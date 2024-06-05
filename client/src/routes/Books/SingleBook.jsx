import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const SingleBook = () => {
  const [data, setData] = useState([]);
  const urlSlug = useParams();
  const baseUrl = `http://localhost:8000/books/${urlSlug.slug}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error("Failed to Fetch Data");
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  function printStars(number){
    var star = ""
    for (let i = 0; i < number; i++){
        star += "⭐"
    }
    return star
  }

  return (
    <div>
      <Link to="/books">🔙 Back to Books</Link>
      
      <div className="bookdetails">
            <div className="col-1">
                <img  src={`http://localhost:8000/uploads/${data.thumbnail}`} alt={data.title}/>
                <Link to={`/editbook/${data.slug}`}>🖊️Edit</Link>
            </div>

            <div className="col-2">
                <h1>{data.title}</h1>
                <p>{data.description}</p>
                <p>Stars: {printStars(data.stars)}</p>

                <p>Category</p>
                <ul>
                    {data?.category?.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
      </div>
    </div>
  );
};

export default SingleBook;
