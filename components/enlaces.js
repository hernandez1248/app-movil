import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { MapFill, BusFrontFill, JournalText} from 'react-bootstrap-icons';


function Enlaces() {
  return (
    <>
      <Navbar border="dark" bg="light" variant="light" fixed="bottom">
        <Container>
          <Nav className="footer">
<<<<<<< HEAD
            <Nav.Link href="/rutas-admin"><MapFill className="footer-icons"></MapFill></Nav.Link>
=======
            <Nav.Link href="/rutas-usuario"><MapFill className="footer-icons"></MapFill></Nav.Link>
>>>>>>> 376a9605e9d635647a2561eb088740a5c107d49e
            <Nav.Link href="/unidades" ><BusFrontFill className="footer-icons"></BusFrontFill></Nav.Link>
            <Nav.Link href="/cronograma-admin"><JournalText className="footer-icons"></JournalText></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Enlaces;
