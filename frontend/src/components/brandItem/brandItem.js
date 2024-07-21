import styles from './brandItem.module.scss'
import cinema from '../../assets/images/brand/cinema.png'

export default function BrandItem () {
    return(
        <div className={styles.container}>
            <div className={styles.image} style={{backgroundImage:`url(${cinema})`}}></div>
            <div className={styles.content}>
                <h1>Name</h1>
                <p>Location</p>
            </div>
        </div>
    )
}