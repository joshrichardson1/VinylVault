import { useState, useEffect } from "react"
import { Button } from "react-bootstrap";
import VinylAPI from "../api/VinylAPI"
import SearchForm from "../forms/SearchForm";
import VinylList from "../components/VinylList/VinylList"
import "../styles/styles.css"

const MyCollectionPage = () => {

  // states
  const [vinyls, setVinyls] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [toggleViewList, setToggleViewList] = useState(true);
  const user = JSON.parse(window.localStorage.getItem("user"));

  // effects
  useEffect(() => {
    const getVinyls = async () => {
      const data = await VinylAPI.fetchVinyls(user.email);
      if (data) {
        setVinyls(data[0].vinyls);
      }
    };
    getVinyls();
  }, [user.email]);

  // render
  return (
    <div>
      <div id="collectionHeader" className="p-4">
        {!showSearch && (
          <Button
            variant="secondary"
            onClick={() => setShowSearch(!showSearch)}
          >
            Search for Vinyl
          </Button>
        )}
        <Button
          variant="secondary"
          className="m-2"
          onClick={() => setToggleViewList(!toggleViewList)}
        >
          {toggleViewList ? "Toggle Slide View" : "Toggle List View"}
        </Button>
        {showSearch && (
          <SearchForm vinyls={vinyls} setShowSearch={setShowSearch} />
        )}
      </div>
        <VinylList vinyls={vinyls} view={toggleViewList} />
    </div>
  );
}

export default MyCollectionPage