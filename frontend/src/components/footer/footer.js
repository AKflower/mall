import styles from './footer.module.scss'

export default function Footer() {
    return (
        <div className={styles.container}>
            <div className={styles.overlay}>
              
            </div>
            <div className={styles.footerContainer}>
                <h1>
                    ABCD MAll
                </h1>
                <p>
                Chhatrapati Shivaji Terminus Area, Fort, Mumbai, Maharashtra
                </p>
            </div>
        </div>
    )
}