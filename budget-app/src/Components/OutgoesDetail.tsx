import { Col, Container, Row } from "react-bootstrap";
import { MainNavbar } from "./MainNavbar";
import { Footer } from "./Footer";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faFileInvoiceDollar, faCartShopping, faCarOn, faGamepad, faPaw, faHouseCrack, faTrainTram, faUmbrellaBeach, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

interface Expense {
  id: number;
  name: string;
  category: string;
  description: string;
  amount: number;
  date: Date;
  customer_id: number;
}

const Outgoes = () => {
  const [expense, setExpense] = useState<Expense[]>([]);
  const userId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/expense/customerId/${userId}`);
        setExpense(response.data);
        console.log("Data", response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExpense();
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

  const groupedData = groupByMonth(expense);
  console.log("Grouped data", groupedData);

  const getIconForCategory = (category: any) => {
    switch (category) {
      case "rachunki":
        return faFileInvoiceDollar;
      case "samochod":
        return faCarOn;
      case "koszty zycia":
        return faCartShopping;
      case "rozrywka":
        return faGamepad;
      case "rodzina/zwierzeta":
        return faPaw;
      case "ubezpieczenia/finanse":
        return faHouseCrack;
      case "transport publiczny":
        return faTrainTram;
      case "wakacje":
        return faUmbrellaBeach;
      default:
        return faMoneyBill;
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
              Tutaj możesz przejrzeć swoje{" "}
              <span className="thick">wydatki</span> posortowane od najnowszego
              do najstarszego. W celu dodania nowego wydatków kliknij przycisk
              poniżej. Jeśli chcesz edytować istniejący już wydatek kliknij
              ikonę ołówka.
            </p>
            <Col className="text-center">
            <Link to="/outgoes"><Button className="some-btn">DODAJ NOWY WYDATEK</Button></Link>
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
                  {groupedData[month].map((item: { id:number; name: string; category: string; description: string; amount: number; date: Date; }) => (
                    <Row className="current-goal pb-0">
                        <div className="badge-right"></div>
                      <Col className="col-md-4 text-center d-flex justify-content-center">
                        <FontAwesomeIcon icon={getIconForCategory(item.category)} className="plane-icon" />
                      </Col>
                      <Col className="col-md-4 text-start">
                        <h4>{item.name.toUpperCase()}</h4>
                        <p className="description-goal">{item.description.toUpperCase()}</p>
                      </Col>
                      <Col className="col-md-4 text-end">
                        <p className="red-b">-{item.amount} zł</p>
                      </Col>
                      <Col className="col-md-6 text-end">
                        <p style={{ color: "gray", fontSize: "1.2em" }}>
                        {item.date.toString().slice(0, 10)}
                        </p>
                      </Col>
                      <Col className="col-md-12 text-end mx-2 pencil-col">
                        <Link to={`/outgoes_edit/${item.id}`}>
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
  );
};
export default Outgoes;
