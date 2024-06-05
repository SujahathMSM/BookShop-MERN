import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function singleBook() {
  const [data, setData] = useState([]);
  const urlSlug = useParams();
  const baseUrl = `http://localhost:8000/api/books/${urlSlug.slug}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log(error);
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
     
    <Link to={"/books"}>🔙 Books</Link>

    <div className="bookdetails">
      <div className="col-1">
        <img src={`http://localhost:8000/uploads/${data?.thumbnail}`}
        alt={data?.title} />
        <Link to={`/editbook/${data.slug}`}>Edit</Link>
      </div>

      <div className="col-2">
        <h1>{data?.title}</h1>
        <p>{data?.description}</p>
        <p>{printStars(data.stars)} </p>

        <p>Category</p>
        <ul>
          {data?.category?.map((item, index)=> (
            <li key={index}>{item}</li>
          ))}
        </ul>






      </div>

    </div>








    </div>
  );
}

export default singleBook;
