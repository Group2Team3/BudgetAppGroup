import React from 'react';
import './App.css';
import { StartPage } from './Components/StartPage';
import { Route, Routes } from 'react-router-dom';
import AddBudget from './Components/AddBudget';
import Login from './Components/Login';
import YourBudget from './Components/YourBudget';
import Goals from './Components/Goals';
import EditGoal from './Components/EditGoal';
import Receipts from './Components/Receipts';

class App extends React.Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/addbudgetinfo" element={<AddBudget />} />
                <Route path="/login" element={<Login />} />
                <Route path="/budget" element={<YourBudget />} />
                <Route path="/goals" element={<Goals />} />
                <Route path="/editgoal" element={<EditGoal />} />
                <Route path="/receipts" element={<Receipts />} />
            </Routes>
        )
    }
}

export default App;