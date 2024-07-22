import styles from './gallery.module.scss'
import clothes from '../../assets/images/clothes.png'
import jewellery from '../../assets/images/jewellery.png'
import cinema from '../../assets/images/cinema.png'
import food from '../../assets/images/food.png'

export default function Gallery () {
    return (
        <div className={styles.container}>
            <div className={styles.pic}>
                <img src={clothes}/>
               
            </div>
            <div className={styles.pic}>
                <img src={food}/>
            </div>
            <div className={styles.pic}>
                <img src={cinema}/>
            </div>
        </div>
    )
}