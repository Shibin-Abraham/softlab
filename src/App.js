import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';

import NavBar from './Components/NavBar/NavBar.jsx';
import DashBoard from './Components/DashBoard/DashBoard.jsx';
import Users from './Components/Users/Users.jsx';
import StockDetails from './Components/StockDetails/StockDetails.jsx';
import ItemDetails from './Components/ItemDetails/ItemDetails.jsx';
import Borrowers from './Components/Borrowers/Borrowers.jsx';
import AuditLog from './Components/AuditLog/AuditLog.jsx';
import Login from './Login/Login.jsx';
import SignUp from './Login/SignUp.jsx';
import VerifyOTP from './Login/VerifyOTP.jsx';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
        <Routes>
          {/*<Route path="/" element={<Login />}/>*/}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/verifyotp' element={<VerifyOTP />} />
          <Route path="/" element={<DashBoard />}/>
          <Route path='/users' element={<Users />} />
          <Route path='/stock' element={<StockDetails />} />
          <Route path='/items' element={<ItemDetails />} />
          <Route path='/borrowers' element={<Borrowers />} />
          <Route path='/audit' element={<AuditLog />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
