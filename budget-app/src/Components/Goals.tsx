import "../Style/Goals.css";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { MainNavbar } from "./MainNavbar";
import { Footer } from "./Footer";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneUp, faPencil, faCar } from "@fortawesome/free-solid-svg-icons";

const Goals = () => {
  const oldGoals: boolean = true; //jesli nie ma starych celi to false (zmienia drugi accordion)
  const success: boolean = false; //jesli cel zostal osiagniety to true (zmienia kolor tekstu w drugim accordion)

  return (
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
              Dodaj <span className="thick">nowy cel</span>. Podaj wszystkie
              wymagane informacje tj. okres, kwota, opis itp. Gdy w danym
              miesiącu odłożysz jakąś kwotę, pamiętaj by wprowadzić ją w “Twoje
              aktualne cele”, tym sposobem Twój cel będzie aktualizowany na
              bieżąco. Aktywny cel możesz zawsze edytować klikając ikonkę
              ołówka. Zakończone cele (sukcesem, lub nie) zawsze możesz
              podejrzeć w zakładce “Cele z przeszłości”.
            </p>
          </Col>
          <Row className="m-5">
            <Col className="col-md-5 mx-3">
              <Col>
                <Form.Label>NAZWA</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Control type="text" value="krótka nazwa Twojego celu" />
              </Col>

              <Col>
                <Form.Label>DO KIEDY</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Control type="date" />
              </Col>

              <Col>
                <Form.Label>KATEGORIA</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Select aria-label="Default select example">
                  <option>Wybierz kategorię</option>
                  <option value="1">samochód</option>
                  <option value="2">dom</option>
                  <option value="3">prezent</option>
                  <option value="3">wakacje</option>
                  <option value="3">zdrowie</option>
                  <option value="3">inne</option>
                </Form.Select>
              </Col>

              <Col className="submit-button">
                <Link to="/goals">
                  <Button className="some-btn">DODAJ CEL</Button>
                </Link>
              </Col>
            </Col>

            <Col className="col-md-5 mx-3">
              <Col>
                <Form.Label>KWOTA</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Control
                  type="number"
                  min={100}
                  max={100000}
                  step={10}
                  placeholder="kwota, którą chcesz odłożyć"
                />
              </Col>

              <Col>
                <Form.Label>KWOTA ZAOSZCZĘDZONA</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Control
                  type="number"
                  min={10}
                  max={100000}
                  step={10}
                  placeholder="kwota, którą odłożyłeś do tej pory"
                />
              </Col>

              <Col>
                <Form.Label>OPIS</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Control as="textarea" rows={6} placeholder="Opis" />
              </Col>
            </Col>
          </Row>
        </Row>
      </Container>
      
      <Container>
        <Row className="d-flex justify-content-center">
          <Col className="col-md-8 text-center m-5">
            <Accordion defaultActiveKey="0" className="mb-5">
              <Accordion.Item eventKey="0">
                <Accordion.Header>TWOJE AKTUALNE CELE</Accordion.Header>
                <Accordion.Body>
                  <Row className="current-goal">
                    <Col className="col-md-4 text-center d-flex justify-content-center">
                      <FontAwesomeIcon
                        icon={faPlaneUp}
                        className="plane-icon"
                      />
                    </Col>
                    <Col className="col-md-4 text-start">
                      <h4>WAKACJE</h4>
                      <p className="description-goal">WYJAZD DO INDONEZJI</p>
                      <p className="pink">ZOSTAŁO:</p>
                      <p className="pink">ODŁOŻONO:</p>
                      <p className="pink">DATA KOŃCOWA:</p>
                    </Col>
                    <Col className="col-md-4 text-end">
                      <p className="green">5.000 zł</p>
                      <Col className="details-goal-col">
                        <p className="details-goal"> 8 MIESIĘCY</p>
                        <p className="details-goal"> 200 zł</p>
                        <p className="details-goal"> 17.06.2024 </p>
                      </Col>
                    </Col>
                    <Col className="col-md-12 text-start">
                      <p className="goal-savings">
                        ŻEBY ZDOBYĆ TEN CEL MIESIĘCZNIE POWINIENEŚ ODKŁADAĆ:
                        <span className="how-much-savings"> 600 zł</span>
                      </p>
                      <Col>
                        <Form.Group className="mb-5">
                          <Row>
                            <Col className="col-md-3">
                              <Form.Label className="mx-5 saved-add">
                                ODŁOŻONO:{" "}
                              </Form.Label>
                            </Col>
                            <Col className="col-md-4">
                              <Form.Control
                                className="saved-amount"
                                type="number"
                                min={100}
                                max={100000}
                                step={10}
                                placeholder="kwota"
                              />
                            </Col>
                            <Col className="col-md-4">
                              <Button className="some-other-btn">DODAJ</Button>
                            </Col>
                          </Row>
                        </Form.Group>
                      </Col>
                      <Col className="text-end mx-2 pencil-col">
                        <Link to="/editgoal">
                          <FontAwesomeIcon icon={faPencil} className="pencil" />
                        </Link>
                      </Col>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>CELE Z PRZESZŁOŚCI</Accordion.Header>
                <Accordion.Body>
                  {oldGoals ? (
                    <Row className="current-goal">
                      <Col className="col-md-4 text-center d-flex justify-content-center">
                        <FontAwesomeIcon
                          icon={faCar}
                          className="plane-icon"
                        />
                      </Col>
                      <Col className="col-md-4 text-start">
                        <h4>SAMOCHÓD</h4>
                        <p className="description-goal">NOWE AUDI A5</p>
                        <p className="pink">CEL:</p>
                        <p className="pink">ODŁOŻONO:</p>
                        <p className="pink">DATA KOŃCOWA:</p>
                      </Col>
                      <Col className="col-md-4 text-end">
                        <Col className="details-goal-col-fail">
                          <p className="details-goal"> 20.000 zł</p>
                          <p className="details-goal"> 10.000 zł</p>
                          <p className="details-goal"> 12.06.2023 </p>
                        </Col>
                      </Col>
                      <Col className="col-md-12 text-start">
                        <p className="goal-savings">
                          CZY UDAŁO CI SIĘ ZDOBYĆ TEN CEL:
                          { success ? (
                          <span className="green2"> TAK </span>
                          ) : (
                          <span className="red"> NIE </span>
                          )}
                          
                        </p>
                      </Col>
                    </Row>
                  ) : (
                    <h4 className="no-goals m-4">
                      Nie masz jeszcze celów z przeszłości
                    </h4>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col className="col-md-12">
            <Footer></Footer>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Goals;
