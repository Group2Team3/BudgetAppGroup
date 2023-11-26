import "../Style/Goals.css";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { MainNavbar } from "./MainNavbar";
import { Footer } from "./Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

interface Goal {
  id: number;
  amount: number;
  category: string;
  dateTo: string;
  description: string;
  name: string;
  saved: number;
}

const EditGoal = () => {
  const { goalId } = useParams();
  const [goal, setGoal] = useState<Goal | null>(null);
  const formRef = useRef<HTMLFormElement>(document.createElement('form'));
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/goal/${goalId}`)
      .then(response => {
        setGoal(response.data);
      })
      .catch(error => {
        console.error('Error fetching goal', error);
      });
      console.log(goal)
  }, [goalId]);

  const handleSubmit = () => {
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    console.log("DATA", data);

    axios.put(`http://localhost:8080/goal/${goalId}`, data)
      .then(response => {
        console.log(response.data);
        navigate('/goals')
      })
      .catch(error => {
        console.error('Error posting goal!', error);
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
        <Form ref={formRef}>
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
                <Form.Control type="text" defaultValue={goal?.name} name="name"/>
              </Col>

              <Col>
                <Form.Label>DO KIEDY</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Control
                  type="date"
                 defaultValue={goal?.dateTo}
                 name="dateTo"
                />
              </Col>

              <Col>
                <Form.Label>KATEGORIA</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Select
                  aria-label="Default select example"
                  value={goal?.category}
                  name="category"
                >
                  <option value="samochod">samochód</option>
                  <option value="dom">dom</option>
                  <option value="prezent">prezent</option>
                  <option value="wakacje">wakacje</option>
                  <option value="zdrowie">zdrowie</option>
                  <option value="inne">inne</option>
                </Form.Select>
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
                  defaultValue={goal?.amount}
                  name="amount"
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
                  defaultValue={goal?.saved}
                  name="saved"
                />
              </Col>

              <Col>
                <Form.Label>OPIS</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Control
                  as="textarea"
                  rows={6}
                  defaultValue={goal?.description}
                  name="description"
                />
              </Col>

              <Col className="submit-button">
                  <Button className="some-btn"
                  onClick={handleSubmit}>ZAPISZ CEL</Button>
              </Col>
            </Col>
          </Row>
          </Form>
        </Row>
      </Container>

      <Footer></Footer>
    </>
  );
};

export default EditGoal;
