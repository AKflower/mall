import styles from './button2.module.scss'

export default function Button2 ({name,color}) {
    return (
        <button className={styles.btn} style={{background:color}}>
        {name}
        </button>
     )
}