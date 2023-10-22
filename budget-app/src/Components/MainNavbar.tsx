import { Col, Container, Navbar, Row } from "react-bootstrap";
import budgetLogo from "../assets/budgetImages/Piggy2.svg";
import { Button, ButtonGroup } from "@mui/material";
import '../Style/MainNavbar.css';

export const MainNavbar = () => {
    return (
        <Container>
          <Row className="align-items-center pt-3">
            <Col className = "col-md-2">
              <img src={budgetLogo} alt="react logo" className="App-logo" />
            </Col>
            <Col className = "col-md-6">
              <Navbar.Brand className="App-brandName">BudgetApp</Navbar.Brand>
            </Col>
            <Col className = "col-md-4">
            <ButtonGroup className="buttons" variant="text" aria-label="text  button group">
                <Button className="FirstButton">Logowanie</Button>
                <Button>Rejestracja</Button>
            </ButtonGroup>
            </Col>
          </Row>
        </Container>
    )
}
