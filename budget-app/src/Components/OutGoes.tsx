import "../Style/OutGoes.css";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { MainNavbar } from "./MainNavbar";
import { Footer } from "./Footer";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { ChangeEvent, useEffect, useState } from "react";
import {Tesseract} from "tesseract.ts";

const Outgoes = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isParagonChecked, setIsParagonChecked] = useState(false);
  const [recognizedText, setRecognizedText] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedImage(file || null);
  };
  const saveRecepits = (arg0: boolean): void => {
    if (selectedImage) {
      Tesseract.recognize(selectedImage, {
        lang: 'pol',
        config: {
          tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyząćęłńóśźżĄĆĘŁŃÓŚŹŻ',
          preserve_interword_spaces: '1',
          textord_force_make_prop_words: '1',
          textord_force_make_prop_fract: '1',
        },
        threshold: {
          adaptive: true,
          binary: 100,
        },
        psm: 6,
        ocr_engine_mode: 3,
      })
        .progress(console.log)
        .then((res: any) => {
          console.log(res);
        })
        .catch(console.error);
    } else {
      console.error('No image selected');
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
           Tutaj dodasz nowy wydatek. Jeśli chcesz wrócić do Twoich wydatków <Link to="/outgoes_detail" className="link">kliknij tutaj</Link>. 
            </p>
            <p className="description">
            Jeśli chcesz dodać wydatek z kwotą pobraną automatycznie z paragonu zaznacz okienko poniżej. 
            Pojawią się wtedy dodatkowe opcje do zaznaczenia/wypełnienia. Data automatycznie wypełnia się na dzisiejszą, 
            ale w każdym momencie możesz ją zmienić. Jeśli korzystałeś z opcji automatycznego wypełniania kwoty zweryfikuj jej poprawność. 
            Jeśli chcesz by paragon został zapisany, zaznacz odpowiednią opcję. 
            </p>
          </Col>
          <Row>
        <Col className="submit-button">
          <Form.Check
            type="checkbox"
            label="CHCĘ WPROWADZIĆ KWOTĘ Z PARAGONU"
            className="is-recipt-check"
            checked={isParagonChecked}
            onChange={() => setIsParagonChecked(!isParagonChecked)}
          />
        </Col>
      </Row>
          <Row className="m-5">
            <Col className="col-md-5 mx-3">
              <Col>
                <Form.Label>NAZWA</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Control type="text" value="krótka nazwa Twojego wydatku" />
              </Col>

              <Col>
                <Form.Label>DATA</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Control type="date" />
              </Col>
              <Col>
                <Form.Label>OPIS</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Control as="textarea" rows={6} placeholder="Opis" />
              </Col>
         
            </Col>

            <Col className="col-md-5 mx-3">
              <Col>
                <Form.Label>KWOTA</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Control
                  type="number"
                  min={100}
                  max={100000}
                  step={10}
                  placeholder="0.00 zł"
                />
              </Col>

              <Col>
                <Form.Label>KATEGORIA</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Select aria-label="Default select example">
                  <option>wybierz kategorię</option>
                  <option value="1">pojazd</option>
                  <option value="2">rachunki</option>
                  <option value="3">jedzenie</option>
                  <option value="3">rozrywka</option>
                  <option value="3">zwierzeta</option>
                  <option value="3">inne</option>
                </Form.Select>
              </Col>
              {isParagonChecked && (
            <Col>
              <Col>
                <Form.Label>PARAGON</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Col>
              {/* <Col className="submit-button">
              <Form.Check
                type="checkbox"
                label="CHCĘ ZAPISAĆ PARAGON"
                className="is-recipt-save"
                checked={isParagonChecked}
                onChange={() => saveRecepits(!isParagonChecked)}
              />
            </Col> */}

<Col className="submit-button mb-4">
                  <Button className="some-btn"  onClick={() => saveRecepits(!isParagonChecked)}>Wpisz kwotę z paragonu</Button>
              </Col>

            </Col>
            )}
            </Col>
          </Row>
          <Row>
          <Col className="submit-button mb-4">
                <Link to="/outgoes">
                  <Button className="some-btn">DODAJ NOWY WYDATEK</Button>
                </Link>
              </Col>
          </Row>
        </Row>
      </Container>      
      <Footer></Footer>
    </>
  );
};

export default Outgoes;
