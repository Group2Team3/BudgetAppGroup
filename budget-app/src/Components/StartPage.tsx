import React, { useState } from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import budgetLogo from "../assets/budgetImages/Piggy2.svg";
import comp from "../assets/budgetImages/blob1.svg";
import { Button, ButtonGroup } from "@mui/material";
import { faMoneyBillWave, faMagnifyingGlassDollar, faHandHoldingDollar, faReceipt } from '@fortawesome/free-solid-svg-icons'
import Cards from "./Card";
import { Footer } from "./Footer";


export const StartPage = () => {
    return (
    <>
      <Navbar >
        <Container>
          <Row className="align-items-center">
            <Col className = "col-md-2">
              <img src={budgetLogo} alt="react logo" className="App-logo" />
            </Col>
            <Col className = "col-md-8">
              <Navbar.Brand className="App-brandName">BudgetApp</Navbar.Brand>
            </Col>
            <Col className = "col-md-2">
            <ButtonGroup className="buttons" variant="text" aria-label="text button group">
                <Button>Logowanie</Button>
                <Button>Rejestracja</Button>
            </ButtonGroup>
            </Col>
          </Row>
        </Container>
      </Navbar>
      <hr className="hr" />
      <Container>
          <Row className="align-items-center left_side">
            <Col className="col-md-6">
              <p className="head"><span className="bold">BudgetApp</span> to narzędzie wspomagające zarządzanie <span className="bold">Twoim budżetem</span></p>
              <p className="body">Załóż konto by wprowadzić swoje przychody i rozchody. Monitoruj ile pieniędzy oszczędzasz miesięcznie, ustaw cel finansowy. 
                Zapisuj paragony, tak by móc zawsze do nich wrócić, oraz dodawaj wartości z tych paraganów na bieżąco do wydatków.</p>
            <Button className="button-check" variant="text" aria-label="text button group">Wypróbuj</Button>
            </Col>
            <Col className="col-md-6">
            <img src={comp} alt="react logo" className="image-comp img-fluid max-width: 100%;" />
            </Col>
          </Row>
          <Row className = "centered-content" style={{ backgroundColor: '#ABABAB' }}>
            <Col className = "col-md-3">
              <Cards iconName={faMoneyBillWave} title={"WPROWADZANIE BUDŻETU"} text={"Przy załóżeniu konta zostaniesz poproszony o podanie szczegółówych informacji dotyczących Twojego budżetu. Te dane zostaną wykorzystane by obliczyć Twoje wydatki, oraz oszczędności w danym miesiącu. W każdym momencie możesz dodać nowy wydatek lub przychód, oraz edytować te, które zostały wprowadzone przez Ciebie wcześniej. "} iconColor={"#76e7cd"}></Cards> 
            </Col>
            <Col className = "col-md-3">
             <Cards iconName={faMagnifyingGlassDollar} title={"TWÓJ BUDŻET"} text={"W oknie “TWÓJ BUDŻET” znajdziesz szczegółowe informacje na temat Twojego budżetu w danym miesiącu. Informacje te zostaną również przedstawione na przydatnych diagramach, by ułatwić Ci zrozumienie Twoich wydatków oraz wyszczególnić na co wydajesz najwięcej. To pomoże Ci lepiej zarządzać budżetem w przyszłości."} iconColor={"#65a3ec"}></Cards> 
            </Col>
            <Col className = "col-md-3">
              <Cards iconName={faHandHoldingDollar} title={"CELE"} text={"Cele to ustawione przez Ciebie plany finansowe. Możesz je tworzyć, edytować oraz monitorować na bieżąco. Po wprowadzeniu kwoty, oraz okresu przeznaczonego na oszczędzanie na dany cel obliczymy jaką kwotę potrzebujesz oszczędzić każdego miesiąca. Twój cel będzie zapisany nawet po minięciu danego okresu, tak byś zawsze mógł sprawdzić ile odłożyłeś."} iconColor={"#9B7EDE"}></Cards> 
            </Col>
            <Col className = "col-md-3">
             <Cards iconName={faReceipt} title={"PARAGONY"} text={"Dodatkową funcjonalnością naszej aplikacji jest zapisywanie Twoich paragonów, oraz automatyczne zczytywanie cen. Ceny te możesz na bieżąco dodawać do wydatków. Paragony są zapisane, tak byś zawsze mógł do nich wrócić. To świetna opcja jeśli nie chcesz się martwić, że któregoś dnia będzie Ci potrzebny paragon do np. zwrotu produktu, a Ty go zgubiłeś. "} iconColor={"#F47C99"}></Cards> 
            </Col>
          </Row>
          </Container>
          <Container>
          <Row>
            <Col className="col-md-12">
            <Footer></Footer>
            </Col>
          </Row>
          </Container>
    </>
    )
}
