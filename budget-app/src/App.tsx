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
import Policy from './Components/Policy';
import Terms from './Components/Terms';
import { AuthProvider } from './service/AuthContext';
import Outgoes from './Components/OutGoes';
import OutgoesDetail from './Components/OutgoesDetail';
import OutgoesEdit from './Components/OutgoesEdit';
import Incomes from './Components/Incomes';
import AddIncome from './Components/AddIncome';
import EditIncome from './Components/EditIncome';
import ModalCookies from './Components/CookiesModal';

class App extends React.Component {
    render() {
        return (
            <AuthProvider>
              <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/addbudgetinfo" element={<AddBudget />} />
                <Route path="/login" element={<Login />} />
                <Route path="/budget" element={<YourBudget />} />
                <Route path="/goals" element={<Goals />} />
                <Route path="/editgoal" element={<EditGoal />} />
                <Route path="/receipts" element={<Receipts />} />
                <Route path="/policy" element={<Policy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/outgoes_detail" element={<OutgoesDetail />} />
                <Route path="/outgoes" element={<Outgoes />} />
                <Route path="/outgoes_edit" element={<OutgoesEdit />} />
                <Route path="/incomes" element={<Incomes />} />
                <Route path="/income_add" element={<AddIncome />} />
                <Route path="/income_edit" element={<EditIncome />} />
              </Routes>
              <ModalCookies />
            </AuthProvider>
        )
    }
}

export default App;