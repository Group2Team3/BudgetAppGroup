import "../Style/OutGoes.css";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { MainNavbar } from "./MainNavbar";
import { Footer } from "./Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

interface Outgoes {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;
  description: string;
}

const EditOutgoes = () => {
  const { outgoesId } = useParams();
  const [outgoes, setOutgoes] = useState<Outgoes | null>(null);
  const navigate = useNavigate();
  const [name, setName] = useState(outgoes?.name || "");
  const [description, setDescription] = useState(outgoes?.description || "");
  const [date, setDate] = useState(outgoes?.date || "");
  const [category, setCategory] = useState(outgoes?.category || "");
  const [amount, setAmount] = useState(outgoes?.amount || 0);

  useEffect(() => {

    axios
      .get(`http://localhost:8080/expense/${outgoesId}`)
      .then((response) => {
        setOutgoes(response.data);
        setName(response.data.name);
        setDescription(response.data.description);
        setDate(response.data.date);
        setCategory(response.data.category);
        setAmount(response.data.amount);
      })
      .catch((error) => {
        console.error("Error fetching expanse", error);
      });
  }, [outgoesId]);

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
      .put(`http://localhost:8080/expense/${outgoesId}`, data)
      .then((response) => {
        console.log(response.data);
        navigate("/outgoes_detail");
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
                <Link to="/outgoes_detail" className="link">
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
                    <option value="samochod">pojazd</option>
                    <option value="rachunki">rachunki</option>
                    <option value="koszty zycia">koszty życia</option>
                    <option value="rozrywka">rozrywka</option>
                    <option value="rodzina/zwierzeta">rodzina/zwierzęta</option>
                    <option value="ubezpieczenia/finanse">ubezpieczenia/finanse</option>
                    <option value="transport publiczny">transport publiczny</option>
                    <option value="wakacje">wakacje</option>
                  </Form.Select>
                </Col>
                <Col className="submit-button mb-4">
                  <Button className="some-btn" onClick={handleSubmit}>
                    ZAPISZ WYDATEK
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
export default EditOutgoes;
