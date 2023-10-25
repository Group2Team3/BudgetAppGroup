import '../Style/Receipts.css';
import { Col, Container, Row, Modal } from 'react-bootstrap';
import { MainNavbar } from './MainNavbar';
import { Footer } from './Footer';
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import paragon1 from '../assets/receipts/paragon1.png';
import paragon2 from '../assets/receipts/paragon2.jpg';
import paragon3 from '../assets/receipts/paragon3.png';
import paragon4 from '../assets/receipts/paragon4.jpg';
import paragon5 from '../assets/receipts/paragon5.png';
import paragon6 from '../assets/receipts/paragon6.jpeg';
import paragon7 from '../assets/receipts/paragon7.jpg';
import paragon8 from '../assets/receipts/paragon8.jpg';
import paragon9 from '../assets/receipts/paragon9.png';
import { useState } from 'react';

const Receipt = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const months: { month: string; images: { date: string; images: string[] }[] }[] = [
    {
      month: 'Sierpień',
      images: [
        { date: '2022-08-05', images: [paragon1, paragon2, paragon3, paragon4] },
        { date: '2022-08-10', images: [paragon5] },
      ],
    },
    {
      month: 'Wrzesień',
      images: [
        { date: '2022-09-01', images: [paragon6, paragon7] },
      ],
    },
    {
      month: 'Październik',
      images: [
        { date: '2022-10-02', images: [paragon8] },
        { date: '2022-10-12', images: [paragon9] },
      ],
    },
    {
      month: 'Listopad',
      images: [], //zeby sprawdzic ze jezeli nie ma nic zapisanego to wyswietla odpowiednia wiadomosc
    },
    {
        month: 'Grudzień',
        images: [],
    },
  ];

  return (
    <>
      <Container>
        <Row>
          <Col className='col-md-12'>
            <MainNavbar></MainNavbar>
          </Col>
        </Row>
      </Container>
      <hr className='hr' />

      <Container>
        <Row>
          <Col className='col-md-12'>
            <p className='description'>
              Tutaj znajdziesz wszystkie swoje{' '}
              <span className='thick'>zapisane paragony</span>. By dodać nowy paragon przejdź do podstrony{' '}
              <Link to='/' className='link'>
                {' '}
                DODAJ NOWY WYDATEK
              </Link>
            </p>
          </Col>
        </Row>
        <Row>
          <Col className='col-md-12'>
            <Accordion className='mb-5'>
              {months.map((month, index) => (
                <Accordion.Item key={index} eventKey={index.toString()}>
                  <Accordion.Header>{month.month}</Accordion.Header>
                  <Accordion.Body className='p-5'>
                    {month.images.length === 0 ? (
                      <p>W tym miesiącu nie zapisałeś żadnych paragonów</p>
                    ) : (
                      month.images.map((date, index) => (
                        <div key={index} className='text-start'>
                          <p>{date.date}</p>
                          <Row>
                            {date.images.map((image, index) => (
                              <Col key={index} className='col-md-3 text-start'>
                                <img src={image} alt='' className='img-fluid img-receipts' onClick={() => setSelectedImage(image)} />
                              </Col>
                            ))}
                          </Row>
                        </div>
                      ))
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
      <Modal show={selectedImage !== ''} onHide={() => setSelectedImage('')}>
        <Modal.Body>
          <img src={selectedImage} alt='' className='img-fluid' />
        </Modal.Body>
      </Modal>
      <Footer></Footer>
    </>
  );
};

export default Receipt;