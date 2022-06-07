import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import VinylAPI from '../../api/VinylAPI';
import { useNavigate } from 'react-router-dom';
import VinylCarousel from '../VinylCarousel/VinylCarousel';
import "../../styles/styles.css";


const VinylList = (props) => {

  const navigate = useNavigate();

  const { vinyls, view } = props;

  const handleDelete = async (event) => {
      let vinylId = event.target.id;
      await VinylAPI.deleteVinyl(vinylId);
      window.location.reload();
    };

  const getVinylsList = (vinyls) => {
    return vinyls.map((vinyl, index) => {
      return (
        <Col xs={6} med={8} key={index}>
          <Card
            style={{ width: "27rem", height: "38rem" }}
            key={index}
            className="m-5"
          >
            <Card.Img variant="top" src={vinyl.image} style={{height: "25rem" }}/>
            <Card.Body id="cardListBody">
              <Card.Title>{vinyl.artist}</Card.Title>
              <Card.Text>{vinyl.album}</Card.Text>
              <Button
                variant="primary"
                id={vinyl.discogs_id}
                onClick={() => navigate(`/home/my-collection/${vinyl.artist}/${vinyl.album}/${vinyl.id}`)}
              >
                Details
              </Button>
              <Button
                className="m-2"
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
    <div id="vinylListBody">
      {!view &&
        <Container>
          <Row>
            < VinylCarousel vinyls={vinyls} handleDelete={handleDelete} />
          </Row>
        </Container>
      }
      {view &&
        <Container className="p-5">
          <Row>
            {getVinylsList(vinyls)}
          </Row>
        </Container>
      }
    </div>
  );
}

export default VinylList







 