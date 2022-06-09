import React from 'react'
import { useState, useEffect } from 'react'
import BitAPI from '../../api/BitAPI';
import { Card, ListGroup, ListGroupItem, Container, Row, Col, Button } from 'react-bootstrap';
import "../../styles/styles.css"
import moment from 'moment';
import Loading from '../Loading/Loading';

const UpcomingEvents = (props) => {

  // state
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // fetches events from API
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    const getEvents = async () => {
      const data = await BitAPI(props.artist);
      if (data) {
        setEvents(data);
      }
    };
    getEvents();
  }, [props.artist]);

  // navigates back to vinyls
  const handleBackToVinyls = () => {
    props.setShowEvents(false);
    window.scrollTo(0, 0);
  }
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
      <div className="">
          <div>
            <div id="upcomingEventsHeader" className="p-4">
              <br></br>
              <h3 id="eventPageHeader" className="p-5">
                Upcoming Events for {props.artist} -{" "}
                <Button variant="secondary" onClick={handleBackToVinyls}>
                  Back to Vinyl
                </Button>
              </h3>
          </div>
          {events[0] && 
          <Container>
            <Row xs={1} md={2} lg={3} xl={4}>
              {events.map((event, index) => (
                <Col key={index}>
                  <Card
                    style={{ width: "18rem", height: "14rem" }}
                    className="mb-3"
                    key={index}
                    id="eventCard"
                  >
                    <Card.Img variant="top" />
                    <Card.Body id="eventBody">
                      <Card.Title>{event.venue.name}</Card.Title>
                      <Card.Text>{event.venue.location}</Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem>
                        {moment(event.datetime).format("MMM DD, YYYY h:mm A")}
                      </ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                      <a
                        href={
                          event.offers[0] ? event.offers[0].url : event.offers.url
                        }
                      >
                        <Button variant="primary" size="sm" className="m-2">
                          GET TICKETS!
                        </Button>
                      </a>
                      <a href={event.url}>
                        <Button variant="secondary" size="sm" className="m-2">
                          Event Page
                        </Button>
                      </a>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            </Container>
          }
          </div>
        {events.length < 1 &&
          <div id="noEventsList">
            <h2>
              --No Upcoming Events-- {" "}
            </h2>
            <img
              src="https://memegenerator.net/img/instances/45301908.jpg"
              alt="no events gif"
              id="noEventsImage"
            />
          </div>
        }
          </div>
      )}
    </div>
    );
};

export default UpcomingEvents;
