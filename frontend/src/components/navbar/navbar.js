import styles from './navbar.module.scss'

export default function Navbar() {
    return (
        <div className={styles.container}> 
            <div className={styles.tab}>Trang chủ</div>
            <div className={styles.tab}>Giới thiệu</div>
            <div className={styles.tab}>Thương hiệu</div>
        </div>
    )
}