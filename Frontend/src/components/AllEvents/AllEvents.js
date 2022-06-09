import {React, useEffect, useState } from 'react';
import { Card, Col, Row, Container, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import Loading from '../Loading/Loading';
import moment from 'moment';

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
                    <Col>
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
                          >
                            <Button variant="primary" size="sm" className="m-2">
                              GET TICKETS!
                            </Button>
                          </a>
                          <a href={evt.url}>
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


//  <br></br>
//       <h3>
//         {props.allEvents.length > 0 ? "All Events" : "No Events"}
//       </h3>
//       <hr />
//       <Container>
//         <Row xs={2} md={4}>
//           {events.map((event, index) => (
//             <Col key={index}>
//               <Card
//                 style={{ width: "18rem", height: "14rem" }}
//                 className="mb-3"
//                 key={index}
//                 id="eventCard"
//               >
//                 <Card.Img variant="top" />
//                 <Card.Body id="eventBody">
//                   <Card.Title>{event.venue.name}</Card.Title>
//                   <Card.Text>{event.venue.location}</Card.Text>
//                 </Card.Body>
//                 <ListGroup className="list-group-flush">
//                   <ListGroupItem>
//                     {moment(event.datetime).format("MMM DD, YYYY h:mm A")}
//                   </ListGroupItem>
//                 </ListGroup>
//                 <Card.Body>
//                   <Card.Link
//                     href={
//                       event.offers[0] ? event.offers[0].url : event.offers.url
//                     }
//                   >
//                     GET TICKETS!
//                   </Card.Link>
//                   <Card.Link href={event.url}>Event Page</Card.Link>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>



    // <div>
    //   <Container>
    //     {eventsSorted.map((event) => {
    //       return (
    //         <Row key={event[0].id}>
    //           <Col>
    //             <Card
    //               style={{ width: "18rem", height: "14rem" }}
    //               className="mb-3"
    //               key={event[0].id}
    //               id="eventCard"
    //             >
    //               <Card.Img variant="top" />
    //               <Card.Body id="eventBody">
    //                 <Card.Title>{event[0].lineup[0]}</Card.Title>
    //                 <Card.Text>
    //                   {event[0].venue.name} - {event[0].venue.city},{" "}
    //                   {event[0].venue.region}
    //                 </Card.Text>
    //               </Card.Body>
    //             </Card>
    //           </Col>
    //         </Row>
    //       );
    //     })}
    //   </Container>
    // </div>;