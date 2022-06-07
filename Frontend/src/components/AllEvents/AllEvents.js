import {React, useEffect, useState } from 'react';
import { Card, Col, Row, Container, Button } from 'react-bootstrap';

const AllEvents = (props) => {

  const [eventsSorted, setEventsSorted] = useState([]);

  useEffect(() => {
    setEventsSorted(props.allEvents)
  }, [props.allEvents]);


  console.log(eventsSorted)

    

  return (
    <div>

     
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