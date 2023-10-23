import '../Style/AddBudget.css';
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { MainNavbar } from "./MainNavbar";
import { Footer } from "./Footer";
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';

const AddBudget = () => {
    const currentMonth = format(new Date(), 'MMMM', { locale: pl });

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
                    <Col className='col-md-12 text-center my-3'>
                        <h3 className="heading my-3">Dodaj informacje dotyczące Twojego budżetu z {currentMonth}</h3>
                        <p className='description'>Wprowadź dane dotyczące Twojego budżetu. Jeżeli któryś przykład Cię nie dotyczy, nie wypełniaj go. 
                            Po wypełnieniu wszystkich danych kliknij przycisk “Dalej”.</p>
                            <Col className='col-md-8 mx-auto text-start'> 
                                <Accordion defaultActiveKey="0" flush>
                                    {/* PRZYCHODY */}
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Przychody </Accordion.Header>
                                        <Accordion.Body>
                                            <Form>
                                                <Form.Group className="mb-3" >
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Wypłata (po opodatowaniu)</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Zarobki z samozatrudnienia</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Zasiłki/zapomogi</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Stypendia</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Inne przychody</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Form.Group>
                                            </Form>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    {/* RACHUNKI */}
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Rachunki </Accordion.Header>
                                        <Accordion.Body>
                                            <Form>
                                                <Form.Group className="mb-3" >
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Wynajem</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Prąd</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Woda</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Ogrzewanie</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Media (internet, telewizja, telefon)</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Inne opłaty</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Form.Group>
                                            </Form>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    {/* KOSZTY ŻYCIA */}
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Koszty życia </Accordion.Header>
                                        <Accordion.Body>
                                            <Form>
                                                <Form.Group className="mb-3" >
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Zakupy spożywcze</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Ubrania</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Kosmetyki</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Chemia</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Restauracje</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Inne wydatki</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Form.Group>
                                            </Form>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    {/* UBEZPIECZENIA/FINANSE */}
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>Ubezpieczenia/finanse </Accordion.Header>
                                        <Accordion.Body>
                                            <Form>
                                                <Form.Group className="mb-3" >
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Ubezpieczenie na życie</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Ubezpieczenie zdrowotne</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Ubezpieczenie domu</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Rata kredytu</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Inne</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Form.Group>
                                            </Form>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    {/* UBEZPIECZENIA/FINANSE */}
                                    <Accordion.Item eventKey="4">
                                        <Accordion.Header>Rodzina/zwierzęta </Accordion.Header>
                                        <Accordion.Body>
                                            <Form>
                                                <Form.Group className="mb-3" >
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Opiekunka dla dziecka</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Zabawki/ubrania dla dziecka</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Koszty związane z przedszkolem/żłobkiem</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Jedzenie/zabawki dla zwierzęcia</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Weterynarz</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Inne wydatki</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Form.Group>
                                            </Form>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    {/* KOSZTY UTRZYMANIA POJAZDU */}
                                    <Accordion.Item eventKey="5">
                                        <Accordion.Header>Koszty utrzymania pojazdu </Accordion.Header>
                                        <Accordion.Body>
                                            <Form>
                                                <Form.Group className="mb-3" >
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Ubezpieczenie pojazdu</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Paliwo</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Naprawy</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Parkingi</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Utrzymanie samochodu</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Inne wydatki</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Form.Group>
                                            </Form>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    {/* TRANSPORT PUBLICZNY */}
                                    <Accordion.Item eventKey="6">
                                        <Accordion.Header>Transport publiczny </Accordion.Header>
                                        <Accordion.Body>
                                            <Form>
                                                <Form.Group className="mb-3" >
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Autobus</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Tramwaj</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Pociąg</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Taksówka/uber/bolt</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Inne wydatki</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Form.Group>
                                            </Form>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    {/* ROZRYWKA */}
                                    <Accordion.Item eventKey="7">
                                        <Accordion.Header>Rozrywka </Accordion.Header>
                                        <Accordion.Body>
                                            <Form>
                                                <Form.Group className="mb-3" >
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Kino & teatr</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Hobby</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Sport</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Książki</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Gry</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Inne wydatki</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Form.Group>
                                            </Form>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    {/* WAKACJE */}
                                    <Accordion.Item eventKey="8">
                                        <Accordion.Header>Wakacje </Accordion.Header>
                                        <Accordion.Body>
                                            <Form>
                                                <Form.Group className="mb-3" >
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Koszty związane z wakacjami</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Ubezpieczenie wakacji</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Gotówka do wydania</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Pamiątki/prezenty</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" >
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Inne wydatki</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Form.Group>
                                            </Form>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    {/* DODATKOWE KOSZTY */}
                                    <Accordion.Item eventKey="9">
                                        <Accordion.Header>Dodatkowe koszty </Accordion.Header>
                                        <Accordion.Body>
                                            <Form>
                                                <Form.Group className="mb-3" >
                                                    <Form.Group className="mb-3" >
                                                        <p>Jeżeli masz jeszcze jakieś dodatkowe wydatki, które nie wpisały się w żadną z poprzednich kategorii wprowadź je tutaj i dodaj krótki opis (jedno zdanie).</p>
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Inne wydatki</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="number"  />
                                                                <Form.Control as="textarea" rows={2} placeholder="Opis" />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Form.Group>
                                            </Form>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                </Accordion>
                            </Col>
                        <Button className='button-submit'>Dalej</Button>
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
    );
}

export default AddBudget;