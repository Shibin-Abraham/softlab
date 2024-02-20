import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';

import NavBar from './Components/NavBar/NavBar.jsx';
import DashBoard from './Components/DashBoard/DashBoard.jsx';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<DashBoard />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
