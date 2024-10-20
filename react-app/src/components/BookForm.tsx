import axios from "axios";
import React, { useEffect, useState } from "react";

interface Props {
  setLibrary: (
    library: {
      isbn: string;
      genre: string;
      title: string;
      author: string;
      status: boolean;
    }[]
  ) => void;
}

function BookForm({ setLibrary }: Props) {
  const [isbn, setIsbn] = useState("");
  const [genre, setGenre] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isRead, setIsRead] = useState(false);

  const checkISBN = () => {
    if (!isbn) {
      alert("ISBN is required");
      return false;
    } else if (!/^\d+$/.test(isbn)) {
      alert("ISBN must be numeric");
      return false;
    } else if (isbn.length !== 10 && isbn.length !== 13) {
      alert("ISBN must be either 10 or 13 digits long");
      return false;
    }

    return true;
  };

  const isbnExists = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/library/${isbn}`);
      console.log(res.data);
      alert("You already have a book registered with this ISBN!");
      return false;
    } catch (error) {
      // need a better way to check if error is a 404 not found
      return true;
    }
  };

  const addLibraryHandler = async () => {
    const isValidISBN = checkISBN();
    if (!isValidISBN) {
      return;
    }

    if (
      typeof genre !== "string" ||
      typeof title !== "string" ||
      typeof author !== "string" ||
      !genre ||
      !title ||
      !author
    ) {
      alert("Please ensure all fields are filled out correctly.");
      return;
    }

    if ((await isbnExists()) === false) {
      return;
    }

    const bookData = {
      isbn: isbn,
      genre: genre,
      title: title,
      author: author,
      status: isRead,
    };

    try {
      console.log("Sending book data:", bookData);
      await axios.post("http://localhost:8000/api/library", bookData);
      alert("Book added successfully!");
      const libraryElement = document.getElementById("library");
      if (libraryElement) {
        libraryElement.scrollIntoView({ behavior: "smooth" });
      } else {
        console.log("error");
      }
      await axios.get("http://localhost:8000/api/library").then((res) => {
        setLibrary(res.data);
      });
      setIsbn("");
      setGenre("");
      setTitle("");
      setAuthor("");
      setIsRead(false);
    } catch (error) {
      console.error("There was an error adding the book:", error);
      alert("Error adding the book. Please try again.");
    }
  };

  return (
    <>
      <div
        className="container justify-content-center align-items-center mt-4"
        style={{ display: "flex" }}
      >
        <form
          className="row"
          style={{ width: "30rem" }}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="col-12 ">
            <label htmlFor="inputISBN" className="form-label">
              ISBN
            </label>
            <input
              type="text"
              className="form-control"
              id="inputISBN"
              placeholder="ex: 9780156012195"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputGenre" className="form-label">
              Genre
            </label>
            <input
              type="text"
              className="form-control"
              id="inputGenre"
              placeholder="ex: science fiction"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputTitle4" className="form-label">
              Title
            </label>
            <input
              type="title"
              className="form-control"
              id="inputTitle4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputAuthor4" className="form-label">
              Author
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAuthor4"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="gridCheck"
                checked={isRead}
                onChange={(e) => setIsRead(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="gridCheck">
                Mark as read
              </label>
            </div>
          </div>
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={addLibraryHandler}
            >
              Add book
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default BookForm;
