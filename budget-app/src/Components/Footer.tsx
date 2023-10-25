import { Container, Row, Col } from 'react-bootstrap';
import { Button } from "@mui/material";
import '../Style/Footer.css';
import { Link } from 'react-router-dom'

export const Footer = () => {
    return (
        <Container fluid className="App-footer" >
            <Row className=" justify-content-start pt-5 ps-5">
            <Col className="col-md-4 pe-5" >
            <Row className="titles">BudgetApp </Row>
            <Row className='all-rigths-reserved'>Wszelkie prawa zastrzeżone. Kopiowanie lub wykorzystywanie materiałów jest zabronione.</Row>
            <Row className="pt-3 copy">BudgetApp Copyright©2023</Row>
            </Col>
            </Row>
            <Row className="justify-content-end row-buttons">         
                <Col className="col-md-2 me-4 ">
                <Row className="pb-2"><span className="bold">Polityka prywatności</span></Row>
              <Row className="pb-2 ms-2" >Zapoznaj się z naszą polityką prywatności</Row>
              <Row className="justify-content-center">
                <Link to="/policy">
                  <Button className="button-check" variant="contained" aria-label="text button group">Kliknij</Button>
                </Link>
              </Row>
                </Col>
                <Col className="col-md-2 justify-content-center me-3">
              <Row className="pb-2 ms-1"><span className="bold">Zasady i warunki</span></Row>
              <Row className="pb-2  ms-2">Poznaj zasady i warunki korzystania ze strony</Row>
              <Row className="justify-content-center"> 
                <Link to="/terms">
                  <Button className="button-check" variant="contained" aria-label="text button group">Kliknij</Button>
                </Link>
              </Row>
            </Col>
            </Row>
        </Container>
    );
}