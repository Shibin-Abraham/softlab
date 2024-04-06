import { useState,useContext} from 'react';
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
import PrivateRoutes from './Components/Utils/PrivateRoutes.jsx';
import { StateContext } from './Components/AuthProvider/AuthProvider.jsx';
import InActive from './Login/InActive.jsx';


function App() {
  let [nav,setNav] = useState('')
  
  const authData = useContext(StateContext)
  
  return (
    <BrowserRouter>
      {console.log("authData",authData)}
      { authData.authentication === true && <NavBar roleId={nav}/>}
        <Routes>
          <Route path='/login' element={<Login setNav={setNav}/>} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/verifyotp' element={<VerifyOTP />} />
          <Route path='/inactive' element={<InActive />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<DashBoard />}/>
            {nav === '1' && <Route path='/users' element={<Users />} />}
            <Route path='/stock' element={<StockDetails />} />
            <Route path='/items' element={<ItemDetails />} />
            <Route path='/borrowers' element={<Borrowers />} />
            <Route path='/audit' element={<AuditLog />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
