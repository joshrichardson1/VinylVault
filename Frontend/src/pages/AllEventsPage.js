import React from 'react';
import { useState, useEffect } from 'react';
import VinylAPI from '../api/VinylAPI';
import BitAPI from '../api/BitAPI';
import AllEvents from '../components/AllEvents/AllEvents';

const AllEventsPage = (props) => {

  // state
  const [allEvents, setAllEvents] = useState([]);
  const user = JSON.parse(window.localStorage.getItem("user"));

  // retrieves all events for all artist 
  const getAllEvents = async (artistArray) => {
    let eventsArr = [];
    const data = await Promise.all(
      artistArray.map(async (artist) => {
        const res = await BitAPI(artist);
        if (res.length > 0) {
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
        getAllEvents(artistSet);   
      };
    };
    getArtists();
  }, []);
 
  return (
    <div>
      <h3 id="allEventsHeader" className="p-5 mb-1">All Upcoming Events</h3>
      <AllEvents allEvents={allEvents} />
    </div>
    
  )
};

export default AllEventsPage;
