import VinylAPI from '../api/VinylAPI'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, ListGroupItem, Container, Col, Row } from 'react-bootstrap';
import LastFmAPI from '../api/LastFmAPI';
import UpcomingEvents from '../components/UpcomingEvents/UpcomingEvents';
import Loading from '../components/Loading/Loading';


const VinylDetailPage = (props) => {

  const [vinylDetails, setVinylDetails] = useState({});
  const [events, setEvents] = useState([]);
  const [showEvents, setShowEvents] = useState(false);
  const [trackList, setTracklist] = useState();
  const { artist, album, vinylID } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const showOrClose = showEvents ? 'Close Upcoming Events' : 'View Upcoming Events'; 
 
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    const getVinylDetails = async () => {
      const data = await VinylAPI.getVinylDetails(vinylID);
      if (data) {
        setVinylDetails(data[0]);
      }
    };  
    const getTracks = async () => {
      if (vinylDetails) {
        const data = await LastFmAPI(artist, album);
        if (data.album.tracks) {
          setTracklist(data);
        } else {
          console.log('no data')
        }
      }
    };
    getVinylDetails();
    getTracks();
  }, []);

  const displayTracks = () => {
    if (trackList) {
      return trackList.album.tracks.track.map((track, index) => (
        <ListGroupItem key={track.id} id="trackListCard" className="">{track.name}</ListGroupItem>
      ));
    } else {
      return <h4 className="pt-5 mt-5" id="noTrackList">Oops! We could not locate a tracklist!</h4>
    }
  }

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
      <div id="vinylDetailBody">
        {!showEvents && (
          <div className="pb-5">
            <div id="detailHeader" className="p-4">
              <h2 className="pt-3">
                {vinylDetails.artist} - {vinylDetails.album}
              </h2>
            </div>
            <Container id="vinylDetails">
              <Row>
                <Col xs={3} className="pt-5">
                  <h2 className="p-2 mb-2">
                    <u>Artist:</u>
                  </h2>
                  <p>
                    <b>{vinylDetails.artist}</b>
                  </p>
                  <h2 className="p-2 mb-2">
                    <u>Album:</u>
                  </h2>
                  <p>
                    <b>{vinylDetails.album}</b>
                  </p>
                  <h2 className="p-2 mb-2">
                    <u>Genre:</u>
                  </h2>
                  <p>
                    <b>{vinylDetails.genre}</b>
                  </p>
                  <h2 className="p-2 mb-2">
                    <u>Release Year:</u>
                  </h2>
                  <p>
                    <b>{vinylDetails.year}</b>
                  </p>
                  <h2 className="p-2 mb-2">
                    <u>Added On:</u>
                  </h2>
                  <p>
                    <b>{vinylDetails.created_at}</b>
                  </p>
                </Col>
                <Col xs={6} className="pt-3">
                  <Card className="mt-4">
                    <Card.Img
                      variant="top"
                      src={vinylDetails.image}
                      height={500}
                    />
                    <Card.Text id="vinylDetailButtons">
                      <Button
                        className="m-2"
                        variant="primary"
                        id={vinylDetails.id}
                        onClick={() => navigate("/home/my-collection/")}
                      >
                        Back to Vinyls
                      </Button>
                      <Button
                        className="m-2"
                        variant="success"
                        onClick={() => setShowEvents(true)}
                      >
                        Show Events
                      </Button>
                    </Card.Text>
                  </Card>
                </Col>
                <Col xs={3} className="">
                  <h2 className="pt-4 mb-0" id="trackListHeader">
                    Tracklist:{" "}
                  </h2>
                  {displayTracks()}
                </Col>
              </Row>
            </Container>
            <br></br>
            <br></br>
          </div>
        )}
        {showEvents && (
          <div id="eventDetailBody">
            <UpcomingEvents
              artist={vinylDetails.artist}
              setShowEvents={setShowEvents}
            />
          </div>
        )}
          </div>
      )}
    </div>
  );
};

export default VinylDetailPage;





     