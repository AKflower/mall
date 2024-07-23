import styles from './brand.module.scss'
import Navbar from '../../components/navbar/navbar'
import BrandItem from '../../components/brandItem/brandItem'
import {useState, useEffect} from 'react'
import stallService from '../../services/stallsService'

export default function Brand () {
    const [stalls, setStalls] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStalls = async () => {
            try {
                const data = await stallService.getStalls();
                setStalls(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchStalls();
    }, []);
    return (
        <div className={styles.container}>
        <Navbar />
        <h1 className={styles.title}>Brands</h1>
        <div className={styles.filter}>
            <div className={styles.filterOption}><span>All</span></div>
            <div className={styles.filterOption}><span>Floor 1</span></div>
            <div className={styles.filterOption}><span>Floor 2</span></div>
            <div className={styles.filterOption}><span>Floor 3</span></div>
            <div className={styles.filterOption} style={{border:'none'}}><span>Floor 4</span></div>
        </div>
        <div className={styles.brandlist}>
            <BrandItem />
            <BrandItem />
            <BrandItem /> 
            <BrandItem />
            <BrandItem />
            <BrandItem />
            <BrandItem />
            <BrandItem />
            <BrandItem />
        </div>
        </div>
    )
}