import "../Style/AddBudget.css";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { MainNavbar } from "./MainNavbar";
import { Footer } from "./Footer";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';


interface Budget {
    id: number;
    income: number;
    bills: number;
    costOfLife: number;
    insurance: number;
    family: number;
    car: number;
    publicTrans: number;
    entertainment: number;
    vacations: number;
  }

const EditBudget = () => {
  const currentMonth = format(new Date(), "MMMM", { locale: pl });
  const { customerId } = useParams();
  const budgetId = Number(localStorage.getItem("budgetId"));
  const [budget, setBudget] = useState<Budget | null>(null);
  const formRef = useRef<HTMLFormElement>(document.createElement('form'));

  useEffect(() => {
    axios.get(`http://localhost:8080/budget/${customerId}`)
      .then(response => {
        setBudget(response.data[0]);
      })
      .catch(error => {
        console.error('Error fetching budget', error);
      });
      console.log(budget)
  }, [customerId]);

  const handleSubmit = () => {
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    console.log("DATA", data);

    axios.put(`http://localhost:8080/budget/${budgetId}`, data)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error posting budget!', error);
      });
  }
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
          <Col className="col-md-12 text-center my-3">
            <h3 className="heading my-3">
              Edytuj informacje dotyczące Twojego budżetu z {currentMonth}
            </h3>
            <p className="description">
              Edytuj dane dotyczące Twojego budżetu. Po wypełnieniu wszystkich
              danych kliknij przycisk “Dalej”. Pola są sumami wszystkich danych, 
              które wprowadziłeś w dodawaniu budżetu. Np. pole przychody to suma 
              wypłat, zarobków z samozatrudnienia, zasiłków, stypendiów i innych 
              przychodów, które wprowadziłeś.
            </p>
            <Col className="col-md-8 mx-auto text-start">
              <Accordion defaultActiveKey="0" flush>
                {/* PRZYCHODY */}
                <Accordion.Item eventKey="0">
                    <Accordion.Header>EDYTUJ TUTAJ </Accordion.Header>
                  <Accordion.Body>
                  <Form ref={formRef}>
                      <Form.Group className="mb-3">
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Przychody </Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="income"
                                defaultValue={budget?.income}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>
                                Rachunki
                              </Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="bills"
                                defaultValue={budget?.bills}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Koszty utrzymania pojazdu</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="car"
                                defaultValue={budget?.car}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Koszty życia</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="costOfLife"
                                defaultValue={budget?.costOfLife}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Rozrywka</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="entertainment"
                                defaultValue={budget?.entertainment}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Rodzina/zwierzęta</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="family"
                                defaultValue={budget?.family}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Ubezpieczenia/finanse</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="insurance"
                                defaultValue={budget?.insurance}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Transport publiczny</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="public_trans"
                                defaultValue={budget?.publicTrans}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Wakacje</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="vacations"
                                defaultValue={budget?.vacations}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                      </Form.Group>
                    </Form>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
            <Button className="button-submit" onClick={handleSubmit}>
              Dalej
            </Button>
          </Col>
        </Row>
      </Container>

      <Footer></Footer>
    </>
  );
};

export default EditBudget;
