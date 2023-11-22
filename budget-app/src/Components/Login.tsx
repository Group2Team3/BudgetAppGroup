import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MainNavbar } from "./MainNavbar";
import { Footer } from "./Footer";
import '../Style/Login.css';
import Button from "@mui/material/Button";
import fb from "../assets/budgetImages/facebook.png";
import google from "../assets/budgetImages/google.png";
import axios from "axios";
import { useAuth } from "../service/AuthContext";
import { useNavigate  } from 'react-router-dom';

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

const Login: React.FC = () => {
    //let [authMode, setAuthMode] = useState("signin")

    const [state, setState] = useState(initialState);
    const { setLogin } = useAuth();
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
      try {
        // Make a GET request to your login API endpoint
        const response = await axios.post('http://localhost:3001/api/users', {
          email: state.username,
          password: state.password,
        });
  
        // Assuming your server responds with a success message
        setState({ ...state, helperText: 'Login successful', isError: false });
        setLogin(true); // Update login state
        console.log(response.data)
        setUserId(response.data.user.id); 
        console.log('Logging in:');

        localStorage.setItem('login', JSON.stringify(true));
        localStorage.setItem('userId', response.data.user.id);

        navigate('/addbudgetinfo');
        
  
        // Redirect or perform other actions based on success
      } catch (error) {
        // Handle errors
        console.error('Error logging in:', error);
  
        // Assuming your server responds with an error message
        setState({ ...state, helperText: 'Login failed. Please try again.', isError: true });
      }
    };

    const handleRegister = async () => {
      try {
        const response = await axios.post('http://localhost:3001/api/users/register', {
          name: state.username, // assuming 'name' corresponds to the user's name
          email: state.username,
          password: state.password,
        });
  
        setState({ ...state, helperText: 'Registration successful', isError: false });
                // Assuming your server responds with a success message
        setLogin(true); // Update login state
        console.log('Register in:');
        localStorage.setItem('login', JSON.stringify(true));
        localStorage.setItem('userId', response.data.user.id);
        
        // Optionally, you can automatically log in the user after successful registration
        navigate('/addbudgetinfo');
      } catch (error) {
        console.error('Error registering:', error);
        setState({ ...state, helperText: 'Registration failed. Please try again.', isError: true });
      }
    };
  
  
  // const changeAuthMode = () => {
  //   setAuthMode(authMode === "signin" ? "signup" : "signin")
  // }
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
            <Col className="login-container col-sm-12 col-md-6 px-2 py-4">
            <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Zaloguj się</h3>
                <div className="form-group mt-4">
                <label>E-mail</label>
                <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email" 
                onChange={(e) => setState({ ...state, username: e.target.value })}/>
          </div>
          <div className="form-group mt-4">
            <label>Hasło</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => setState({ ...state, password: e.target.value })}/>
          </div>
          {state.isError && (
                    <div className="error-message">
                      {state.helperText}
                    </div>
          )}
          <div className="justify-content-center d-grid gap-2 mt-5">
          <Button className="button" variant="contained" onClick={handleLogin}>Zaloguj</Button>
          </div>
        </div>
      </form>
    </div>
    </Col>
            <Col className="register-container col-sm-12 col-md-6 px-2 py-4">
            <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Zarejestruj się</h3>
          <div className="form-group mt-3">
            <label>Nazwa użytkownika</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              onChange={(e) => setState({ ...state, username: e.target.value })}/>
          </div>
          <div className="form-group mt-3">
            <label>E-mail</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={(e) => setState({ ...state, username: e.target.value })}/>
          </div>
          <div className="form-group mt-3">
            <label>Hasło</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={(e) => setState({ ...state, password: e.target.value })}/>
          </div>
          <div className="form-group mt-3">
            <label>Powtórz hasło</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"/>
          </div>
          <div className="justify-content-center d-grid gap-2 mt-5">
          <Button className="button" variant="contained"  onClick={handleRegister}>Zarejestruj</Button>
          </div>
        </div>
      </form>
    </div>
            </Col>
          </Row>
          </Container>

          <Footer></Footer>
        </>
    );
}

export default Login;

