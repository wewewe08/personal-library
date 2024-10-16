//import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";

function App() {
  /* ListGroup
  let items = ["New York", "London", "San Francisco", "Tokyo", "Paris"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  <ListGroup />
  */
  return (
    <div>
      <Alert>
        Hello World!
        <span className="badge text-bg-primary rounded-pill">1</span>
      </Alert>
    </div>
  );
}

export default App;
