import axios from "axios";
import bookCoverTemplate from "../assets/the-little-prince-cover.svg";

interface Props {
  library: {
    isbn: string;
    genre: string;
    title: string;
    author: string;
    status: boolean;
  };
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

function BookEntry({ library, setLibrary }: Props) {
  const deleteBook = async (isbn: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/library/${isbn}`);
      const res = await axios.get("http://localhost:8000/api/library");
      setLibrary(res.data);
      alert(`Book with ISBN ${isbn} deleted successfully!`);
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Error deleting the book. Please try again.");
    }
  };

  const updateBook = async (isbn: string) => {
    try {
      await axios.put(`http://localhost:8000/api/library/${isbn}`, null, {
        params: {
          status: true,
        },
      });
      await axios.get("http://localhost:8000/api/library").then((res) => {
        setLibrary(res.data);
      });
      alert(`Book with ISBN ${isbn} has been updated!`);
    } catch (error) {
      console.error("Error updating book: ", error);
    }
  };
  return (
    <>
      <div className="col-4" id="book-entries">
        <div className="card" style={{ width: "18rem" }}>
          <img src={bookCoverTemplate} className="card-img-top" alt="..." />
          <div
            className="card-body"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <span className="badge text-bg-primary mb-2">
              {library.status ? "Book read" : "Book is unread"}
            </span>
            <h2 className="book-title" style={{ marginRight: "10px" }}>
              {library.title}
            </h2>
            <h6 className="book-author" style={{ fontStyle: "italic" }}>
              {library.author}
            </h6>
            <hr
              className="hr hr-blurry"
              style={{ width: "10rem", height: "0.1rem" }}
            />
            <h6>Genre: {library.genre}</h6>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {library.status === false ? (
                <button
                  type="button"
                  className="btn btn-success"
                  style={{
                    width: "5rem",
                    height: "2rem",
                    marginRight: "1rem",
                    lineHeight: "1rem",
                  }}
                  onClick={() => updateBook(library.isbn)}
                >
                  Read
                </button>
              ) : null}
              <button
                type="button"
                className="btn btn-danger"
                style={{
                  width: "5rem",
                  height: "2rem",
                  lineHeight: "1rem",
                }}
                onClick={() => deleteBook(library.isbn)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookEntry;
