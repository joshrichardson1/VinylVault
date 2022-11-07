import { React, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import DiscogsAPI from "../api/DiscogsAPI";
import DisplaySearch from "../components/DisplaySearch/DisplaySearch";

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const { artist, album } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const getResults = async () => {
      const data = await DiscogsAPI.fetchByArtistAndAlbum(artist, album);
      if (data) {
        setResults(data.results);
      }
    };
    getResults();
  }, []);

  return (
    <div>
      <div id="searchHeader" className="p-5">
        <h2>
          Results for {artist} - {album} -{" "}
          <Button
            id="backToVinyls"
            variant="secondary"
            onClick={() => navigate("/home/my-collection/")}
          >
            Back to Vinyls
          </Button>
        </h2>
      </div>
      <div>
        <DisplaySearch results={results} />
      </div>
    </div>
  );
};

export default SearchPage;
