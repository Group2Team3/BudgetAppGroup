import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MainNavbar } from "./MainNavbar";
import { Footer } from "./Footer";
import '../Style/Login.css';
import Button from "@mui/material/Button";
import fb from "../assets/budgetImages/facebook.png";
import google from "../assets/budgetImages/google.png";

type State = {
  username: string
  password:  string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
};

const initialState:State = {
  username: '',
  password: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false
};

type Action = { type: 'setUsername', payload: string }
  | { type: 'setPassword', payload: string }
  | { type: 'setIsButtonDisabled', payload: boolean }
  | { type: 'loginSuccess', payload: string }
  | { type: 'loginFailed', payload: string }
  | { type: 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setUsername': 
      return {
        ...state,
        username: action.payload
      };
    case 'setPassword': 
      return {
        ...state,
        password: action.payload
      };
    case 'setIsButtonDisabled': 
      return {
        ...state,
        isButtonDisabled: action.payload
      };
    case 'loginSuccess': 
      return {
        ...state,
        helperText: action.payload,
        isError: false
      };
    case 'loginFailed': 
      return {
        ...state,
        helperText: action.payload,
        isError: true
      };
    case 'setIsError': 
      return {
        ...state,
        isError: action.payload
      };
  }
}

const Login = () => {
    let [authMode, setAuthMode] = useState("signin")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
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
          <Container className="py-5 px-5">
          <Row className="login-centered-content login-reg-container mx-4 my-4 px-5 py-5">
            <Col className="login-container col-md-6 px-2 py-4">
            <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Zaloguj się</h3>
                <div className="form-group mt-4">
                <label>E-mail</label>
                <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email" />
          </div>
          <div className="form-group mt-4">
            <label>Hasło</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"/>
          </div>
          <div className="justify-content-center d-grid gap-2 mt-5">
          <Button className="button" variant="contained">Zaloguj</Button>
          </div>
          <div className="d-flex justify-content-center align-items-center mt-4">
                  <hr className="flex-grow-1 hr-thick" />
                  <span className="mx-2">lub</span>
                  <hr className="flex-grow-1 hr-thick" />
                </div>
        </div>
      </form>
    </div>
    <div className="d-flex justify-content-center mt-5">
    <div className="image-container mx-5">
    <img src={google} alt="Google logo" className="App-icons" />
  </div>
  <div className="image-container  mx-5">
    <img src={fb} alt="Facebook logo" className="App-icons" />
  </div>
</div>
    </Col>
            <Col className="register-container col-md-6 px-2 py-4">
            <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Zarejestruj się</h3>
          <div className="form-group mt-3">
            <label>Nazwa użytkownika</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"/>
          </div>
          <div className="form-group mt-3">
            <label>E-mail</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"/>
          </div>
          <div className="form-group mt-3">
            <label>Hasło</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"/>
          </div>
          <div className="form-group mt-3">
            <label>Powtórz hasło</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"/>
          </div>
          <div className="justify-content-center d-grid gap-2 mt-5">
          <Button className="button" variant="contained">Zarejestruj</Button>
          </div>
        </div>
      </form>
    </div>
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

export default Login;