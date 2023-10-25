import { Col, Container, Row } from "react-bootstrap";
import comp from "../assets/budgetImages/blob1.svg";
import { Button } from "@mui/material";
import { faMoneyBillWave, faMagnifyingGlassDollar, faHandHoldingDollar, faReceipt } from '@fortawesome/free-solid-svg-icons'
import Cards from "./Card";
import { Footer } from "./Footer";
import '../Style/StartPage.css';
import { MainNavbar } from "./MainNavbar";


export const StartPage = () => {
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
          <Row className="align-items-center left_side">
            <Col className="col-md-5">
             <Row><p className="head px-5"><span className="bold">BudgetApp</span> to narzędzie wspomagające zarządzanie <span className="bold">Twoim budżetem</span></p></Row> 
             <Row>  <p className="justify-content-left body pt-3 ps-5">Załóż konto by wprowadzić swoje przychody i rozchody. Monitoruj ile pieniędzy oszczędzasz miesięcznie, ustaw cel finansowy. 
                Zapisuj paragony, tak by móc zawsze do nich wrócić, oraz dodawaj wartości z tych paraganów na bieżąco do wydatków.</p></Row> 
                <Row  className="justify-content-center pt-4"> <Button className="button" variant="contained">Wypróbuj</Button></Row> 
            </Col>
            <Col className="col-md-7">
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

            <Footer></Footer>
    </>
    )
}
