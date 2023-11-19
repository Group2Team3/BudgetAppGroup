import "../Style/OutGoes.css";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { MainNavbar } from "./MainNavbar";
import { Footer } from "./Footer";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

const AddIncome = () => {
    return(
    <><Container>
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
             Tutaj dodajesz nowy przychód. Jeśli chcesz wrócić do Twoich przychodów {" "}
              <Link to="/incomes" className="link">
                kliknij tutaj
              </Link>
              .
            </p>
          </Col>
          <Row className="row-goals">
            <Col className="col-sm-12 col-md-5 mx-3">
              <Col>
                <Form.Label>NAZWA</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Control
                  type="text"
                  value="krótka nazwa Twojego przychodu"
                />
              </Col>

              <Col>
                <Form.Label>DATA</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Control type="date"/>
              </Col>
              <Col>
                <Form.Label>OPIS</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Control as="textarea" rows={6} placeholder="krótki opis przychodu" />
              </Col>
            </Col>

            <Col className="col-sm-12 col-md-5 mx-3">
              <Col>
                <Form.Label>KWOTA</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Control
                  type="number"
                  min={100}
                  max={100000}
                  step={10}
                  placeholder="kwota przychodu"
                />
              </Col>

              <Col>
                <Form.Label>KATEGORIA</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Select aria-label="Default select example">
                  <option>wybierz kategorię</option>
                  <option value="1">wypłata</option>
                  <option value="2">zarobki z samozatrudnienia</option>
                  <option value="3">zasiłki/zapomogi</option>
                  <option value="4">stypendia</option>
                  <option value="5">inne</option>
                </Form.Select>
              </Col>
              <Col className="submit-button mb-4">
              <Link to="/outgoes">
                <Button className="some-btn">DODAJ NOWY PRZYCHÓD</Button>
              </Link>
            </Col>
            </Col>
          </Row>
          <Row>
            
          </Row>
        </Row>
      </Container>
      <Footer></Footer>
    </>)
}
export default AddIncome