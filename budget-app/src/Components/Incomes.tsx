import { Col, Container, Row } from "react-bootstrap";
import { MainNavbar } from "./MainNavbar";
import { Footer } from "./Footer";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faFilm, faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";

const Incomes = () => {
    return (
        <>
         <>
      <Container>
        <Row>
          <Col className="col-md-12">
            <MainNavbar></MainNavbar>
          </Col>
        </Row>
      </Container>
      <hr className="hr" />
      <Container>
        <Row>
          <Col className="col-md-12">
            <p className="description">
              Tutaj możesz przejrzeć swoje <span className="thick">przychody</span>  posortowane od najnowszego do najstarszego. 
              W celu dodania nowego przychodu kliknij przycisk poniżej. Jeśli chcesz edytować istniejący już przychód kliknij ikonę ołówka. 
            </p>
            <Col className="text-center">
            <Link to="/income_add"><Button className="some-btn">DODAJ NOWY PRZYCHÓD</Button></Link>
            </Col>
          </Col>
        </Row>
        <Container>
          <Row className="d-flex justify-content-center">
            <Col className="col-sm-12 col-md-8 text-center m-5">
              <Accordion defaultActiveKey="0" className="mb-5">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>LISTOPAD</Accordion.Header>
                  <Accordion.Body>
                    <Row className="current-goal pb-0">
                        <div className="badge-right-green"></div>
                      <Col className="col-md-4 text-center d-flex justify-content-center">
                        <FontAwesomeIcon icon={faMoneyCheckDollar} className="money-icon" />
                      </Col>
                      <Col className="col-md-4 text-start">
                        <h4>WYPŁATA</h4>
                        <p className="description-goal">WYPŁATA Z FIRMY I.O.L</p>
                      </Col>
                      <Col className="col-md-4 text-end">
                        <p className="green">4323.20 zł</p>
                      </Col>
                      <Col className="col-md-6 text-end">
                        <p style={{ color: "gray", fontSize: "1.2em" }}>
                          10.11.2023
                        </p>
                      </Col>
                      <Col className="col-md-12 text-end mx-2 pencil-col">
                        <Link to="/income_edit">
                          <FontAwesomeIcon icon={faPencil} className="pencil" />
                        </Link>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>PAŹDZIERNIK</Accordion.Header>
                  <Accordion.Body>
                    <Row className="current-goal">
                      <Col className="col-12 mb-4 text-center d-flex justify-content-center">
                        <p> Brak przychodów w miesiącu październik</p>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </Container>
      <Footer></Footer>
    </>
        </>
    )
}

export default Incomes