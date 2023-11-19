import { Col, Container, Navbar, Row} from "react-bootstrap";
import { Link } from "react-router-dom";
import budgetLogo from "../assets/budgetImages/Piggy2.svg";
import { Button, ButtonGroup, IconButton, Menu, MenuItem } from "@mui/material";
import '../Style/MainNavbar.css';
import { useAuth } from "../service/AuthContext";
import { SetStateAction, useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';

export const MainNavbar = () => {
  const { login, setLogin } = useAuth();
  const [mobileView, setMobileView] = useState(false);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleLogout = () => {
    // Add logic to handle logout
    setLogin(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget as Element);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 1000
        ? setMobileView(true)
        : setMobileView(false);
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    }
  }, []);

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
            <>
            {mobileView ? (
              <>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose} component={Link} to="/budget">Twój budżet</MenuItem>
                  <MenuItem onClick={handleClose} component={Link} to="/goals">Cele</MenuItem>
                  <MenuItem onClick={handleClose} component={Link} to="/receipts">Paragony</MenuItem>
                  <MenuItem onClick={handleClose} component={Link} to="/outgoes_detail">Wydatki</MenuItem>
                  <MenuItem onClick={handleClose} component={Link} to="/incomes">Przychody</MenuItem>
                  <MenuItem onClick={handleLogout}>Wyloguj</MenuItem>
                </Menu>
              </>
            ) : (
              <ButtonGroup className="buttons2" variant="text" aria-label="text  button group">
                <Link to="/budget"><Button className="other-btn btn1">Twój budżet</Button></Link>
                <Link to="/goals"><Button className="other-btn btn2">Cele</Button></Link>
                <Link to="/receipts"><Button className="other-btn btn3">Paragony</Button></Link>
                <Link to="/outgoes_detail"><Button className="other-btn btn4">Wydatki</Button></Link>
                <Link to="/incomes"><Button className="other-btn btn5">Przychody</Button></Link>
                <Link to="/login">
                  <Button className="other-btn btn2" onClick={handleLogout}>
                    Wyloguj
                  </Button>
                </Link>
              </ButtonGroup>
            )}
          </>
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
