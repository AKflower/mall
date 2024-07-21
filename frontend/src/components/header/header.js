import styles from './header.module.scss'
import Navbar from '../navbar/navbar'
import cover from '../../assets/images/cover.jpg'
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStairs } from '@fortawesome/free-solid-svg-icons';

export default function  Header() {
    return (
        <div className={styles.container}> 
            <Navbar />
            <div className={styles.coverContainer}>
                <img src={cover} style={{width:'100%'}}/>
                <div className={styles.titleContainer}>
                <div className={styles.title}>
                   <FilterNoneIcon /> <span>23 KM<sup>2</sup></span>
                </div>
                <div className={styles.title}>
                <FontAwesomeIcon icon={faStairs} /> <span>4 FLOORS</span>
                </div>
                </div>
                
            </div>
        </div>
    )
}