import { React } from 'react'
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

const AppNav = (props) => {

  // retrieves user
  const user = JSON.parse(window.localStorage.getItem("user"));
  
  // updates user upon logout and redirects to login page
  const navigate = useNavigate();
  const handleLogout = () => {
    window.localStorage.removeItem("user");
    props.setUser({});
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="navbar">
      <Container className="navbar">
        <Navbar.Brand href="/home/my-collection/">
          <img
            alt=""
            src="https://e7.pngegg.com/pngimages/111/864/png-clipart-computer-icons-vinyl-record-white-text.png"
            width="45"
            height="45"
            className="d-inline-block align-center"
          />{" "}
          VinylVault
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && (
              <Nav.Link href="/home/my-collection/">My Collection</Nav.Link>
            )}
            {user && <Nav.Link href="/home/all-events/">Live Music</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
        {user && (
          <Button variant="secondary" className="m-2" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Container>
    </Navbar>
  );
}

export default AppNav;
