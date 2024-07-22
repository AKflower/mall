import styles from './footer.module.scss'
import Input from '../../components/input/input'
import RatingComponent from '../rating/rating'
import Button2 from '../button/button2'

export default function Footer() {
    return (
        <div className={styles.container}>
            <div className={styles.overlay}>
              
            </div>
            <div className={styles.footerContainer}>
                <h1>
                    ABCD MAll
                </h1>
                <RatingComponent />
                <Input label={'Leave your feedback'} isTextArea={true}/>
                <div className={styles.btnContainer}><Button2 name={'Gửi'}/></div>
            </div>
            
        </div>
    )
}