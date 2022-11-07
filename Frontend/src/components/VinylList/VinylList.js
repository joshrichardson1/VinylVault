import { Card, Button, Row, Col, Container } from "react-bootstrap";
import VinylAPI from "../../api/VinylAPI";
import { useNavigate } from "react-router-dom";
import VinylCarousel from "../VinylCarousel/VinylCarousel";
import "../../styles/styles.css";

const VinylList = (props) => {
  const { vinyls, view } = props;
  const navigate = useNavigate();

  // handles delete vinyl
  const handleDelete = async (event) => {
    let vinylId = event.target.id;
    await VinylAPI.deleteVinyl(vinylId);
    window.location.reload();
  };

  // retrieves vinyl info and returns data in card
  const getVinylsList = (vinyls) => {
    return vinyls.map((vinyl, index) => {
      return (
        <Col key={index} id="vinylListCardMain" className="shadow">
          <Card
            style={{ width: "18rem", height: "27rem" }}
            key={index}
            className="mx-5 mt-2 mb-5 shadow-lg"
          >
            <Card.Img
              variant="top"
              src={vinyl.image}
              style={{ height: "17rem" }}
              className="shadow-5"
            />
            <Card.Body id="cardListBody" className="pt-3 pb-2 shadow-5">
              <Card.Title>{vinyl.artist}</Card.Title>
              <Card.Text>{vinyl.album}</Card.Text>
              <Button
                className="mb-2 mx-3"
                variant="primary"
                id={vinyl.discogs_id}
                onClick={() =>
                  navigate(
                    `/home/my-collection/${vinyl.artist}/${vinyl.album}/${vinyl.id}`
                  )
                }
              >
                Details
              </Button>
              <Button
                className="mx-3 mb-2"
                variant="danger"
                id={vinyl.id}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    });
  };

  return (
    <div id="vinylListBody" className="">
      {!view && (
        <Container>
          <Row>
            <VinylCarousel vinyls={vinyls} handleDelete={handleDelete} />
          </Row>
        </Container>
      )}
      {view && (
        <Container className="p-5 listContainer">
          <Row sm={2} md={3} lg={3} className="">
            {getVinylsList(vinyls)}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default VinylList;
