import styles from './sidebar.module.scss';
import { Link } from 'react-router-dom';
import {useLocation } from 'react-router-dom'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ApartmentIcon from '@mui/icons-material/Apartment';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorefrontIcon from '@mui/icons-material/Storefront';
import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
import TheatersIcon from '@mui/icons-material/Theaters';
import ForumIcon from '@mui/icons-material/Forum';

export default function Sidebar () {
    const role = localStorage.getItem('role')
    const path = useLocation().pathname;
    
    return (
        <div className={ styles.container} style={{display:path.includes('/admin')  ?  'block' : 'none'}}>
            <div style={{margin: '0 0 2em 2em',fontWeight:'700'}}>ABCD MALL</div>
            
            <Link to='/admin/dashboard'>
                <div className={styles.item} style={path.includes('/dashboard') ? {backgroundColor: 'rgb(157 192 0)',color:'white'} : {}}>
                   <DashboardIcon /><span>Dashboard</span>
                </div>
            </Link>
            <Link to='/admin/shop'>
                <div className={styles.item} style={path.includes('/shop') ? {backgroundColor: 'rgb(157 192 0)',color:'white'} : {}}>
                    <StorefrontIcon /><span>Shop</span>
                </div>
            </Link>
           <Link to='/admin/food'>
                <div className={styles.item} style={path.includes('/food') ? {backgroundColor: 'rgb(157 192 0)',color:'white'} : {}}>
                    <BrunchDiningIcon /><span>Food Stall</span>
                </div>
            </Link>
           <Link to='/admin/cinema'>
                <div className={styles.item} style={path.includes('/cinema') ? {backgroundColor: 'rgb(157 192 0)',color:'white'} : {}}>
                    <TheatersIcon /><span>Cinema</span>
                </div>
            </Link>
            <Link to='/admin/feedback'>
            <div className={styles.item} style={path.includes('/feedback') ? {backgroundColor: 'rgb(157 192 0)',color:'white'} : {}}>
                <ForumIcon /><span>Feedback</span>
            </div>
        </Link>
    
        
        </div>  

    )
}