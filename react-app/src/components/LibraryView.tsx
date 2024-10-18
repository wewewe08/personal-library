import BookEntry from "./BookEntry";

interface Props {
  library: {
    isbn: string;
    genre: string;
    title: string;
    author: string;
    status: boolean;
  }[];
  length: number;
}

const LibraryView = (props: Props) => {
  return (
    <>
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <h1 style={{ margin: "2rem" }}>Library</h1>
            {props.length === 0 ? (
              <div className="alert alert-danger" role="alert">
                No books registered in library.
              </div>
            ) : (
              <div className="row">
                {/* Book entries go here */}
                {props.library.map((book) => (
                  <BookEntry key={book.isbn} library={book} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LibraryView;
