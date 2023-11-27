import "../Style/OutGoes.css";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { MainNavbar } from "./MainNavbar";
import { Footer } from "./Footer";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddIncome = () => {
  const budgetId = Number(localStorage.getItem("budgetId"));

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const formData = {
      name,
      date,
      category,
      amount,
      description,
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/income/${budgetId}`,
        formData
      );
      console.log(response.data);
      navigate("/incomes");
    } catch (error) {
      console.error(error);
    }
  };

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
            <Form className="d-flex justify-content-space-between"
              onSubmit={handleSubmit}>
            <Col className="col-sm-12 col-md-5 mx-3">
              <Col>
                <Form.Label>NAZWA</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Control
                  type="text"
                  placeholder="krótka nazwa Twojego przychodu"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Col>

              <Col>
                <Form.Label>DATA</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Control type="date"
                value={date} onChange={(e) => setDate(e.target.value)}/>
              </Col>
              <Col>
                <Form.Label>OPIS</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Control as="textarea" rows={6} placeholder="krótki opis przychodu" value={description} onChange={(e) => setDescription(e.target.value)} />
              </Col>
            </Col>

            <Col className="col-sm-12 col-md-5 mx-3">
              <Col>
                <Form.Label>KWOTA</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Control
                  type="number"
                  max={100000}
                  step={10}
                  placeholder="kwota przychodu"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                />
              </Col>

              <Col>
                <Form.Label>KATEGORIA</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Select aria-label="Default select example" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="wyplata">wypłata</option>
                  <option value="zarobki z samozatrudnienia">zarobki z samozatrudnienia</option>
                  <option value="zasilki/zapomogi">zasiłki/zapomogi</option>
                  <option value="stypendia">stypendia</option>
                  <option value="inne">inne</option>
                </Form.Select>
              </Col>
              <Col className="submit-button mb-4">
                <Button className="some-btn" type="submit">DODAJ NOWY PRZYCHÓD</Button>
            </Col>
            </Col>
            </Form>
          </Row>
          <Row>
            
          </Row>
        </Row>
      </Container>
      <Footer></Footer>
    </>)
}
export default AddIncome