import '../Style/Goals.css';
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { MainNavbar } from "./MainNavbar";
import { Footer } from "./Footer";
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneUp } from '@fortawesome/free-solid-svg-icons'

const Goals = () => {
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
                        <p className='description'>Dodaj <span className='thick'>nowy cel</span>. Podaj wszystkie wymagane informacje tj. okres, kwota, 
                        opis itp. Gdy w danym miesiącu odłożysz jakąś kwotę, pamiętaj by wprowadzić ją w “Twoje aktualne cele”, 
                        tym sposobem Twój cel będzie aktualizowany na bieżąco. Aktywny cel możesz zawsze edytować klikając 
                        ikonkę ołówka. Zakończone cele (sukcesem, lub nie) zawsze możesz podejrzeć w zakładce 
                        “Cele z przeszłości”.</p>
                    </Col>
                    <Row className='m-5'>

                        <Col className="col-md-5 mx-3">
                            <Col>
                                <Form.Label>NAZWA</Form.Label>
                            </Col>
                            <Col className='mb-5'>
                                <Form.Control type="text"  value='krótka nazwa Twojego celu'/>
                            </Col>

                            <Col>
                                <Form.Label>DO KIEDY</Form.Label>
                            </Col>
                            <Col className='mb-5'>
                                <Form.Control type="date"  />
                            </Col>

                            <Col>
                                <Form.Label>KATEGORIA</Form.Label>
                            </Col>
                            <Col className='mb-5'>
                                <Form.Select aria-label="Default select example">
                                    <option>Wybierz kategorię</option>
                                    <option value="1">samochód</option>
                                    <option value="2">dom</option>
                                    <option value="3">prezent</option>
                                    <option value="3">wakacje</option>
                                    <option value="3">zdrowie</option>
                                    <option value="3">inne</option>
                                </Form.Select>
                            </Col>
                            
                            <Col className='submit-button'>
                                <Link to="/goals"><Button className="some-btn">DODAJ CEL</Button></Link>
                            </Col>
                            
                            

                        </Col>

                        <Col className="col-md-5 mx-3">
                            <Col>
                                <Form.Label>KWOTA</Form.Label>
                            </Col>
                            <Col className='mb-5'>
                                <Form.Control type="number" min={100} max={100000} step={10} placeholder='kwota, którą chcesz odłożyć'/>
                            </Col>

                            <Col>
                                <Form.Label>KWOTA ZAOSZCZĘDZONA</Form.Label>
                            </Col>
                            <Col className='mb-5'>
                                <Form.Control type="number"  min={10} max={100000} step={10} placeholder='kwota, którą odłożyłeś do tej pory'/>
                            </Col>

                            <Col>
                                <Form.Label>OPIS</Form.Label>
                            </Col>
                            <Col className='mb-5'>
                            <Form.Control as="textarea" rows={6} placeholder="Opis" />
                            </Col>
                        </Col>

                    </Row>
                </Row>
            </Container>
            <Container>
                <Row className='d-flex justify-content-center'>
                    <Col className='col-md-8 text-center m-5'>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>TWOJE AKTUALNE CELE</Accordion.Header>
                            <Accordion.Body>
                                <Row>
                                    <Col className='col-md-4 text-center d-flex justify-content-center'>
                                        <FontAwesomeIcon icon={faPlaneUp} className='plane-icon'/>
                                    </Col>
                                    <Col className='col-md-4 text-start'>
                                        <h4>WAKACJE</h4>
                                        <p>WYJAZD DO INDONEZJI</p>
                                        <p></p>
                                        <p className='pink'>ZOSTAŁO:</p>
                                        <p className='pink'>ODŁOŻONO:</p>
                                        <p className='pink'>DATA KOŃCOWA:</p>
                                    </Col>
                                    <Col className='col-md-4 text-center d-flex justify-content-center'>
                                        C
                                    </Col>
                                </Row>
                            
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>CELE Z PRZESZŁOŚCI</Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
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

export default Goals;
