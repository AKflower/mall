import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/navbar';
import { BrowserRouter, Route, Link, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/header/header';
import Home from './pages/Home/Home';
import Login from './pages/Login/login';
import Brand from './pages/Brand/brand';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/admin/login' element={<Login />} />
    <Route path='/brand' element={<Brand />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
