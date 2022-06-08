import React from 'react'
import { Form, Button, Row, Col} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

const SearchForm = (props) => {

  const navigate = useNavigate();
  
  const navigateSearch = (event) => {
    let artist = event.target.artist.value;
    let album = event.target.album.value;
    navigate(`/home/search/${artist}/${album}`, );
  }

  return (
    <div>
      <p id="searchInfo"><i>Please enter an Artist <b>AND</b> Album title to search:</i></p>
      <Form onSubmit={navigateSearch}>
        <div id="searchForm">
          <Row className="mb-3">
            <Form.Group as={Col} className="mb-3" controlId="artist">
              <Form.Control type="text" placeholder="Artist" name="artist" required/>
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="album">
              <Form.Control
                size="small"
                type="text"
                placeholder="Album"
                name="album"
                required
              />
            </Form.Group>
            </Row>
          </div>
        <Button variant="danger" type="submit" className="mx-2" onClick={() => props.setShowSearch(false)}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" className="mx-2">
          Search
        </Button>
      </Form>
    </div>
  );
}

export default SearchForm;
