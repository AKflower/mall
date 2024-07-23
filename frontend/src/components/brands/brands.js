import styles from './brands.module.scss'
import BrandItem from '../brandItem/brandItem'
import Button from '../button/button' 
import { useNavigate } from 'react-router-dom'

export default function Brands () {
    const navigate = useNavigate()
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.overlay}>
                    <h1>Thương hiệu</h1>
                </div>
            </div>
            <div className={styles.brandlist}>
                <BrandItem />
            </div>
            <div style={{width:'100%',display:'flex',justifyContent:'center'}}><button className={styles.button} onClick={() => navigate('/brand')}>Xem tất cả thương hiệu</button></div>
        </div>
    )
}