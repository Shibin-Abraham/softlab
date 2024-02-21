import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';

import NavBar from './Components/NavBar/NavBar.jsx';
import DashBoard from './Components/DashBoard/DashBoard.jsx';
import Users from './Components/Users/Users.jsx';
import StockDetails from './Components/StockDetails/StockDetails.jsx';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<DashBoard />}/>
          <Route path='/users' element={<Users />} />
          <Route path='/stock' element={<StockDetails />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
