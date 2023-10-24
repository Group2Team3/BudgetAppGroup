import '../Style/YourBudget.css';
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { MainNavbar } from "./MainNavbar";
import { Footer } from "./Footer";
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { DefaultizedPieValueType } from '@mui/x-charts';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import piggyPhoto from '../assets/budgetImages/piggy_photo.svg';


const YourBudget = () => {
    // Progress Bar Chart
    const income : number = 10000;
    const expenses: number = 7200;
    const savings: number =  income - expenses;
    const yearly_savings: number = savings * 12;
    const expenses_prc: number = (expenses / income) * 100;
    const savings_prc: number = (savings / income) * 100;

    const rachunki: number = 3600;
    // Pie Chart
    const data = [
        { id: '1', label: `RACHUNKI`, value: rachunki, color: '#D4686F' },
        { id: '2', label: 'KOSZTY ŻYCIA', value: 2500, color: '#76E7CD' },
        { id: '3', label: 'KOSZTY UTRZYMANIA POJAZDU', value: 2300, color: '#65A3EC' },
        { id: '4', label: 'RODZINA/ZWIERZĘTA', value: 1000, color: '#9B7EDE' },
        { id: '5', label: 'ROZRYWKA', value: 600, color: '#F47C99' },
      ];
      
      const sizing = {
        width: 1000,
        height: 480,
      };
      
      const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);
      
      const getArcLabel = (params: DefaultizedPieValueType) => {
        const percent = params.value / TOTAL;
        return `${(percent * 100).toFixed(0)}%`;
      };

      //Bar chart
      const chartSetting = {
        width: 800,
        height: 400,
        sx: {
          [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-10px, 0)',
          },
        },
      };
      const dataset = [
        {
          expenses: 120,
          day: 1,
        },
        {
          expenses: 20,
          day: 3,
        },
        {
          expenses: 45,
          day: 4,
        },
        {
          expenses: 500,
          day: 8,
        },
        {
          expenses: 68,
          day: 12,
        },
        {
          expenses: 61,
          day: 13,
        },
        {
          expenses: 23,
          day: 14,
        },
        {
          expenses: 600,
          day: 19,
        },
        {
          expenses: 120,
          day: 20,
        },
        {
          expenses: 61,
          day: 25,
        },
        {
          expenses: 23,
          day: 26,
        },
        {
          expenses: 430,
          day: 27,
        },
        {
          expenses: 22,
          day: 30,
        },
      ];
      
      const valueFormatter = (value: number) => `${value} zł`;

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
                        <Col className="col-md-12 text-center justify-content-center align-items-center">
                            <p className='description'>Jeśli nie wprowadziłeś jeszcze danych dotyczących budżetu w tym miesiącu możesz to zrobić przechodząc tutaj: <Link to="/addbudgetinfo" className='link'>DODAWANIE BUDŻETU</Link></p>
                            <h5>Twoj budżet w miesiącu <span className='month'>{format(new Date(), 'LLLL', { locale: pl })}</span></h5>
                            
                            {/* PROGRESS BAR CHART */}
                            <Col className='col-md-8 mx-auto mb-5'>
                                <ProgressBar>
                                    <ProgressBar variant="danger" now={expenses_prc} key={1} label={`${expenses_prc.toFixed(0)}%`}/>
                                    <ProgressBar variant="success" now={savings_prc} key={2} label={`${savings_prc.toFixed(0)}%`}/>
                                </ProgressBar>
                            </Col>
                            <p className='see'>Zobacz na co wydałeś pieniądze w tym miesiącu</p>

                            {/* PIE CHART */}
                            <Col className='col-md-8 mx-auto mb-5'>
                                <PieChart
                                margin={{ top: 100, bottom: 100, left: -400, right:100 }}
                                series={[
                                    {
                                    outerRadius: 230,
                                    data,
                                    arcLabel: getArcLabel,
                                    },
                                ]}
                                sx={{
                                    [`& .${pieArcLabelClasses.root}`]: {
                                    fill: 'white',
                                    fontSize: 25,
                                    },
                                }}
                                slotProps={{
                                    legend: {
                                    direction: 'column',
                                    position: { vertical: 'middle', horizontal: 'right' },
                                    padding: 170,
                                    labelStyle: {
                                        fontSize: 20,
                                        fontWeight: 900,
                                        
                                    },
                                    },
                                }}
                                {...sizing}
                                />
                            </Col>
                            
                            <Col className='col-md-8 mx-auto mb-5'>
                                <Accordion defaultActiveKey="0" flush>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>SZCZEGÓŁOWE WYDATKI W TYM MIESIĄCU </Accordion.Header>
                                        {/* BAR CHART */}
                                        <Accordion.Body>

                                            <BarChart
                                                dataset={dataset}
                                                xAxis={[
                                                    {
                                                        scaleType: 'band',
                                                        dataKey: 'day',
                                                        label: 'DZIEŃ MIESIĄCA'
                                                    },
                                                ]}
                                                yAxis={[
                                                    {
                                                        label: 'KWOTA',
                                                    },
                                                ]}
                                                series={[
                                                    {
                                                        dataKey: 'expenses',
                                                        label: 'Wydatki',
                                                        valueFormatter,
                                                        color: '#9B7EDE',
                                                    },
                                                ]}
                                                {...chartSetting}
                                            />
                                        
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Col>
                            <Row className='mb-5 text-start'>
                                <Col className='col-md-7 mb-5'> 
                                <img src={piggyPhoto} alt='Piggy photo' className='img-fluid' />
                                </Col>
                                <Col className='col-md-5'> 
                                    <h5>
                                    W miesiądzu październik zaoszczędziłeś <span className='purple'>{savings} zł</span>! 
                                    Trzymaj tak dalej a w skali roku jesteś w stanie oszczędzić <span className='purple'>{yearly_savings} zł</span>.
                                    </h5>
                                </Col>
                            </Row>
                            

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

export default YourBudget;