import styles from './brands.module.scss'
import BrandItem from '../brandItem/brandItem'
import Button from '../button/button' 
import { useNavigate } from 'react-router-dom'
import {useState,useEffect} from 'react'
import stallService from '../../services/stallsService'

export default function Brands () {
    const [brands,setBrands] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const fetchTopPick = async () => {
            const data = await stallService.getTopPickStalls();
            setBrands(data);
        }
        fetchTopPick();
    },[])
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.overlay}>
                    <h1>Thương hiệu</h1>
                </div>
            </div>
            <div className={styles.brandlist}>
            {brands.map((brand)=> (
                <BrandItem imageId={brand.imageId} name={brand.name} parking={brand.parking} stallId={brand.stallId}/>
            ))}
               
            </div>
            <div style={{width:'100%',display:'flex',justifyContent:'center'}}><button className={styles.button} onClick={() => navigate('/brand')}>Xem tất cả thương hiệu</button></div>
        </div>
    )
}