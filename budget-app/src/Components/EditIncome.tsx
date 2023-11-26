import "../Style/OutGoes.css";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { MainNavbar } from "./MainNavbar";
import { Footer } from "./Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

interface Income {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;
  description: string;
}

const EditIncome = () => {
  const { incomeId } = useParams();
  const [income, setIncome] = useState<Income | null>(null);
  const navigate = useNavigate();
  const [name, setName] = useState(income?.name || "");
  const [description, setDescription] = useState(income?.description || "");
  const [date, setDate] = useState(income?.date || "");
  const [category, setCategory] = useState(income?.category || "");
  const [amount, setAmount] = useState(income?.amount || 0);

  useEffect(() => {

    axios
      .get(`http://localhost:8080/income/${incomeId}`)
      .then((response) => {
        setIncome(response.data);
        setName(response.data.name);
        setDescription(response.data.description);
        setDate(response.data.date);
        setCategory(response.data.category);
        setAmount(response.data.amount);
      })
      .catch((error) => {
        console.error("Error fetching income", error);
      });
  }, [incomeId]);

  const handleSubmit = () => {
    const data = {
      name: name,
      description: description,
      date: date,
      category: category,
      amount: amount
    };

    console.log("DATA", data);

    axios
      .put(`http://localhost:8080/income/${incomeId}`, data)
      .then((response) => {
        console.log(response.data);
        navigate("/incomes");
      })
      .catch((error) => {
        console.error("Error posting income!", error);
      });
  };

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
          <Form>
            <Col className="col-md-12">
              <p className="description">
                Edytujesz przychód. Jeśli chcesz wrócić do Twoich przychodów{" "}
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
                    name="name"
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Col>

                <Col>
                  <Form.Label>DATA</Form.Label>
                </Col>
                <Col className="mb-5">
                  <Form.Control
                    type="date"
                    defaultValue={date}
                    onChange={(e) => setDate(e.target.value)}
                    name="date"
                  />
                </Col>
                <Col>
                  <Form.Label>OPIS</Form.Label>
                </Col>
                <Col className="mb-5">
                  <Form.Control
                    as="textarea"
                    rows={6}
                    defaultValue={description}
                    onChange={(e) => setDescription(e.target.value)}
                    name="description"
                  />
                </Col>
              </Col>

              <Col className="col-sm-12 col-md-5 mx-3">
                <Col>
                  <Form.Label>KWOTA</Form.Label>
                </Col>
                <Col className="mb-5">
                  <Form.Control
                    type="number"
                    min={1}
                    max={100000}
                    step={1}
                    defaultValue={amount || ""}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    name="amount"
                  />
                </Col>

                <Col>
                  <Form.Label>KATEGORIA</Form.Label>
                </Col>
                <Col className="mb-5">
                  <Form.Select
                    aria-label="Default select example"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    name="category"
                  >
                    <option value="wyplata">wypłata</option>
                    <option value="zarobki z samozatrudnienia">
                      zarobki z samozatrudnienia
                    </option>
                    <option value="zasilki/zapomogi">zasiłki/zapomogi</option>
                    <option value="stypendia">stypendia</option>
                    <option value="inne">inne</option>
                  </Form.Select>
                </Col>
                <Col className="submit-button mb-4">
                  <Button className="some-btn" onClick={handleSubmit}>
                    ZAPISZ PRZYCHÓD
                  </Button>
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
export default EditIncome;
