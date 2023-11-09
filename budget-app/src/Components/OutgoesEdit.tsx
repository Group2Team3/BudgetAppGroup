import "../Style/OutGoes.css";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { MainNavbar } from "./MainNavbar";
import { Footer } from "./Footer";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { ChangeEvent, useEffect, useState } from "react";
import { Tesseract } from "tesseract.ts";

const OutgoesEdit = () => {
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
             Edytujesz wydatek. Jeśli chcesz wrócić do Twoich wydatków {" "}
              <Link to="/outgoes_detail" className="link">
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
                  value="ROZRYWKA"
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
                <Form.Control as="textarea" rows={6} placeholder="WYJŚCIE DO KINA" />
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
                  placeholder="22.40 zł"
                />
              </Col>

              <Col>
                <Form.Label>KATEGORIA</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Select aria-label="Default select example">
                  <option>wybierz kategorię</option>
                  <option value="1">pojazd</option>
                  <option value="2">rachunki</option>
                  <option value="3">jedzenie</option>
                  <option value="3">rozrywka</option>
                  <option value="3">zwierzeta</option>
                  <option value="3">inne</option>
                </Form.Select>
              </Col>
              <Col>
              <p> Jeśli chcesz przypisać swojemu wydatkowi paragon: </p>
                <Col>
                  <Form.Label>PARAGON</Form.Label>
                </Col>
                <Col className="mb-5">
                  <Form.Control type="file" accept="image/*" />
                </Col>
              </Col>
            </Col>
          </Row>
          <Row>
            <Col className="submit-button mb-4">
              <Link to="/outgoes">
                <Button className="some-btn">ZAPISZ WYDATEK</Button>
              </Link>
            </Col>
          </Row>
        </Row>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default OutgoesEdit;
