import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [books, setBook] = useState([{}]);

  useEffect(() => {
    setInterval(() => {
      fetch("/api/books")
        .then((response) => response.json())
        .then((data) => {
          setBook(data);
        });
    }, 2000);
  }, []);

  const addBook = () => {
    const title = prompt("Enter Your Book Title");
    const author = prompt("Enter Your Book Author");


    fetch("api/add", {
      method: "POST",
      body: JSON.stringify({ title, author }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  if (!books.length) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="App">
      <h1>Available Books</h1>
      <table border="1" width="500">
        <thead>
          <th>Books Title</th>
          <th>Author</th>
        </thead>
        <tbody>
          {books.map((bookObj, index) => {
            return (
              <tr key={index}>
                <td>{bookObj.title}</td>
                <td>{bookObj.author}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={addBook}>Add Book</button>
    </div>
  );
}

export default App;
