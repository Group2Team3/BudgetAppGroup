import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import budgetLogo from "../assets/budgetImages/Piggy2.svg";
import { Button, ButtonGroup } from "@mui/material";
import '../Style/MainNavbar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../service/AuthContext";

export const MainNavbar = () => {
  const { login, setLogin } = useAuth();

  const handleLogout = () => {
    // Add logic to handle logout
    setLogin(false);
  };

  //const login : boolean = false;
  return (
    <Container>
      <Row className="align-items-center pt-3">
        <Col className = "col-md-2">
          <Link to="/">
            <img src={budgetLogo} alt="react logo" className="App-logo" />
          </Link>
        </Col>
        <Col className = "col-md-6">
          <Link to="/">
            <Navbar.Brand className="App-brandName">BudgetApp</Navbar.Brand>
          </Link>
        </Col>
        <Col className = "col-md-4">
          {login ? (
            <ButtonGroup className="buttons2" variant="text" aria-label="text  button group">
              <Link to="/budget"><Button className="other-btn btn1">Twój budżet</Button></Link>
              <Link to="/goals"><Button className="other-btn btn2">Cele</Button></Link>
              <Link to="/receipts"><Button className="other-btn btn3">Paragony</Button></Link>
              <Link to="/outgoes"><Button className="other-btn btn4">Wydatki</Button></Link>
              <Link to="/"><Button className="other-btn btn5">Przychody</Button></Link>
              <Link to="/login">
                <Button className="other-btn btn1" onClick={handleLogout}>
                  Wyloguj
                </Button>
              </Link>
            </ButtonGroup>
          ) : (
            <ButtonGroup className="buttons" variant="text" aria-label="text  button group">
               <Link to="/login">
                <Button className="FirstButton">Logowanie</Button>
              </Link>
              <Link to="/login">
                <Button>Rejestracja</Button>
              </Link>
            </ButtonGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
}
