import styles from './brands.module.scss'
import BrandItem from '../brandItem/brandItem'
import Button from '../button/button' 

export default function Brands () {
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
            <div style={{width:'100%',display:'flex',justifyContent:'center'}}><button className={styles.button}>Xem tất cả thương hiệu</button></div>
        </div>
    )
}