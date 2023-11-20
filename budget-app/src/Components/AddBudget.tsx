import "../Style/AddBudget.css";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { MainNavbar } from "./MainNavbar";
import { Footer } from "./Footer";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { error } from "console";

const AddBudget = () => {
  const currentMonth = format(new Date(), "MMMM", { locale: pl });
  const userId  = Number(localStorage.getItem('userId'))

  type FormFields = {
    incomeFields: {
      salary: number;
      self_employment: number;
      benefits: number;
      scholarships: number;
      other_income: number;
    };
    billsFields: {
      rent: number;
      electricity: number;
      water: number;
      heating: number;
      media: number;
      other_bills: number;
    };
    costOfLifeFields: {
      groceries: number;
      clothes: number;
      cosmetics: number;
      chemistry: number;
      restaurants: number;
      other_cost_of_life: number;
    };
    insuranceFields: {
      life_insurance: number;
      health_insurance: number;
      home_insurance: number;
      loan_installment: number;
      other_insurance: number;
    };
    familyFields: {
      childminder: number;
      toys: number;
      kindergarten: number;
      pet_food: number;
      vet: number;
      other_family: number;
    };
    carFields: {
      car_insurance: number;
      fuel: number;
      repairs: number;
      parking: number;
      maintenance: number;
      other_car: number;
    };
    publicTransportFields: {
      bus: number;
      tram: number;
      train: number;
      taxi: number;
      other_public_transport: number;
    };
    entertainmentFields: {
      cinema: number;
      hobby: number;
      sport: number;
      books: number;
      games: number;
      other_entertainment: number;
    };
    vacationFields: {
      vacation_costs: number;
      vacation_insurance: number;
      cash: number;
      souvenirs: number;
      other_vacation: number;
    };
  };

  type FieldGroup = keyof FormFields;

  const [form, setForm] = useState<FormFields>({
    incomeFields: {
      salary: 0,
      self_employment: 0,
      benefits: 0,
      scholarships: 0,
      other_income: 0,
    },
    billsFields: {
      rent: 0,
      electricity: 0,
      water: 0,
      heating: 0,
      media: 0,
      other_bills: 0,
    },
    costOfLifeFields: {
      groceries: 0,
      clothes: 0,
      cosmetics: 0,
      chemistry: 0,
      restaurants: 0,
      other_cost_of_life: 0,
    },
    insuranceFields: {
      life_insurance: 0,
      health_insurance: 0,
      home_insurance: 0,
      loan_installment: 0,
      other_insurance: 0,
    },
    familyFields: {
      childminder: 0,
      toys: 0,
      kindergarten: 0,
      pet_food: 0,
      vet: 0,
      other_family: 0,
    },
    carFields: {
      car_insurance: 0,
      fuel: 0,
      repairs: 0,
      parking: 0,
      maintenance: 0,
      other_car: 0,
    },
    publicTransportFields: {
      bus: 0,
      tram: 0,
      train: 0,
      taxi: 0,
      other_public_transport: 0,
    },
    entertainmentFields: {
      cinema: 0,
      hobby: 0,
      sport: 0,
      books: 0,
      games: 0,
      other_entertainment: 0,
    },
    vacationFields: {
      vacation_costs: 0,
      vacation_insurance: 0,
      cash: 0,
      souvenirs: 0,
      other_vacation: 0,
    },
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldGroup: FieldGroup
  ) => {
    setForm({
      ...form,
      [fieldGroup]: {
        ...form[fieldGroup],
        [event.target.name]: Number(event.target.value) || 0,
      },
    });
  };

  const handleIncomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(event, "incomeFields");
  };

  const handleBillsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(event, "billsFields");
  };

  const handleCostOfLifeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleInputChange(event, "costOfLifeFields");
  };

  const handleInsuranceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleInputChange(event, "insuranceFields");
  };

  const handleFamilyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(event, "familyFields");
  };

  const handleCarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(event, "carFields");
  };

  const handlePublicTransportChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleInputChange(event, "publicTransportFields");
  };

  const handleEntertainmentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleInputChange(event, "entertainmentFields");
  };

  const handleVacationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(event, "vacationFields");
  };

  const navigate = useNavigate();

  //ZATWIERDZANIE BUDZETU I PRZESYLANIE DO DB
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const Budget_acc_id = userId;
      let currentBudget = null;
      try {
        const response = await axios.get(`http://localhost:3001/api/budgets/${Budget_acc_id}`);
        currentBudget = response.data;
      } catch (error) {
        console.error("Error fetching current budget:", error);
      }
  
      const Budget_income = Object.values(form.incomeFields).reduce(
        (a, b) => a + b,
        0
      );
      const Budget_bills = Object.values(form.billsFields).reduce(
        (a, b) => a + b,
        0
      );
      const Budget_cost_of_life = Object.values(form.costOfLifeFields).reduce(
        (a, b) => a + b,
        0
      );
      const Budget_insurance = Object.values(form.insuranceFields).reduce(
        (a, b) => a + b,
        0
      );
      const Budget_family = Object.values(form.familyFields).reduce(
        (a, b) => a + b,
        0
      );
      const Budget_car = Object.values(form.carFields).reduce(
        (a, b) => a + b,
        0
      );
      const Budget_public_transport = Object.values(
        form.publicTransportFields
      ).reduce((a, b) => a + b, 0);
      const Budget_entertainment = Object.values(
        form.entertainmentFields
      ).reduce((a, b) => a + b, 0);
      const Budget_vacations = Object.values(form.vacationFields).reduce(
        (a, b) => a + b,
        0
      );
  
      const Budget_expenses =
      Budget_bills +
      Budget_cost_of_life +
      Budget_insurance +
      Budget_family +
      Budget_car +
      Budget_public_transport +
      Budget_entertainment +
      Budget_vacations;
      const Budget_summary = Budget_income - Budget_expenses;
  
      const data = {
        Budget_acc_id,
        Budget_income,
        Budget_bills,
        Budget_cost_of_life,
        Budget_insurance,
        Budget_family,
        Budget_car,
        Budget_public_trans: Budget_public_transport,
        Budget_entertainment,
        Budget_vacations,
        Budget_expenses,
        Budget_summary,
      };
  
      if (!currentBudget) { //jesli nie ma budzetu dla uz z tym id to post nowego budzetu
        await axios.post("http://localhost:3001/api/budgets", data);
      } else { //jesli istnieje juz dla niego budzet to jest aktualizowany o nowe wartosci
        const updatedData = {
          Budget_income: parseFloat(currentBudget.budget_income) + Budget_income,
          Budget_bills: parseFloat(currentBudget.budget_bills) + Budget_bills,
          Budget_cost_of_life:
            parseFloat(currentBudget.budget_cost_of_life) + Budget_cost_of_life,
          Budget_insurance: parseFloat(currentBudget.budget_insurance) + Budget_insurance,
          Budget_family: parseFloat(currentBudget.budget_family) + Budget_family,
          Budget_car: parseFloat(currentBudget.budget_car) + Budget_car,
          Budget_public_trans: parseFloat(currentBudget.budget_public_trans) + Budget_public_transport,
          Budget_entertainment:
            parseFloat(currentBudget.budget_entertainment) + Budget_entertainment,
          Budget_vacations: parseFloat(currentBudget.budget_vacations) + Budget_vacations,
          Budget_expenses: parseFloat(currentBudget.budget_expenses) + Budget_bills +
                            Budget_cost_of_life +
                            Budget_insurance +
                            Budget_family +
                            Budget_car +
                            Budget_public_transport +
                            Budget_entertainment +
                            Budget_vacations,
          Budget_summary: Budget_income - Budget_bills,
        };
        console.log("updatedData", updatedData);
        await axios.put(`http://localhost:3001/api/budgets/${Budget_acc_id}`, updatedData);
      }
      navigate('/budget')
    } catch (error) {
      console.error("Error creating budget:", error);
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
          <Col className="col-md-12 text-center my-3">
            <h3 className="heading my-3">
              Dodaj informacje dotyczące Twojego budżetu z {currentMonth}
            </h3>
            <p className="description">
              Wprowadź dane dotyczące Twojego budżetu. Jeżeli któryś przykład
              Cię nie dotyczy, nie wypełniaj go. Po wypełnieniu wszystkich
              danych kliknij przycisk “Dalej”.
              Jeśli wprowadziłeś już dane dotyczące budżetu w tym
              miesiącu i nie chcesz ich edytować możesz przejść do Twojego budżetu tutaj:{" "}
              <Link to="/budget" className="link">
                TWÓJ BUDŻET
              </Link>
            </p>
            <Col className="col-md-8 mx-auto text-start">
              <Accordion defaultActiveKey="0" flush>
                {/* PRZYCHODY */}
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Przychody </Accordion.Header>
                  <Accordion.Body>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Wypłata (po opodatowaniu)</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="salary"
                                value={form.incomeFields.salary}
                                onChange={handleIncomeChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>
                                Zarobki z samozatrudnienia
                              </Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="self_employment"
                                value={form.incomeFields.self_employment}
                                onChange={handleIncomeChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Zasiłki/zapomogi</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="benefits"
                                value={form.incomeFields.benefits}
                                onChange={handleIncomeChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Stypendia</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="scholarships"
                                value={form.incomeFields.scholarships}
                                onChange={handleIncomeChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Inne przychody</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="other_income"
                                value={form.incomeFields.other_income}
                                onChange={handleIncomeChange}
                              />
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
                      <Form.Group className="mb-3">
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Wynajem</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="rent"
                                value={form.billsFields.rent}
                                onChange={handleBillsChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Prąd</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="electricity"
                                value={form.billsFields.electricity}
                                onChange={handleBillsChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Woda</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="water"
                                value={form.billsFields.water}
                                onChange={handleBillsChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Ogrzewanie</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="heating"
                                value={form.billsFields.heating}
                                onChange={handleBillsChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>
                                Media (internet, telewizja, telefon)
                              </Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="media"
                                value={form.billsFields.media}
                                onChange={handleBillsChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Inne opłaty</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="other_bills"
                                value={form.billsFields.other_bills}
                                onChange={handleBillsChange}
                              />
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
                      <Form.Group className="mb-3">
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Zakupy spożywcze</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="groceries"
                                value={form.costOfLifeFields.groceries}
                                onChange={handleCostOfLifeChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Ubrania</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="clothes"
                                value={form.costOfLifeFields.clothes}
                                onChange={handleCostOfLifeChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Kosmetyki</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="cosmetics"
                                value={form.costOfLifeFields.cosmetics}
                                onChange={handleCostOfLifeChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Chemia</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="chemistry"
                                value={form.costOfLifeFields.chemistry}
                                onChange={handleCostOfLifeChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Restauracje</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="restaurants"
                                value={form.costOfLifeFields.restaurants}
                                onChange={handleCostOfLifeChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Inne wydatki</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="other_cost_of_life"
                                value={form.costOfLifeFields.other_cost_of_life}
                                onChange={handleCostOfLifeChange}
                              />
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
                      <Form.Group className="mb-3">
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Ubezpieczenie na życie</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="life_insurance"
                                value={form.insuranceFields.life_insurance}
                                onChange={handleInsuranceChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Ubezpieczenie zdrowotne</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="health_insurance"
                                value={form.insuranceFields.health_insurance}
                                onChange={handleInsuranceChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Ubezpieczenie domu</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="home_insurance"
                                value={form.insuranceFields.home_insurance}
                                onChange={handleInsuranceChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Rata kredytu</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="loan_installment"
                                value={form.insuranceFields.loan_installment}
                                onChange={handleInsuranceChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Inne</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="other_insurance"
                                value={form.insuranceFields.other_insurance}
                                onChange={handleInsuranceChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                      </Form.Group>
                    </Form>
                  </Accordion.Body>
                </Accordion.Item>

                {/* RODZINA/ZWIERZĘTA */}
                <Accordion.Item eventKey="4">
                  <Accordion.Header>Rodzina/zwierzęta </Accordion.Header>
                  <Accordion.Body>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Opiekunka dla dziecka</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="childminder"
                                value={form.familyFields.childminder}
                                onChange={handleFamilyChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>
                                Zabawki/ubrania dla dziecka
                              </Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="toys"
                                value={form.familyFields.toys}
                                onChange={handleFamilyChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>
                                Koszty związane z przedszkolem
                              </Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="kindergarten"
                                value={form.familyFields.kindergarten}
                                onChange={handleFamilyChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>
                                Jedzenie/zabawki dla zwierzęcia
                              </Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="pet_food"
                                value={form.familyFields.pet_food}
                                onChange={handleFamilyChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Weterynarz</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="vet"
                                value={form.familyFields.vet}
                                onChange={handleFamilyChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Inne wydatki</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="other_family"
                                value={form.familyFields.other_family}
                                onChange={handleFamilyChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                      </Form.Group>
                    </Form>
                  </Accordion.Body>
                </Accordion.Item>

                {/* KOSZTY UTRZYMANIA POJAZDU */}
                <Accordion.Item eventKey="5">
                  <Accordion.Header>
                    Koszty utrzymania pojazdu{" "}
                  </Accordion.Header>
                  <Accordion.Body>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Ubezpieczenie pojazdu</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="car_insurance"
                                value={form.carFields.car_insurance}
                                onChange={handleCarChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Paliwo</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="fuel"
                                value={form.carFields.fuel}
                                onChange={handleCarChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Naprawy</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="repairs"
                                value={form.carFields.repairs}
                                onChange={handleCarChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Parkingi</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="parking"
                                value={form.carFields.parking}
                                onChange={handleCarChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Utrzymanie samochodu</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="maintenance"
                                value={form.carFields.maintenance}
                                onChange={handleCarChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Inne wydatki</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="other_car"
                                value={form.carFields.other_car}
                                onChange={handleCarChange}
                              />
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
                      <Form.Group className="mb-3">
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Autobus</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="bus"
                                value={form.publicTransportFields.bus}
                                onChange={handlePublicTransportChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Tramwaj</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="tram"
                                value={form.publicTransportFields.tram}
                                onChange={handlePublicTransportChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Pociąg</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="train"
                                value={form.publicTransportFields.train}
                                onChange={handlePublicTransportChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Taksówka/uber/bolt</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="taxi"
                                value={form.publicTransportFields.taxi}
                                onChange={handlePublicTransportChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Inne wydatki</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="other_public_transport"
                                value={
                                  form.publicTransportFields
                                    .other_public_transport
                                }
                                onChange={handlePublicTransportChange}
                              />
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
                      <Form.Group className="mb-3">
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Kino & teatr</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="cinema"
                                value={form.entertainmentFields.cinema}
                                onChange={handleEntertainmentChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Hobby</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="hobby"
                                value={form.entertainmentFields.hobby}
                                onChange={handleEntertainmentChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Sport</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="sport"
                                value={form.entertainmentFields.sport}
                                onChange={handleEntertainmentChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Książki</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="books"
                                value={form.entertainmentFields.books}
                                onChange={handleEntertainmentChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Gry</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="games"
                                value={form.entertainmentFields.games}
                                onChange={handleEntertainmentChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Inne wydatki</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="other_entertainment"
                                value={
                                  form.entertainmentFields.other_entertainment
                                }
                                onChange={handleEntertainmentChange}
                              />
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
                      <Form.Group className="mb-3">
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>
                                Koszty związane z wakacjami
                              </Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="vacation_costs"
                                value={form.vacationFields.vacation_costs}
                                onChange={handleVacationChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Ubezpieczenie wakacji</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="vacation_insurance"
                                value={form.vacationFields.vacation_insurance}
                                onChange={handleVacationChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Gotówka do wydania</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="cash"
                                value={form.vacationFields.cash}
                                onChange={handleVacationChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Pamiątki/prezenty</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="souvenirs"
                                value={form.vacationFields.souvenirs}
                                onChange={handleVacationChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Row>
                            <Col>
                              <Form.Label>Inne wydatki</Form.Label>
                            </Col>
                            <Col>
                              <Form.Control
                                type="number"
                                name="other_vacation"
                                value={form.vacationFields.other_vacation}
                                onChange={handleVacationChange}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                      </Form.Group>
                    </Form>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
            <Button className="button-submit" onClick={handleSubmit}>
              Dalej
            </Button>
          </Col>
        </Row>
      </Container>

      <Footer></Footer>
    </>
  );
};

export default AddBudget;
