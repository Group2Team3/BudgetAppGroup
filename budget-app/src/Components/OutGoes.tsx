import "../Style/OutGoes.css";
import { Col, Container, Modal, ProgressBar, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { MainNavbar } from "./MainNavbar";
import { Footer } from "./Footer";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { ChangeEvent, useEffect, useState } from "react";
import {Tesseract} from "tesseract.ts";
import cv from 'opencv-ts';

const Outgoes = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isParagonChecked, setIsParagonChecked] = useState(false);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [showDialog, setShowDialog] = useState(false);

  const handleShowDialog = () => setShowDialog(true);
  const handleCloseDialog = () => setShowDialog(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedImage(file || null);
  };
  
  useEffect(() => {
    if (processedImage) {
      ocr();
    }
  }, [processedImage]);
  
const processImage = async (imageFile: File): Promise<string> => {
  const image = await loadImage(imageFile);

  // Perform image processing (e.g., thresholding)
  const processedImage = thresholdImage(image);

  // Convert the processed image to base64
  const processedImageUrl = canvasToBase64(processedImage);

  return processedImageUrl;
};

const loadImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;

        const dpi = 600;
        canvas.width = Math.floor(img.width * dpi / 25.4);
        canvas.height = Math.floor(img.height * dpi / 25.4);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        resolve(img);
      };
      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
};

const thresholdImage = (image: HTMLImageElement): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0, image.width, image.height);
  const mat = cv.imread(canvas);

  cv.cvtColor(mat, mat, cv.COLOR_RGBA2GRAY);

  cv.threshold(mat, mat, 128, 255, cv.THRESH_BINARY);
  cv.equalizeHist(mat, mat);

  cv.imshow(canvas, mat);
  mat.delete(); 

  return canvas;
};

const canvasToBase64 = (canvas: HTMLCanvasElement): string => {
  return canvas.toDataURL('image/png');
};

const saveReceipts = async () => {
  setIsLoading(true);

  if (selectedImage) {
    try {
      const processedImageUrl = await processImage(selectedImage);
      setProcessedImage(processedImageUrl);
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setIsLoading(false);
    }
  } else {
    setIsLoading(false);
  }
};
  
  const ocr = async () => {
    setIsLoading(true);

    if (processedImage) {
      try {
        const result = await Tesseract.recognize(processedImage, {
          lang: 'pol',
          config: {
            tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyząćęłńóśźżĄĆĘŁŃÓŚŹŻ',
            preserve_interword_spaces: '1',
            textord_force_make_prop_words: '1',
            textord_force_make_prop_fract: '1',
            tessedit_pageseg_mode: '10',
          },
          threshold: {
            adaptive: true,
            binary: 100,
          },
          psm: 3,
          ocr_engine_mode: 3,
        });
        
        console.log(result.text);
      const extractedTotalAmount = extractTotalAmount(result.text);

      if (extractedTotalAmount) {
        console.log(`Total Amount: ${extractedTotalAmount}`);
        setTotalAmount(parseFloat(extractedTotalAmount));
      } else {
        console.log('No total amount found.');
        setTotalAmount(null);
      }
    } catch (error) {
      console.error('Error during OCR:', error);
      setTotalAmount(null);
    } finally {
      setIsLoading(false);
    }
  } else {
    console.error('No image selected');
    setIsLoading(false);
  }
};

function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
}

  const extractTotalAmount = (text: string): string | null => {
    const words = text.split(/\s+/);
  
    const keywords = ['SUMA', 'SUM', 'SUMH', 'SIJHA', 'PLN', 'P`LN'];
  
    for (const keyword of keywords) {
      const keywordIndex = words.findIndex((word) => word.toUpperCase() === keyword);
  
      if (keywordIndex !== -1 && keywordIndex < words.length - 1) {
        //let totalAmount = words[keywordIndex + 1];
        let totalAmount = '';
        let consecutiveDigitsCount = 0;
  
        for (let i = keywordIndex + 1; i < words.length; i++) {
          if (/[0-9.,]/.test(words[i])) { // Allow numbers, dots, and commas
            totalAmount += words[i];
            consecutiveDigitsCount++;
  
            if (consecutiveDigitsCount >= 2) {
              break;
            }
          } else {
            break;
          }
        }
        totalAmount = totalAmount.replace(/[^0-9.,]/g, '');
  
        return totalAmount;
      }
    }
  
    return null;
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
          <Row className="row-goals">
            <Col className="col-sm-12 col-md-5 mx-3">
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

            <Col className="col-sm-12 col-md-5 mx-3">
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
                value={totalAmount !== null ? totalAmount : ''}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const newValue = inputValue !== '' ? parseFloat(inputValue) : null;
                  setTotalAmount(newValue);
                }}
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
              {isLoading && (
            <Col className="loading-indicator">
              {isLoading ? <LoadingSpinner /> : ''}
            </Col>
              )}
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
                <Button className="some-btn"  onClick={() => saveReceipts()}>Wpisz kwotę z paragonu</Button>
              </Col>
              {/* {selectedImage && (
        <Row className="m-5">
          <Col className="col-md-5 mx-3">
            <h4>Selected Image</h4>
            <img src={URL.createObjectURL(selectedImage)} alt="Selected Image" style={{ width: '100%', borderRadius: '5px' }} />
          </Col>
        </Row>
      )}
              {processedImage && (
        <Row className="m-5">
          <Col className="col-md-5 mx-3">
            <img src={processedImage} alt="Processed Image" style={{ width: '100%', borderRadius: '5px' }} />
            <Button className="some-btn"  onClick={() => ocr()}>OCR</Button>
          </Col>
        </Row>
      )}  */}

      <Modal show={showDialog} onHide={handleCloseDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Zwryfikuj poprawność kwoty</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center'}}>
  {processedImage && (
    <div>
      <h5>Kwota:
        <p className="amount">{totalAmount !== null ? `${totalAmount} zł` : 'No total amount found.'}</p></h5>
    </div>
  )}
  {selectedImage && (
    <div>
      <img src={URL.createObjectURL(selectedImage)} alt="Selected Image" style={{ width: '100%', borderRadius: '5px' }} />
    </div>
  )}
</Modal.Body>
      </Modal>
            </Col>
            )}
            </Col>
          </Row>
          <Row>
          <Col className="submit-button mb-4">
                <Link to="/outgoes">
                  <Button className="some-btn" onClick={() => handleShowDialog()}>DODAJ NOWY WYDATEK</Button>
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
