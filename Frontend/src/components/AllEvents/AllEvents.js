import { React, useEffect, useState } from "react";
import {
  Card,
  Col,
  Row,
  Container,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import Loading from "../Loading/Loading";
import moment from "moment";

const AllEvents = (props) => {
  // state
  const [eventsSorted, setEventsSorted] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // displays loading screen while events are being fetched
  useEffect(() => {
    setTimeout(() => {
      setEventsSorted(props.allEvents);
    }, 700);
    setTimeout(() => {
      setIsLoading(false);
    }, 1700);
  }, [props.allEvents]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div id="allEventsMain" className="pt-3">
          {eventsSorted.map((e) => (
            <>
              <h2 id="allEventsArtist">{e[0].lineup[0]}</h2>
              <Container className="pt-3">
                <Row xs={1} md={2} lg={3} xl={4}>
                  {e.map((evt, index) => (
                    <Col className="allEventsContainer">
                      <Card
                        style={{ width: "18rem", height: "16rem" }}
                        className="mb-3 shadow"
                        key={index}
                        id="eventCard"
                      >
                        <Card.Img variant="top" />
                        <Card.Body id="eventBody">
                          <Card.Title>{evt.lineup[0]}</Card.Title>
                          <Card.Text>
                            {evt.venue.name} - {evt.venue.city},{" "}
                            {evt.venue.region}
                          </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush" key={index}>
                          <ListGroupItem key={index}>
                            {moment(evt.datetime).format("MMM DD, YYYY h:mm A")}
                          </ListGroupItem>
                        </ListGroup>
                        <Card.Body>
                          <a
                            href={
                              evt.offers[0] ? evt.offers[0].url : evt.offers.url
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Button variant="primary" size="sm" className="m-2">
                              GET TICKETS!
                            </Button>
                          </a>
                          <a href={evt.url} target="_blank" rel="noreferrer">
                            <Button
                              variant="secondary"
                              size="sm"
                              className="m-2"
                            >
                              Event Page
                            </Button>
                          </a>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Container>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllEvents;
