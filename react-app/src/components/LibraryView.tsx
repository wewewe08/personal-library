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

const LibraryView = ({ library, length, setLibrary }: Props) => {
  return (
    <>
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <h1 style={{ margin: "2rem" }}>Library</h1>
            {length === 0 ? (
              <div className="alert alert-danger" role="alert">
                No books registered in library.
              </div>
            ) : (
              <div className="row">
                {/* Book entries go here */}

                {library.map((book) => (
                  <BookEntry
                    key={book.isbn}
                    library={book}
                    setLibrary={setLibrary}
                  />
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
