import React from 'react'
import { useState } from 'react'
import UpcomingEvents from '../UpcomingEvents/UpcomingEvents';
import { Carousel, CarouselItem, Row, Col, Button } from 'react-bootstrap';

const VinylCarousel = (props) => {

  // state
  const [activeVinyl, setActiveVinyl] = useState(props.vinyls[0]);
  const [showEvents, setShowEvents] = useState(false);

  // sets active vinyl
  const handleSelect = (selectedVinyl) => {
    setActiveVinyl(props.vinyls[selectedVinyl]);
  }

  return (
    <div id="carouselMain">
      {!showEvents && (
        <div className="mb-5 pb-5">
          <Row>
            <Col xs={3} className="pt-5">
              <h2 className="p-2 mb-2">
                <u>Artist:</u>
              </h2>
              <p>
                <b>{activeVinyl.artist}</b>
              </p>
              <h2 className="p-2 mb-2">
                <u>Album:</u>
              </h2>
              <p>
                <b>{activeVinyl.album}</b>
              </p>
              <h2 className="p-2 mb-2">
                <u>Genre:</u>
              </h2>
              <p>
                <b>{activeVinyl.genre}</b>
              </p>
              <h2 className="p-2 mb-2">
                <u>Release Year:</u>
              </h2>
              <p>
                <b>{activeVinyl.year}</b>
              </p>
              <h2 className="p-2 mb-2">
                <u>Added On:</u>
              </h2>
              <p>
                <b>{activeVinyl.created_at}</b>
              </p>
            </Col>
            <Col xs={6} className="pt-3">
              <Carousel onSelect={handleSelect} interval={null}>
                {props.vinyls.map((vinyl) => (
                  <CarouselItem
                    key={vinyl.id}
                    id={vinyl.id}
                    index={vinyl.id}
                    style={{ height: "40rem" }}
                  >
                    <img
                      className="d-block w-100"
                      src={vinyl.image}
                      alt={vinyl.artist}
                    />
                  </CarouselItem>
                ))}
              </Carousel>
            </Col>
            <Col xs={3} className="pt-4">
              <a href="#top">
                <Button
                  className="m-2"
                  variant="success"
                  onClick={() => setShowEvents(true)}
                >
                  Show Events
                </Button>
              </a>
              <Button
                className="m-2"
                variant="danger"
                id={activeVinyl.id}
                onClick={props.handleDelete}
              >
                Delete Vinyl
              </Button>
            </Col>
          </Row>
        </div>
      )}
      {showEvents && (
        <div id="carouselEvents">
          <UpcomingEvents
            artist={activeVinyl.artist}
            setShowEvents={setShowEvents}
          />
        </div>
      )}
      <div className="p-5" id="noEventsCarousel">
      </div>
    </div>
  );
}

export default VinylCarousel


