import React from 'react';
import { useState, useEffect } from 'react';
import VinylAPI from '../api/VinylAPI';
import BitAPI from '../api/BitAPI';
import AllEvents from '../components/AllEvents/AllEvents';

const AllEventsPage = (props) => {

  const [allEvents, setAllEvents] = useState([]);
  const [allArtist, setAllArtist] = useState([]);
  const user = JSON.parse(window.localStorage.getItem("user"));

  const getAllEvents = async (artistArray) => {
    let eventsArr = [];
    const data = await Promise.all(
      artistArray.map(async (artist) => {
        const res = await BitAPI(artist);
        if (res.length > 0) {
          let currentArtist = res[0].lineup[0];
          eventsArr.push(res);
        }
      })
    );
    if (eventsArr.length > 0) {
      setAllEvents(eventsArr);
    }
  };
  
  useEffect(() => {
    const getArtists = async () => {
      const data = await VinylAPI.fetchVinyls(user.email);
      const artists = [];
      if (data) {
        data[0].vinyls.map((vinyl) => {
          artists.push(vinyl.artist);
        });
        let artistSet = [...new Set(artists)];
        setAllArtist(artistSet);
        getAllEvents(artistSet);   
      };
    };
    getArtists();
  }, []);
 
  return (
    <div>
      <h3>AllEventsPage</h3>
      <AllEvents allEvents={allEvents} />
    </div>
    
  )
};

export default AllEventsPage;
