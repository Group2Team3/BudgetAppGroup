import "../Style/OutGoes.css";
import { Col, Container, Modal, ProgressBar, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { MainNavbar } from "./MainNavbar";
import { Footer } from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { ChangeEvent, useEffect, useState } from "react";
import {Tesseract} from "tesseract.ts";
import cv from 'opencv-ts';
import axios, { AxiosResponse } from "axios";

const Outgoes = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isParagonChecked, setIsParagonChecked] = useState(false);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expenseId, setExpenseId] = useState<string>("");
  const [name, setName] = useState('');
  const [date, setDate] = useState("");
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>('');
  const budgetId = Number(localStorage.getItem("budgetId")); 
  const navigate = useNavigate();

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
  const processedImage = thresholdImage(image);
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
          },
          threshold: {
            adaptive: true,
            binary: 100,
          },
          psm: 3,
          ocr_engine_mode: 3,
        });
        
        // console.log(result.text);
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
  const words2 = text.split(/\s+/);

  const keywords = ['SUMA', 'SUM', 'SUMH', 'SIJHA', 'PLN', 'P`LN', 'PLN ', 'Gotówka:', 'Gorduka:'];

  for (const keyword of keywords) {
    const keywordIndex = words.findIndex((word) => word.toUpperCase() === keyword);

    if (keywordIndex !== -1 && keywordIndex < words.length - 1) {
      let totalAmount = '';
      let consecutiveDigitsCount = 0;

      for (let i = keywordIndex + 1; i < words.length; i++) {
        if (/[0-9.,]/.test(words[i])) {
          // Allow numbers, dots, and commas
          totalAmount += words[i];
          consecutiveDigitsCount++;

          if (consecutiveDigitsCount >= 2) {
            break;
          }
        } else if (words[i] === '.') {
          // If a dot is encountered, add it to the totalAmount only if it's not the first character
          if (totalAmount.length > 0) {
            totalAmount += words[i];
          }
        } else {
          break;
        }
      }

      // Remove any commas
      totalAmount = totalAmount.replace(/,/g, '.');
      // Remove non-numeric characters except dots
      totalAmount = totalAmount.replace(/[^0-9.]/g, '');
      console.log('Amount1: %d', totalAmount)
      if (totalAmount != ''){
        return totalAmount;
      }
      
    }
  }

  for (const keyword of keywords) {
    const keywordIndexes = words2
      .map((word, index) => ({ word, index }))
      .filter((item) => item.word.toUpperCase() === keyword);

    for (const keywordIndexObj of keywordIndexes) {
      const keywordIndex = keywordIndexObj.index;

      // Check if the keyword is followed by 'PLN' and the next word is numeric
      if (
        keywordIndex !== -1 &&
        keywordIndex < words2.length - 2 &&
        words2[keywordIndex + 1].toUpperCase() === 'PLN' &&
        /[0-9.,]/.test(words2[keywordIndex + 1])
      ) {
        let totalAmount = words2[keywordIndex + 1];

        // Remove any commas
        totalAmount = totalAmount.replace(/,/g, '.');
        // // Remove non-numeric characters except dots
        // totalAmount = totalAmount.replace(/[^0-9.]/g, '');
        console.log('Amount2: %d', totalAmount)
        return totalAmount;
      }
    }
  }

  return null;
};

  // Generic function to handle form field changes
  const handleFieldChange = (field: string, value: string | number | File) => {
    switch (field) {
      case 'name':
        setName(value as string);
        break;
      case 'description':
        setDescription(value as string);
        break;
      case 'totalAmount':
        setTotalAmount(value as number);
        break;
      case 'image':
        setSelectedImage(value as File);
        break;
      case 'category':
          setCategory(value as string);
          break;
      default:
        break;
    }
  };


  const saveOutgoes = async () => {
    const expenseResponse: AxiosResponse<any> = await axios.post(`http://localhost:8080/expense/${budgetId}`, {
        name,
        amount: totalAmount,
        date,
        category,
        description, 
      });

      console.log(expenseResponse!.data);

      setExpenseId(expenseResponse!.data);
      console.log(expenseId);

      if (selectedImage) {
        try {
          const formData = new FormData();
      
          formData.append('photo', selectedImage);
          formData.append('date', date);
          console.log(date);

          const receiptResponse = await axios.post(`http://localhost:8080/recipt/${expenseResponse!.data}`, formData);
      
          handleShowDialog();
        } catch (error) {
          console.error('Error saving receipts:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
      navigate("/outgoes_detail")
    }

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
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                />
              </Col>

              <Col>
                <Form.Label>DATA</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>OPIS</Form.Label>
              </Col>
              <Col className="mb-5">
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Opis"
                  value={description}
                  onChange={(e) => handleFieldChange('description', e.target.value)}
                />
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

            <Col className="mb-5">
      <Form.Select
        aria-label="Default select example"
        value={category}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => handleFieldChange('category', e.target.value)}
      >
        <option value="samochod">pojazd</option>
        <option value="rachunki">rachunki</option>
        <option value="koszty zycia">koszty życia</option>
        <option value="rozrywka">rozrywka</option>
        <option value="rodzina/zwierzeta">rodzina/zwierzęta</option>
        <option value="ubezpieczenia/finanse">ubezpieczenia/finanse</option>
        <option value="transport publiczny">transport publiczny</option>
        <option value="wakacje">wakacje</option>
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
            <Col className="loading-indicator mb-5">
              {isLoading ? <LoadingSpinner /> : ''}
            </Col>
              )}
              <Col className="submit-button mb-4">
                <Button className="some-btn"  onClick={() => saveReceipts()}>Wpisz kwotę z paragonu</Button>
              </Col>
              </Col>
            )}
      <Modal show={showDialog} onHide={handleCloseDialog}>
        <Modal.Header closeButton>
          <Modal.Title> {isParagonChecked ? 'Zweryfikuj poprawność kwoty' : 'Czy napewno chcesz kontynuować bez dodawania paragonu?'} </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center'}}>
    <div>
      <h5>Kwota:
        <p className="amount">{totalAmount !== null ? `${totalAmount} zł` : '0.00 zł'}</p></h5>
    </div>
    {isParagonChecked && selectedImage && (
    <div>
      <img src={URL.createObjectURL(selectedImage)} alt="Selected Image" style={{ width: '100%', borderRadius: '5px' }} />
    </div>
  )}
 <Link to="/outgoes_detail" ><Button className="some-btn mt-4" onClick={saveOutgoes}>Potwierdzam</Button></Link> 
</Modal.Body>
      </Modal>
           
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
