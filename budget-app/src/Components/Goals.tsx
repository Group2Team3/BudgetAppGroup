import "../Style/Goals.css";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { MainNavbar } from "./MainNavbar";
import { Footer } from "./Footer";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlaneUp,
  faPencil,
  faCar,
  faGift,
  faBatteryEmpty,
  faStethoscope,
  faHouse,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { differenceInMonths, differenceInWeeks, parseISO } from "date-fns";

interface Goal {
  id: number;
  name: string;
  category: string;
  description: string;
  amount: number;
  dateFrom: Date;
  dateTo: Date;
  saved: number;
  endDate: string;
  timePassed: boolean;
  accomplished: boolean;
  timeLeft: Date;
  customer_id: number;
}

const Goals = () => {
  const userId = Number(localStorage.getItem("userId"));

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date_to, setDate_to] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });
  const [description, setDescription] = useState("");
  const [saved, setSaved] = useState("");
  const [goals, setGoals] = useState<Goal[]>([]);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    console.log("Form submitted");
    event.preventDefault();

    const formData = {
      name,
      dateTo: date_to,
      category,
      amount,
      description,
      saved,
      dateFrom: new Date(),
      customer_id: userId,
    };
    console.log(formData);

    try {
      const response = await axios.post(
        `http://localhost:8080/goal/${userId}`,
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        //const response = await axios.get(`http://localhost:8080/goal/customer/${userId}`); NIE DZIALA CZEKAM NA ENDPOINT
        const response = await axios.get(`http://localhost:8080/goal`);
        setGoals(response.data);
        console.log("Data", response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGoals();
  }, []);

  const getIconForCategory = (category: any) => {
    switch (category) {
      case "wakacje":
        return faPlaneUp;
      case "samochod":
        return faCar;
      case "prezent":
        return faGift;
      case "zdrowie":
        return faStethoscope;
      case "dom":
        return faHouse;
      case "inne":
        return faStar;
      default:
        return faBatteryEmpty;
    }
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
          <Row className="row-goals">
            <Form
              className="d-flex justify-content-space-between"
              onSubmit={handleSubmit}
            >
              <Col className="col-md-5 col-sm-12 mx-3">
                <Col>
                  <Form.Label>NAZWA</Form.Label>
                </Col>
                <Col className="mb-5">
                  <Form.Control
                    type="text"
                    placeholder="krótka nazwa Twojego celu"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Col>

                <Col>
                  <Form.Label>DO KIEDY</Form.Label>
                </Col>
                <Col className="mb-5">
                  <Form.Control
                    type="date"
                    value={date_to}
                    onChange={(e) => setDate_to(e.target.value)}
                    required
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

              <Col className="col-md-5 col-sm-12 mx-3">
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
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Col>

                <Col>
                  <Form.Label>KWOTA ZAOSZCZĘDZONA</Form.Label>
                </Col>
                <Col className="mb-5">
                  <Form.Control
                    type="number"
                    min={0}
                    max={100000}
                    step={10}
                    placeholder="kwota, którą odłożyłeś do tej pory"
                    value={saved}
                    onChange={(e) => setSaved(e.target.value)}
                  />
                </Col>

                <Col>
                  <Form.Label>OPIS</Form.Label>
                </Col>
                <Col className="mb-5">
                  <Form.Control
                    as="textarea"
                    rows={6}
                    placeholder="Opis"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Col>

                <Col className="submit-button">
                  <Button className="some-btn" type="submit">
                    DODAJ CEL
                  </Button>
                </Col>
              </Col>
            </Form>
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
                  {goals
                    .filter((goal) => goal.timePassed === false)
                    .map((goal) => (
                      <Row className="current-goal mb-4" key={goal.id}>
                        <Col className="col-md-4 text-center d-flex justify-content-center">
                          <FontAwesomeIcon
                            icon={getIconForCategory(goal.category)}
                            className="plane-icon"
                          />
                        </Col>
                        <Col className="col-md-4 text-start">
                          <h4>{goal.name.toUpperCase()}</h4>
                          <p className="description-goal">
                            {goal.description.toUpperCase()}
                          </p>
                          <div style={{ display: "flex" }}>
                            <p className="pink">POZOSTAŁO:&nbsp;</p>{" "}
                            <p className="details-goal">
                              {" "}
                              {(() => {
                                const dateFrom = parseISO(
                                  goal.dateFrom.toString().slice(0, 10)
                                );
                                const dateTo = parseISO(
                                  goal.dateTo.toString().slice(0, 10)
                                );
                                const diffMonths = differenceInMonths(
                                  dateTo,
                                  dateFrom
                                );
                                const diffWeeks = differenceInWeeks(
                                  dateTo,
                                  dateFrom
                                );
                                return diffMonths >= 1
                                  ? `${diffMonths} MIESIĘCY`
                                  : `${diffWeeks} TYGODNI`;
                              })()}
                            </p>
                          </div>
                          <div style={{ display: "flex" }}>
                            <p className="pink">ODŁOŻONO:&nbsp;</p>{" "}
                            <p className="details-goal"> {goal.saved} zł</p>
                          </div>
                          <div style={{ display: "flex" }}>
                            <p className="pink">DATA KOŃCOWA:&nbsp;</p>
                            <p className="details-goal">
                              {" "}
                              {goal.dateTo.toString().slice(0, 10)}
                            </p>
                          </div>
                        </Col>
                        <Col className="col-md-4 text-end">
                          <p className="green">{goal.amount} zł</p>
                        </Col>
                        <Col className="col-md-12 text-start">
                          <p className="goal-savings">
                            ŻEBY ZDOBYĆ TEN CEL{" "}
                            {(() => {
                              const dateFrom = parseISO(
                                goal.dateFrom.toString().slice(0, 10)
                              );
                              const dateTo = parseISO(
                                goal.dateTo.toString().slice(0, 10)
                              );
                              const diffMonths = differenceInMonths(
                                dateTo,
                                dateFrom
                              );
                              const diffWeeks = differenceInWeeks(
                                dateTo,
                                dateFrom
                              );
                              let amountPerPeriod = 0;
                              let period = "";

                              if (diffMonths >= 1) {
                                amountPerPeriod = (goal.amount - goal.saved) / diffMonths;
                                period = `MIESIĘCZNIE POWINIENEŚ ODKŁADAĆ: `;
                              } else {
                                amountPerPeriod = (goal.amount - goal.saved) / diffWeeks;
                                period = `TYGODNIOWO POWINIENEŚ ODKŁADAĆ: `;
                              }

                              return period;
                            })()}
                            <span className="how-much-savings">
                              {" "}
                              {(() => {
                                const dateFrom = parseISO(
                                  goal.dateFrom.toString().slice(0, 10)
                                );
                                const dateTo = parseISO(
                                  goal.dateTo.toString().slice(0, 10)
                                );
                                const diffMonths = differenceInMonths(
                                  dateTo,
                                  dateFrom
                                );
                                const diffWeeks = differenceInWeeks(
                                  dateTo,
                                  dateFrom
                                );
                                let amountPerPeriod = 0;

                                if (diffMonths >= 1) {
                                  amountPerPeriod = (goal.amount - goal.saved) / diffMonths;
                                } else {
                                  amountPerPeriod = (goal.amount - goal.saved) / diffWeeks;
                                }

                                return amountPerPeriod.toFixed(2);
                              })()}
                            </span>
                          </p>
                          <Col>
                            <Form /* Tu jak bedzie juz put bedziemy updatetowac goal.amount w db */
                            >
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
                                      min={0}
                                      max={1000000}
                                      step={10}
                                      placeholder="kwota"
                                    />
                                  </Col>
                                  <Col className="col-md-4">
                                    <Button className="some-other-btn">
                                      DODAJ
                                    </Button>
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Form>
                          </Col>
                          <Col className="text-end mx-2 pencil-col">
                            <Link to={`/editgoal/${goal.id}`}>
                              <FontAwesomeIcon
                                icon={faPencil}
                                className="pencil"
                              />
                            </Link>
                          </Col>
                        </Col>
                      </Row>
                    ))}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>CELE Z PRZESZŁOŚCI</Accordion.Header>
                <Accordion.Body>
                  {goals.filter((goal) => goal.timePassed === true).length >
                  0 ? (
                    goals
                      .filter((goal) => goal.timePassed === true)
                      .map((goal) => (
                        <Row className="current-goal mb-4" key={goal.id}>
                          <Col className="col-md-4 text-center d-flex justify-content-center">
                            <FontAwesomeIcon
                              icon={getIconForCategory(goal.category)}
                              className="plane-icon"
                            />
                          </Col>
                          <Col className="col-md-6 text-start">
                            <h4>{goal.name.toUpperCase()}</h4>
                            <p className="description-goal">
                              {goal.description.toUpperCase()}
                            </p>
                            <div style={{ display: "flex" }}>
                              <p className="pink">CEL: </p>
                              <span className="details-goal">
                                {" "}
                                &nbsp;{goal.amount} zł
                              </span>
                            </div>
                            <div style={{ display: "flex" }}>
                              <p className="pink">ODŁOŻONO:</p>{" "}
                              <p className="details-goal">
                                {" "}
                                &nbsp;{goal.saved} zł
                              </p>
                            </div>
                            <div style={{ display: "flex" }}>
                              <p className="pink">DATA KOŃCOWA:</p>{" "}
                              <p className="details-goal">
                                &nbsp;{goal.dateTo.toString().slice(0, 10)}
                              </p>
                            </div>
                          </Col>
                          <Col className="col-md-12 text-start">
                            <p className="goal-savings">
                              CZY UDAŁO CI SIĘ ZDOBYĆ TEN CEL:
                              {goal.accomplished ? (
                                <span className="green2"> TAK </span>
                              ) : (
                                <span className="red"> NIE </span>
                              )}
                            </p>
                          </Col>
                          <Col className="text-end mx-2 pencil-col">
                            <Link to={`/editgoal/${goal.id}`}>
                              <FontAwesomeIcon
                                icon={faPencil}
                                className="pencil"
                              />
                            </Link>
                          </Col>
                        </Row>
                      ))
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

      <Footer></Footer>
    </>
  );
};

export default Goals;
