import { useState, useEffect } from "react";
import axios from "axios";
import LibraryView from "./LibraryView";
import NavBar from "./NavBar";
import Intro from "./Intro";

function LibraryManager() {
  const [library, setLibrary] = useState<
    {
      isbn: string;
      genre: string;
      title: string;
      author: string;
      status: boolean;
    }[]
  >([]);

  useEffect(() => {
    const loadLibrary = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/library");
        setLibrary(res.data);
      } catch (error) {
        console.error("Error fetching library:", error);
      }
    };

    loadLibrary();
  }, []);
  return (
    <div>
      <NavBar setLibrary={setLibrary} />
      <Intro />
      <LibraryView
        library={library}
        length={library.length}
        setLibrary={setLibrary}
      />
    </div>
  );
}

export default LibraryManager;
