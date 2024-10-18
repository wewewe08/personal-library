import axios from "axios";

interface Props {
  library: {
    isbn: string;
    genre: string;
    title: string;
    author: string;
    status: boolean;
  };
}

function BookEntry(props: Props) {
  const deleteBook = async (isbn: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/library/${isbn}`);
      alert("Book deleted successfully!");

      const res = await axios.get("http://localhost:8000/api/library");
      setLibrary(res.data);
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Error deleting the book. Please try again.");
    }
  };
  return (
    <>
      <div className="col-4" id="book-entries">
        <div className="card" style={{ width: "18rem" }}>
          <img src="..." className="card-img-top" alt="..." />
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
              {props.library.status ? "Book read" : "Book is unread"}
            </span>
            <h2 className="book-title" style={{ marginRight: "10px" }}>
              {props.library.title}
            </h2>
            <h6 className="book-author" style={{ fontStyle: "italic" }}>
              {props.library.author}
            </h6>
            <hr
              className="hr hr-blurry"
              style={{ width: "10rem", height: "0.1rem" }}
            />
            <h6>Genre: {props.library.genre}</h6>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                type="button"
                className="btn btn-success"
                style={{
                  width: "5rem",
                  height: "2rem",
                  marginRight: "1rem",
                  lineHeight: "1rem",
                }}
              >
                Read
              </button>
              <button
                type="button"
                className="btn btn-danger"
                style={{
                  width: "5rem",
                  height: "2rem",
                  lineHeight: "1rem",
                }}
                onClick={() => deleteBook(props.library.isbn)}
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
