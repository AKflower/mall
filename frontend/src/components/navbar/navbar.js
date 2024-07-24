import styles from './navbar.module.scss'
import { Link,useLocation } from 'react-router-dom'

export default function Navbar() {
    const location = useLocation();
    const path = location.pathname;
    return (
        <div className={styles.container} style={{opacity: path!='/' ? 1 : .5}}> 
            <Link to={'/'}><div className={path=='/' ? styles.tabActive : styles.tab}>Trang chủ</div></Link>
            <Link to={'/'}><div className={styles.tab}>Giới thiệu</div></Link>
            <Link to={'/brand'}><div className={path.includes('/brand') || path.includes('/booking') ? styles.tabActive : styles.tab}>Thương hiệu</div></Link>
        </div>
    )
}