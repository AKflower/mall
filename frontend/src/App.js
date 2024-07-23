import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/navbar';
import { BrowserRouter, Route, Link, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/header/header';
import Home from './pages/Home/Home';
import Login from './pages/Login/login';
import Brand from './pages/Brand/brand';
import BrandDetail from './pages/BrandDetail/brandDetail';
import Dashboard from './pages/Dashboard/dashboard';
import Sidebar from './components/sidebar/sidebar';
import Shop from './pages/Shop/shop';
import CinemaManage from './pages/Cinema/cinemaManage';
import FoodStall from './pages/FoodStall/foodStall';
import Feedback from './pages/Feedback/feedback';
import Gallery from './pages/Gallery/gallery';
function App() {
  return (

    <BrowserRouter>
    <Sidebar />
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/admin' element={<Login />} />
    <Route path='/brand' element={<Brand />} />
    <Route path='/brandDetail' element={<BrandDetail />} />
    <Route path='/admin/dashboard' element={<Dashboard />} />
    <Route path='/admin/shop' element={<Shop />} />
    <Route path='/admin/food' element={<FoodStall />} />
    <Route path='/admin/cinema' element={<CinemaManage />} />
    <Route path='/admin/feedback' element={<Feedback />} />
    <Route path='/admin/gallery' element={<Gallery />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
