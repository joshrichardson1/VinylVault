import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DiscogsAPI from '../api/DiscogsAPI'
import DisplaySearch from '../components/DisplaySearch/DisplaySearch'

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const { artist, album } = useParams();

  useEffect(() => {
    const getResults = async () => {
        const data = await DiscogsAPI.fetchByArtistAndAlbum(artist, album);
        if (data) {
          setResults(data.results);
      }
    }
    getResults()
  }, [])

  return (
    <div>
      <div id="searchHeader" className="p-5">
      <h2>Results for {artist} - {album} </h2>
        <hr />
      </div>
      <div>
        <DisplaySearch results={results} />
      </div>
    </div>
  );
}

export default SearchPage
