import React from "react";
import footer from "../assets/budgetImages/footer.png";
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from "@mui/material";

export const Footer = () => {
    const backgroundStyle = {
        backgroundImage: `url(${footer})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '20em',  // Adjust the height as needed
    };

    return (
        <Container fluid className="App-footer" style={backgroundStyle}>
            <Row>
            <Col className="col-md-8 footter_par1">
              <p ><span className="bold">BudgetApp</span> </p>
              <p>Wszelkie prawa zastrzeżone. Kopiowanie lub wykorzystywanie materiałów jest zabronione.</p>
              <p>BudgetApp Copyright©2023</p>
            </Col>
                <Col className="col-md-2 footter_par2">
              <p ><span className="bold">Polityka prywatności</span></p>
              <p >Zapoznaj się z naszą polityką prywatności</p>
            <Button className="button-check" variant="text" aria-label="text button group">Kliknij</Button>
                </Col>
                <Col className="col-md-2 footter_par2">
              <p ><span className="bold">Zasady i warunki</span></p>
              <p >Poznaj zasady i warunki korzystania ze strony</p>
            <Button className="button-check" variant="text" aria-label="text button group">Kliknij</Button>
            </Col>
            </Row>
        </Container>
    );
}