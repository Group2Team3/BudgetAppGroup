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

const EditGoal = () => {
  //kiedys tu beda pobrane dane dotyczace celu by przekazac je do formularza, na razie na sztywno
  const title: string = "WAKACJE";
  const date: Date = new Date(2024, 5, 17);
  const amount: number = 10000;
  const savedAmount: number = 5000;
  const category: string = "wakacje";
  const description: string = "Wakacje w Indonezji";

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
          <Row className="mx-4">
            <Col className="col-md-5">
              <p className="description">Tutaj edytujesz swój cel.</p>
            </Col>
            <Col className="col-md-5 text-end mx-5">
              <Link to="/goals">
                <Button className="some-btn-back">WRÓĆ DO CELÓW</Button>
              </Link>
            </Col>
          </Row>

          <Row className="m-5">
            <Col className="col-md-5 mx-3">
              <Col>
                <Form.Label>NAZWA</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Control type="text" value={title} />
              </Col>

              <Col>
                <Form.Label>DO KIEDY</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Control
                  type="date"
                  value={date.toISOString().substr(0, 10)}
                />
              </Col>

              <Col>
                <Form.Label>KATEGORIA</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Select aria-label="Default select example" value={category}>
                  <option value="samochód">samochód</option>
                  <option value="dom">dom</option>
                  <option value="prezent">prezent</option>
                  <option value="wakacje">wakacje</option>
                  <option value="zdrowie">zdrowie</option>
                  <option value="inne">inne</option>
                </Form.Select>
              </Col>

              <Col className="submit-button">
                <Link to="/goals">
                  <Button className="some-btn">ZAPISZ CEL</Button>
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
                  placeholder={amount.toString()}
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
                  placeholder={savedAmount.toString()}
                />
              </Col>

              <Col>
                <Form.Label>OPIS</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Control as="textarea" rows={6} placeholder={description} />
              </Col>
            </Col>
          </Row>
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

export default EditGoal;
