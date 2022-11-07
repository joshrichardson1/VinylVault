import { React } from "react";
import VinylAPI from "../../api/VinylAPI";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Container,
  Col,
  Row,
} from "react-bootstrap";

const DisplaySearch = (props) => {
  //  props and params
  const results = props.results;
  const { artist, album } = useParams();
  const user = JSON.parse(window.localStorage.getItem("user"));
  const navigate = useNavigate();

  // updates artist and album to title case
  const titleCase = (str) => {
    let splitStr = str.toLowerCase().split(" ");
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  };

  // retrieves search results and displays in cards
  const getResults = (results) => {
    return results.map((vinyl, index) => {
      const vinylData = {
        vinyls: [
          {
            artist: titleCase(artist),
            album: titleCase(album),
            genre: vinyl.genre ? vinyl.genre[0] : vinyl.genre,
            year: vinyl.year,
            image: vinyl.cover_image,
            discogs_id: vinyl.master_id,
            format: vinyl.format ? vinyl.format[0] : vinyl.format,
            label: vinyl.label ? vinyl.label[0] : vinyl.label,
          },
        ],
      };

      const handleAdd = async (event) => {
        event.preventDefault();
        const data = await VinylAPI.addVinyl(user.email, vinylData);
        navigate("/home/my-collection/");
      };

      return (
        <Col className="mb-3 mt-3 searchResults">
          <Card style={{ width: "18rem" }} key={index}>
            <Card.Img variant="top" src={vinyl.cover_image} />
            <Card.Body className="displaySearchCard">
              <Card.Title>{vinyl.title}</Card.Title>
              <Card.Text>{vinyl.year}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem className="displaySearchCard">
                Formats:{" "}
                {Array.isArray(vinyl.format)
                  ? vinyl.format.join(", ")
                  : vinyl.format}
              </ListGroupItem>
              <ListGroupItem className="displaySearchCard">
                Type:{" "}
                {vinyl.type[0].toUpperCase() +
                  vinyl.type.slice(1).toLowerCase()}
              </ListGroupItem>
              <ListGroupItem className="displaySearchCard">
                Genre: {vinyl.genre}
              </ListGroupItem>
            </ListGroup>
            <Card.Body className="displaySearchCard">
              <Button variant="primary" onClick={handleAdd}>
                Add to Collection
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    });
  };

  return (
    <div id="displaySearchMain">
      <Container>
        <Row sm={1} md={3}>
          {getResults(results)}
        </Row>
      </Container>
    </div>
  );
};

export default DisplaySearch;
