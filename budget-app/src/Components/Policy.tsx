import "../Style/Policy.css";
import { Col, Container, Row, Modal } from "react-bootstrap";
import { MainNavbar } from "./MainNavbar";
import { Footer } from "./Footer";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

const Policy = () => {
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
          <Col className="col-md-12 text-center m-4">
            <h2 className="policy-header">Polityka prywatności</h2>
          </Col>

          <Col className="col-md-12 mb-5">
            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title className="text-center">Informacje ogólne</Card.Title>
                  <Card.Text>
                  <p>Niniejsza polityka dotyczy Serwisu www, funkcjonującego pod adresem url: 
                  example.com</p> 
                  <p>Operatorem serwisu oraz Administratorem danych osobowych jest: 
                  Grupa 3 </p>
                  <p>Adres kontaktowy poczty elektronicznej operatora: example@email.com</p>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title className="text-center">Wybrane metody ochrony danych stosowane przez Operatora</Card.Title>
                  <Card.Text>
                  Miejsca logowania i wprowadzania danych osobowych są chronione w warstwie transmisji (certyfikat SSL). Dzięki temu dane osobowe, wprowadzone na stronie, zostają zaszyfrowane w komputerze użytkownika i mogą być odczytane jedynie na docelowym serwerze.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title className="text-center">Informacje w formularzach</Card.Title>
                  <Card.Text>
                  Serwis zbiera informacje podane dobrowolnie przez użytkownika, w tym dane osobowe, 
                  o ile zostaną one podane. Dane podane w formularzu są przetwarzane w celu 
                  wynikającym z funkcji konkretnego formularza (dodawanie informacji na temat budżetu). 
                  Opis formularza w czytelny sposób informuje, do czego on służy.
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardGroup>
            <CardGroup>
              <Card>
                <Card.Body>
                    <Card.Title className="text-center">Logi Administratora</Card.Title>
                  <Card.Text>
                  Informacje zachowaniu użytkowników w serwisie mogą podlegać logowaniu. Dane te są wykorzystywane w celu administrowania serwisem.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title className="text-center">Twoje prawa i dodatkowe informacje o sposobie wykorzystania danych</Card.Title>
                  <Card.Text>
                  Przysługuje Ci prawo żądania od Administratora:
                    <ul>
                        <li>dostępu do danych osobowych Ciebie dotyczących,</li>
                        <li>ich sprostowania,</li>
                        <li>usunięcia,</li>
                        <li>ograniczenia przetwarzania,</li>
                        <li>oraz przenoszenia danych</li>
                    </ul>

                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title className="text-center">Hosting</Card.Title>
                  <Card.Text>
                  Serwis jest hostowany (technicznie utrzymywany) na serwerach operatora: jakis_operator.com
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardGroup>
            <CardGroup>
              <Card>
                <Card.Body>
                    <Card.Title className="text-center">Istotne techniki marketingowe</Card.Title>
                  <Card.Text>
                  Operator stosuje analizę statystyczną ruchu na stronie, poprzez Google Analytics (Google Inc. z siedzibą w USA). 
                  Operator nie przekazuje do operatora tej usługi danych osobowych, a jedynie 
                  zanonimizowane informacje. Usługa bazuje na wykorzystaniu ciasteczek w 
                  urządzeniu końcowym użytkownika. W zakresie informacji o preferencjach 
                  użytkownika gromadzonych przez sieć reklamową Google użytkownik może przeglądać 
                  i edytować informacje wynikające z plików cookies przy pomocy narzędzia: 
                  <a href='https://myadcenter.google.com/home?hl=pl&sasb=true&ref=ad-settings' className="policy-link"> Ustawienia reklam Google</a>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title className="text-center">Zarządzanie plikami cookies</Card.Title>
                  <Card.Text>
                  <p>Jeśli użytkownik nie chce otrzymywać plików cookies, może zmienić ustawienia przeglądarki. Zastrzegamy, że wyłączenie obsługi plików cookies niezbędnych dla procesów uwierzytelniania, bezpieczeństwa, utrzymania preferencji użytkownika może utrudnić, a w skrajnych przypadkach może uniemożliwić korzystanie ze stron www
                            W celu zarządzania ustawienia cookies wybierz z listy poniżej przeglądarkę internetową, której używasz i postępuj zgodnie z instrukcjami:</p>

                                <li><a href="https://support.microsoft.com/pl-pl/microsoft-edge/wyświetlanie-i-usuwanie-historii-przeglądarki-w-programie-microsoft-edge-00cf7943-a9e1-975a-a33d-ac10ce454ca4" className="policy-link">Edge</a></li>
                                <li><a href="https://support.microsoft.com/pl-pl/topic/jak-usunąć-pliki-cookie-w-programie-internet-explorer-bca9446f-d873-78de-77ba-d42645fa52fc" className="policy-link">Internet Explorer</a></li>
                                <li><a href="https://support.google.com/chrome/answer/95647?hl=pl" className="policy-link">Chrome</a></li>
                                <li><a href="https://support.apple.com/pl-pl/guide/safari/sfri11471/mac" className="policy-link">Safari</a></li>
                                <li><a href="https://support.mozilla.org/pl/kb/wzmocniona-ochrona-przed-sledzeniem-firefox-desktop?redirectslug=Włączanie+i+wyłączanie+obsługi+ciasteczek&redirectlocale=pl" className="policy-link">Firefox</a></li>
                                <li><a href="https://help.opera.com/pl/latest/web-preferences/#cookies" className="policy-link">Opera</a></li>

                            <p>Urządzenia mobilne:</p>
                            <li><a href="https://support.google.com/chrome/answer/95647?hl=pl" className="policy-link">Android</a></li>
                            <li><a href="https://support.apple.com/pl-pl/HT201265" className="policy-link">iOS</a></li>
                            <li><a href="https://support.microsoft.com/pl-pl/windows/windows-phone-7-3ebc303c-59c0-d367-3995-f258b184fabb" className="policy-link">Windows Phone</a></li>

                  </Card.Text>
                </Card.Body>
              </Card>
            </CardGroup>

          </Col>
        </Row>
      </Container>

      <Footer></Footer>
    </>
  );
};

export default Policy;
