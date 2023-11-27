import "../Style/Policy.css";
import { Col, Container, Row } from "react-bootstrap";
import { MainNavbar } from "./MainNavbar";
import { Footer } from "./Footer";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

const Terms = () => {
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
            <h2 className="policy-header">
              Zasady i warunki korzystania ze strony
            </h2>
          </Col>

          <Col className="col-md-12 mb-5">
            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title className="text-center">I. PREAMBUŁA</Card.Title>
                  <Card.Text>
                    <ol>
                      <li>
                        Niniejszy dokument określa warunki dostępu i korzystania
                        ze strony internetowe, zwany będzie dalej: "Ogólne
                        warunki".
                      </li>
                      <li>
                        Każdy Użytkownik z chwilą podjęcia czynności
                        zmierzających do korzystania ze strony internetowej
                        zobowiązany jest do zapoznania się, przestrzegania oraz
                        akceptacji Ogólnych warunków, bez ograniczeń i
                        zastrzeżeń
                      </li>
                      <li>
                        W przypadku niewyrażenia zgody na wszystkie Ogólne
                        warunki należy zaprzestać korzystania ze strony
                        internetowej i natychmiast ją opuścić.
                      </li>
                      <li>
                        Wszystkie nazwy handlowe, nazwy firm i ich logo, użyte
                        na stronie internetowej należą do ich właścicieli i są
                        używane wyłącznie w celach identyfikacyjnych. Mogą być
                        one zastrzeżone znakami towarowymi.
                      </li>
                      <li>
                        Zabrania się nieuprawnionego korzystania z zawartości
                        strony internetowej lub informacji, jak też in
                        nieuprawnionej reprodukcji, retransmiji lub innego
                        użycia jakiegokolwiek elementu strony internetowej, gdyż
                        takie działanie może naruszać m.in prawa autoskie lub
                        chronione znaki towarowe.
                      </li>
                    </ol>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title className="text-center">II. DEFINICJE</Card.Title>
                  <Card.Text>
                    <ol>
                      <li>
                        FORMULARZE - kwestionariusze umożliwiające wprowadzanie
                        informacji i przekazywanie Właścicielowi.
                      </li>
                      <li>
                        PRAWO WŁAŚCIWIE - Do celów realizacji Ogólnych warunków
                        zastosowanie ma prawo polskie.
                      </li>
                      <li>
                        STRONA INTERNETOWA - Narzędzie, o nazwie BudgetApp
                        służące do świadczenia usług elektronicznych.
                      </li>
                      <li>
                        UŻYTKOWNIK - osoba fizyczna, osoba prawna, albo
                        jednostka organizacyjna nieposiadająca osobowości
                        prawnej, której ustawa przyznaje zdolność prawną,
                        korzystająca z usług elektronicznych dostępnych w ramach
                        strony internetowej.
                      </li>
                      <li>
                        WARUNKI - zbiór wszystkich postanowień m.in. niniejszych
                        Ogólnych warunków, zasad polityki prywatności, plików
                        cookies oraz wszelkich innych warunków, znajdujących się
                        na stronie internetowej, które dotyczą określonych
                        funkcji, właściwości lub promocji, jak również obsługi
                        klienta.
                      </li>
                      <li>
                        WŁAŚCICIEL - Podmiot udostępniający niniejszą stronę
                        internetową, mianowicie Grupa 3
                      </li>
                    </ol>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title className="text-center">
                    III. ZAKRES WARUNKÓW
                  </Card.Title>
                  <Card.Text>
                    <ol>
                      <li>
                        Właściciel zapewnia dostęp do zawartości strony
                        internetowej, zgodnie z poniższymi Ogólnymi warunkami.
                      </li>
                      <li>
                        Zawartość i dane publikowane na stronie internetowej
                        mają charakter informacyjny dla osób zainteresowanych i
                        mogą być wykorzystywane jedynie do celów informacyjnych.
                      </li>
                      <li>
                        Użytkownicy mogą korzystać z dostępu i usług oferowanych
                        na stronie internetowej, pod warunkiem uprzedniego
                        wyrażenia zgody na Ogólne warunki.
                      </li>
                    </ol>
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardGroup>
            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title className="text-center">
                    IV. ZASADY KORZYSTANIA ZE STRONY INTERNETOWEJ
                  </Card.Title>
                  <Card.Text>
                    <ol>
                      <li>
                        Strona internetowa jest obsługiwana przez wszelkiego
                        rodzaju przeglądarki internetowe. Nie wymaga się żadnych
                        szczególnyuch właściwości urządzenia końcowego
                        Użytkownika.
                      </li>
                      <li>
                        Po zaakceptowaniu Warunków, Użytkownik ma prawo
                        przeglądać, kopiować, drukować oraz rozpowszechniać, bez
                        dokonywania zmian w treści, zawartość niniejszej strony
                        internetowej, pod warunkiem, że:
                        <ul>
                          <li>
                            treści będą wykorzystywane wyłącznie informacyjnie,
                            w celach niekomercyjnych;
                          </li>
                          <li>
                            każda wykonana kopia będzie zawierała informacje na
                            temat praw autorskich lub dane dotyczące autora
                            treści.
                          </li>
                        </ul>
                      </li>
                      <li>
                        Zakazane jest używanie i kopiowanie oprogramowania,
                        procesów i technologii, stanowiących część strony
                        internetowej.
                      </li>
                      <li>
                        Użytkownicy mogą korzystać ze strony internetowej
                        jedynie w poszanowaniu przepisów ustawy prawo
                        telekomunikacyjne, ustawy o świadczeniu usług drogą
                        elektroniczną i odpowiednich przepisów prawa cywilnego.
                      </li>
                      <li>
                        Zabronione jest korzystanie ze strony:
                        <ul>
                          <li>
                            w sposób prowadzący do naruszenia obowiązujących
                            przepisów prawa;
                          </li>
                          <li>
                            w jakikolwiek sposób niezgodny z prawem lub
                            nieuczciwy, albo w sposób, zmierzający do
                            osiągnięcia niezgodnego z prawem lub nieuczciwego
                            celu;
                          </li>
                          <li>
                            do celów związanych z wyrządzeniem szkody dzieciom
                            lub prób wyrządzenia im jakiejkolwiek szkody;
                          </li>
                          <li>
                            do form zaliczanych do zbiórczej kategorii SPAM;
                          </li>
                          <li>
                            do świadomego przekazywania jakichkolwiek danych,
                            wysyłania lub wgryuwania jakichkolwiek materiałów
                            zawierających wirusy, konie trojańskie,
                            oprogramowanie szpiegujące (spyware), oprogramowanie
                            z reklamami (adware) lub inny szkodliowy program lub
                            zbliżone kody komputerowe zaprogramowane, by
                            niekorzystnie wpływać lub zagrażać na funkcjonowanie
                            jakiegokolwiek oprogramowania lub sprzętu
                            komputerowego albo niekorzystnie wpływać lub
                            zagrażać Użytkownikowi.
                          </li>
                        </ul>
                      </li>
                    </ol>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title className="text-center">V. COOKIES</Card.Title>
                  <Card.Text>
                    <ol>
                      <li>
                        trona internetowa używa plików cookies (ciasteczka) lub
                        podobną technologię (dalej łącznie nazwane: "cookies")
                        do zbierania informacji o dostępie Użytkownika do strony
                        internetowej (np. za pomocą komputera lub smartfona)
                        oraz jego preferencjach. Są one wykorzystywane m.in w
                        celach statystycznych oraz w celu dostosowania strony
                        internetowej do indywidualnych potrzeb Użytkownika.
                      </li>
                      <li>Pliki cookies to fragmenty informacji, które zawierają unikalny kod referencyjny, który strona internetowa przesyła na urządzenie Użytkownika, w celu przechowywania, a czasem śledzenia informacji dotyczących używanego urządzenia. Zwykle nie pozwalają one zidentyfikować osoby Użytkownika. Ich głównym zastosowaniem jest lepsze dopasowanie strony internetowej do Użytkownika.</li>
                      <li>Niektore z plików cookies, występujące na stronie internetowej, są dostępne tylko przez czas trwania danej sesji internetowej i wygasają po zamknięciu przeglądarki. Inne pliki cookies służą do zapamiętywania Użytkownika, który po powrocie na stronę internetową, jest na niej rozpoznawany. Są one wówczas zachowywane przez dłuższczy czas.</li>
                      <li>Wszystkie pliki cookies, używane przez niniejszą stronę internetową, są zgodne z obowiązującym prawem Unii Europejskiej.</li>
                      <li>Większość Użytkowników i niektórych przeglądarek mobilnych automatycznie akceptuje pliki cookies. Jeżeli ustawienia te pozostaną bez zmian, pliki cookies zostaną zapisane w pamięci urządzenia.</li>
                        <li>
                        Pliki cookies będą wykozystywane do niezbędnego zarządania sesją, w tym:
                        <ul>
                            <li>Rozpoznawianiu Użytkownika, który już wcześniej odwiedził stronę internetową co pozwala na identyfikację liczby unikalnych użytkowników, którzy skorzystali z serwisu i pozwala upewnić się co do wystarczającej pojemności serwisu dla liczby nowych użytkowników;</li>
                            <li>Dostosowania elementów układu szaty graficznej lub zawartości strony internetowej;</li>
                            <li>Zbierania informacji statystycznych o tym, jak Użytkownik korzysta ze strony, w celu możliwości ulepszenia witry i stwierdzenia, które zakresy strony internetowej są najbardziej popularne dla Użytkowników.</li>
                        </ul>
                    </li>
                    </ol>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title className="text-center">VI. PLUGIN FACEBOOKA I GOOGLE</Card.Title>
                  <Card.Text>
                    <ol>
                        <li>Strona internetowa zawier plugin (wtyczkę) do serwisu społecznościowego Facebook oraz Google</li>
                        <li>Plugin Facebooka jest oznaczony logo Facebook, plugin Google jest oznaczony logiem Google.</li>
                        <li>Jeżeli Użytkownik odwiedza stronę internetową będąc zalogowanym na swoim profilu na Facebooku, serwis zarejestruje informację o wizycie. Nawet w sytuacji, gdy Użytkownik nie jest zalogowany na Facebooku lub Google, są one w stanie pozyskiwać informacje o adresie IP.</li>
                        <li>Facebook ani Google nie przekazuje Włascicielowi informacji gromadzonych danych i sposobie ich wykorzystania. Cel i zakres danych gromadzonych nie są znane Właścicielowi. W celu uzyskania dodatkowych informacji, dotyczących prywatności na tych portalach, należy kontaktować się bezpośrednio z Facebookiem lub Google, albo zapoznać się z ich polityką prywatności.</li>
                    </ol>
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardGroup>
            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title className="text-center">
                  VIII. LINKI ZEWNĘTRZNE
                  </Card.Title>
                  <Card.Text>
                    <ol>
                        <li>Odnośniki znajdujące się na niniejszej stronie, do innych stron internetowcych, są podane wyłacznie w celu informacyjnym.</li>
                        <li>Właściciel strony internetowej nie ponosi odpowiedzialnosci za treści znajdujące się na innych witrynach. ani za jakiekolwiek szkody wynikające z ich użytkownika.</li>
                    </ol>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title className="text-center">
                  IX. FORMULARZE
                  </Card.Title>
                  <Card.Text>
                    <ol>
                        <li>Pozostawienie danych oznacza, że Użytkownik wyraził zgodę na przetwarzanie przez Właściciela podanych w Formularzu danych osobowych. Właściciel będzie mógł użyć podanych danych, w celu obliczenia budżetu.</li>
                    </ol>
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

export default Terms;
