import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './style.css';

import NavBar from './components/NavBar.jsx';
import DashBoard from './components/DashBoard.jsx';

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
