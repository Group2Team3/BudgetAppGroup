import { Col, Container, Row } from "react-bootstrap";
import { MainNavbar } from "./MainNavbar";
import { Footer } from "./Footer";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faFilm, faMoneyCheckDollar, faCreditCard, faHandHoldingDollar, faCashRegister, faMoneyBillWave, faCoins, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

interface Income {
  id: number;
  name: string;
  category: string;
  description: string;
  amount: number;
  date: Date;
  customer_id: number;
}


const Incomes = () => {
  const [income, setIncome] = useState<Income[]>([]);
  const userId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/income/customerId/${userId}`);
        setIncome(response.data);
        console.log("Data", response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIncome();
  }, []);

  const monthNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
  
  function groupByMonth(data: any[]) {
    return data.reduce((acc: any[][], item: { date: string | number | Date; }) => {
      const month = new Date(item.date).getMonth();
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(item);
      return acc;
    }, {});
  }

  const groupedData = groupByMonth(income);
  console.log("Grouped data", groupedData);

  const getIconForCategory = (category: any) => {
    switch (category) {
      case "wyplata":
        return faCreditCard;
      case "zarobki z samozatrudnienia":
        return faCashRegister;
      case "zasilki/zapomogi":
        return faHandHoldingDollar;
      case "stypendia":
        return faMoneyBillWave;
      case "inne":
        return faCoins;
      default:
        return faMoneyBill;
    }
  };

    return (
        <>
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
              Tutaj możesz przejrzeć swoje <span className="thick">przychody</span>  posortowane od najnowszego do najstarszego. 
              W celu dodania nowego przychodu kliknij przycisk poniżej. Jeśli chcesz edytować istniejący już przychód kliknij ikonę ołówka. 
            </p>
            <Col className="text-center">
            <Link to="/income_add"><Button className="some-btn">DODAJ NOWY PRZYCHÓD</Button></Link>
            </Col>
          </Col>
        </Row>
        <Container>
          <Row className="d-flex justify-content-center">
            <Col className="col-sm-12 col-md-8 text-center m-5">
              <Accordion defaultActiveKey="0" className="mb-5">
              {Object.keys(groupedData).map((month) => ( 
                <Accordion.Item eventKey={month}>
                  <Accordion.Header>{monthNames[Number(month)]}</Accordion.Header>
                  <Accordion.Body>
                  {groupedData[month].map((item: { name: string; category: string; description: string; amount: number; date: Date; }) => ( 
                    <Row className="current-goal pb-0">
                        <div className="badge-right-green"></div>
                      <Col className="col-md-4 text-center d-flex justify-content-center">
                        <FontAwesomeIcon icon={getIconForCategory(item.category)} className="money-icon" />
                      </Col>
                      <Col className="col-md-4 text-start">
                        <h4>{item.name.toUpperCase()}</h4>
                        <p className="description-goal">{item.description.toUpperCase()}</p>
                      </Col>
                      <Col className="col-md-4 text-end">
                        <p className="green">{item.amount} zł</p>
                      </Col>
                      <Col className="col-md-6 text-end">
                        <p style={{ color: "gray", fontSize: "1.2em" }}>
                          {item.date.toString().slice(0, 10)}
                        </p>
                      </Col>
                      <Col className="col-md-12 text-end mx-2 pencil-col">
                        <Link to="/income_edit">
                          <FontAwesomeIcon icon={faPencil} className="pencil" />
                        </Link>
                      </Col>
                    </Row>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
                ))}
              </Accordion>
            </Col>
          </Row>
        </Container>
      </Container>
      <Footer></Footer>
    </>
        </>
    )
}

export default Incomes