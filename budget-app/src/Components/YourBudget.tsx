import "../Style/YourBudget.css";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { MainNavbar } from "./MainNavbar";
import { Footer } from "./Footer";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import { DefaultizedPieValueType } from "@mui/x-charts";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import piggyPhoto from "../assets/budgetImages/piggy_photo.svg";
import finance from "../assets/budgetImages/finance.svg";
import axios from "axios";
import { useEffect, useState } from "react";

interface Budget {
  income: number;
  bills: number;
  costOfLife: number;
  insurance: number;
  family: number;
  car: number;
  publicTrans: number;
  entertainment: number;
  vacations: number;
  expenses: number;
  summary: number; //savings bardziej ale nie bede juz zmieniac
}

interface CalculatedBudget {
  income: number;
  bills: number;
  costOfLife: number;
  insurance: number;
  family: number;
  car: number;
  publicTrans: number;
  entertainment: number;
  vacations: number;
  expenses: number;
  summary: number; 
}


interface Expense {
  id: number;
  name: string;
  category: string;
  description: string;
  amount: number;
  date: Date;
  customer_id: number;
}

const YourBudget = () => {
  const userId = Number(localStorage.getItem("userId"));
  const Budget_acc_id = userId;
  const [currentBudget, setCurrentBudget] = useState<Budget | null>(null);
  const [currentCalculatedBudget, setCurrentCalculatedBudget] = useState<CalculatedBudget | null>(null);
  const [currentExpenses, setCurrentExpenses] = useState<Expense[] | null>(
    null
  );

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/budget/${Budget_acc_id}`
        );
        setCurrentBudget(response.data[0]);
        localStorage.setItem("budgetId", response.data[0].id);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching budget", error);
      }
    };

    console.log("Budzet", currentBudget);
    fetchBudget();
  }, [Budget_acc_id]);

  useEffect(() => {
    const fetchCalculatedBudget = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/budget/calculatedBudget/${Budget_acc_id}`
        );
        setCurrentCalculatedBudget(response.data[0]);
        console.log("Calculated budget", response.data);
      } catch (error) {
        console.error("Error fetching budget", error);
      }
    };

    console.log("Budzet obliczony", currentCalculatedBudget);
    fetchCalculatedBudget();
  }, [Budget_acc_id]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/expense/customerId/${Budget_acc_id}`
        );
        setCurrentExpenses(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching expenses", error);
      }
    };

    fetchExpenses();
  }, [Budget_acc_id]);


  //jezeli w db nie ma informacji na temat budzetu
  if (currentBudget === null) {
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
        <p className="description py-5 text-center">
          <b>
            Nie wprowadziłeś jeszcze danych dotyczących budżetu w tym miesiącu!
          </b>{" "}
          Możesz to zrobić przechodząc tutaj:{" "}
          <Link to="/addbudgetinfo" className="link">
            DODAWANIE BUDŻETU
          </Link>
        </p>
        <Col className="col-md-12 text-center justify-content-center align-items-center my-5">
          <img src={finance} alt="Piggy photo" className="img-fluid" />
        </Col>
        <Footer></Footer>
      </>
    );
  }

  if (currentCalculatedBudget === null) {
    return (<p> Pusto </p>)
  }

  if (currentExpenses === null) {
    return (<p>Pusto</p>)
  }

  const expenses = currentCalculatedBudget.expenses;
  const savings = currentCalculatedBudget.summary;
  const income = currentCalculatedBudget.income;
  const expenses_prc: number = (expenses / income) * 100;
  const savings_prc: number = (savings / income) * 100;


  /* sortowanie tak by podane byly tylko expenses z tego miesiaca */
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const currentMonthExpenses = currentExpenses
  .filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  })
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  console.log("Sorted and filtered", currentMonthExpenses);

  /* wydatki w poszczegolnych kategoriach z tabeli expense by dodac do pie chart */
  const bills_exp = currentMonthExpenses
  .filter(expense => expense.category === "rachunki")
  .reduce((total, expense) => total + expense.amount, 0);

  const cost_of_life_exp = currentMonthExpenses
  .filter(expense => expense.category === "koszty życia")
  .reduce((total, expense) => total + expense.amount, 0);

  const car_exp = currentMonthExpenses
  .filter(expense => expense.category === "samochód")
  .reduce((total, expense) => total + expense.amount, 0);

  const enterteinment_exp = currentMonthExpenses
  .filter(expense => expense.category === "rozrywka")
  .reduce((total, expense) => total + expense.amount, 0);

  const family_exp = currentMonthExpenses
  .filter(expense => expense.category === "rodzina/zwierzęta")
  .reduce((total, expense) => total + expense.amount, 0);

  const insurance_exp = currentMonthExpenses
  .filter(expense => expense.category === "ubezpieczenia/finanse")
  .reduce((total, expense) => total + expense.amount, 0);

  const public_trans_exp = currentMonthExpenses
  .filter(expense => expense.category === "transport publiczny")
  .reduce((total, expense) => total + expense.amount, 0);

  const vacations_exp = currentMonthExpenses
  .filter(expense => expense.category === "wakacje")
  .reduce((total, expense) => total + expense.amount, 0);

  const bills = currentBudget.bills + bills_exp;
  const cost_of_life = currentBudget.costOfLife + cost_of_life_exp;
  const insurance = currentBudget.insurance + insurance_exp;
  const family = currentBudget.family + family_exp;
  const car = currentBudget.car + car_exp;
  const public_trans = currentBudget.publicTrans + public_trans_exp;
  const entertainment = currentBudget.entertainment + enterteinment_exp;
  const vacations = currentBudget.vacations + vacations_exp;

  // Pie Chart
  const data = [
    { id: "1", label: `RACHUNKI`, value: bills, color: "#D4686F" },
    { id: "2", label: "KOSZTY ŻYCIA", value: cost_of_life, color: "#76E7CD" },
    {
      id: "3",
      label: "UBEZPIECZENIA/FINANSE",
      value: insurance,
      color: "#76E423",
    },
    { id: "4", label: "RODZINA/ZWIERZĘTA", value: family, color: "#9B7EDE" },
    {
      id: "5",
      label: "KOSZTY UTRZYMANIA POJAZDU",
      value: car,
      color: "#65A3EC",
    },
    {
      id: "6",
      label: "TRANSPORT PUBLICZNY",
      value: public_trans,
      color: "#65342a",
    },
    { id: "7", label: "ROZRYWKA", value: entertainment, color: "#F47C99" },
    { id: "8", label: "WAKACJE", value: vacations, color: "#F47329" },
  ];

  //CUSTOM SIZINGS FOR PIE AND BAR CHART DEPENDING ON SCREEN SIZE
  let width,
    height,
    fontSize,
    outerRadius,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    fontSize_prc,
    width_bar,
    height_bar;
  if (window.innerWidth > 1700) {
    width = 1000;
    height = 480;
    outerRadius = 200;
    fontSize = 20;
    marginTop = 100;
    marginBottom = 100;
    marginLeft = -400;
    marginRight = 100;
    fontSize_prc = 25;
    width_bar = 820;
    height_bar = 400;
  } else if (window.innerWidth > 1000) {
    width = 800;
    height = 430;
    outerRadius = 170;
    fontSize = 18;
    marginTop = 70;
    marginBottom = 70;
    marginLeft = -300;
    marginRight = 70;
    fontSize_prc = 22;
    width_bar = 700;
    height_bar = 400;
  } else if (window.innerWidth > 700) {
    width = 600;
    height = 400;
    outerRadius = 130;
    fontSize = 15;
    marginTop = 50;
    marginBottom = 50;
    marginLeft = -200;
    marginRight = 50;
    fontSize_prc = 16;
    width_bar = 450;
    height_bar = 400;
  } else if (window.innerWidth > 400) {
    width = 450;
    height = 300;
    outerRadius = 80;
    fontSize = 6;
    marginTop = 20;
    marginBottom = 20;
    marginLeft = -200;
    marginRight = 50;
    fontSize_prc = 10;
    width_bar = 400;
    height_bar = 400;
  } else {
    width = 400;
    height = 300;
    outerRadius = 100;
    fontSize = 6;
    marginTop = 20;
    marginBottom = 20;
    marginLeft = -200;
    marginRight = 50;
    fontSize_prc = 10;
    width_bar = 300;
    height_bar = 300;
  }

  const sizing = {
    width: width,
    height: height,
  };

  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  //Bar chart
  const chartSetting = {
    width: width_bar,
    height: height_bar,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-10px, 0)",
      },
    },
  };

  const dataset = currentMonthExpenses
    ? currentMonthExpenses
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map((expense) => ({
            expenses: expense.amount,
            day: new Date(expense.date).getDate(),
        }))
    : [];

  const valueFormatter = (value: number) => `${value} zł`;

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
        {currentBudget === null ? (
          <>
            <p className="description">
              Jeśli nie wprowadziłeś jeszcze danych dotyczących budżetu w tym
              miesiącu możesz to zrobić przechodząc tutaj:{" "}
              <Link to="/addbudgetinfo" className="link">
                DODAWANIE BUDŻETU
              </Link>
            </p>
          </>
        ) : (
          <Row>
            <p className="description text-center">
              Jeśli chcesz zaaktualizować dane dotyczące budżetu w tym miesiącu
              możesz to zrobić przechodząc tutaj:{" "}
              <Link to={`/editbudgetinfo/${userId}`} className="link">
                EDYCJA BUDŻETU
              </Link>
            </p>
            <Col className="col-md-12 text-center justify-content-center align-items-center">
              <h5>
                Twoj budżet w miesiącu{" "}
                <span className="month">
                  {format(new Date(), "LLLL", { locale: pl })}
                </span>
              </h5>
              <Col className="col-md-8 mx-auto mb-5">
                <ProgressBar>
                  <ProgressBar
                    variant="danger"
                    now={expenses_prc}
                    key={1}
                    label={`${expenses_prc.toFixed(1)}%`}
                  />
                  <ProgressBar
                    variant="success"
                    now={savings_prc}
                    key={2}
                    label={`${savings_prc.toFixed(1)}%`}
                  />
                </ProgressBar>
              </Col>
              <p className="see">
                Zobacz na co wydałeś pieniądze w tym miesiącu
              </p>
              {data && data.length > 0 && (
                <Col className="col-md-8 mx-auto mb-5">
                  <PieChart
                    margin={{
                      top: marginTop,
                      bottom: marginBottom,
                      left: marginLeft,
                      right: marginRight,
                    }}
                    series={[
                      {
                        outerRadius: outerRadius,
                        data,
                        arcLabel: getArcLabel,
                      },
                    ]}
                    sx={{
                      [`& .${pieArcLabelClasses.root}`]: {
                        fill: "white",
                        fontSize: fontSize_prc,
                      },
                    }}
                    slotProps={{
                      legend: {
                        direction: "column",
                        position: { vertical: "middle", horizontal: "right" },
                        padding: 50,
                        labelStyle: {
                          fontSize: fontSize,
                          fontWeight: 900,
                        },
                      },
                    }}
                    {...sizing}
                  />
                </Col>
              )}

              <Col className="col-md-8 mx-auto mb-5">
                <Accordion defaultActiveKey="0" flush>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      SZCZEGÓŁOWE WYDATKI W TYM MIESIĄCU{" "}
                    </Accordion.Header>
                    {/* BAR CHART */}
                    <Accordion.Body>
                      {dataset && dataset.length > 0 ? (
                        <BarChart
                          dataset={dataset}
                          xAxis={[
                            {
                              scaleType: "band",
                              dataKey: "day",
                              label: "DZIEŃ MIESIĄCA",
                            },
                          ]}
                          yAxis={[
                            {
                              label: "KWOTA",
                            },
                          ]}
                          series={[
                            {
                              dataKey: "expenses",
                              label: "Wydatki",
                              valueFormatter,
                              color: "#9B7EDE",
                            },
                          ]}
                          {...chartSetting}
                        />
                      ) : (
                        <>
                          <p className="description">
                            {" "}
                            Nie dodałeś jeszcze żadnego wydatku w tym miesiącu.{" "}
                          </p>
                        </>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
              <Row className="mb-5 text-start">
                <Col className="col-md-7 mb-5">
                  <img
                    src={piggyPhoto}
                    alt="Piggy photo"
                    className="img-fluid"
                  />
                </Col>
                <Col className="col-md-5">
                  <h5>
                    W miesiącu&nbsp;
                    {format(new Date(), "LLLL", { locale: pl })}&nbsp; zaoszczędziłeś{" "}
                    <span className="purple">{currentCalculatedBudget.summary.toFixed(2)} zł</span>! Trzymaj tak
                    dalej a w skali roku jesteś w stanie oszczędzić{" "}
                    <span className="purple">{(currentCalculatedBudget.summary * 12).toFixed(2)} zł</span>.
                  </h5>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Container>

      <Footer></Footer>
    </>
  );
};

export default YourBudget;
