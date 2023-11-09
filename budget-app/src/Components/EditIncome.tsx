import "../Style/OutGoes.css";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { MainNavbar } from "./MainNavbar";
import { Footer } from "./Footer";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

const EditIncome = () => {
    const date = new Date(2023, 10, 13);
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
             Edytujesz przychód. Jeśli chcesz wrócić do Twoich przychodów {" "}
              <Link to="/incomes" className="link">
                kliknij tutaj
              </Link>
              .
            </p>
          </Col>
          <Row className="m-5">
            <Col className="col-md-5 mx-3">
              <Col>
                <Form.Label>NAZWA</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Control
                  type="text"
                  value="WYPŁATA"
                />
              </Col>

              <Col>
                <Form.Label>DATA</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Control type="date" value={date.toISOString().substr(0, 10)}/>
              </Col>
              <Col>
                <Form.Label>OPIS</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Control as="textarea" rows={6} placeholder="WYPŁATA Z FIRMY I.O.L" />
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
                  placeholder="4323.20 zł"
                />
              </Col>

              <Col>
                <Form.Label>KATEGORIA</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Select aria-label="Default select example">
                  <option value="1" selected>wypłata</option>
                  <option value="2">zarobki z samozatrudnienia</option>
                  <option value="3">zasiłki/zapomogi</option>
                  <option value="4">stypendia</option>
                  <option value="5">inne</option>
                </Form.Select>
              </Col>
              <Col className="submit-button mb-4">
              <Link to="/outgoes">
                <Button className="some-btn">ZAPISZ PRZYCHÓD</Button>
              </Link>
            </Col>
            </Col>
          </Row>
        </Row>
      </Container>
      <Footer></Footer>
    </>
  );
}
export default EditIncome;