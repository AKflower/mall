import styles from './brandItem.module.scss'
import cinema from '../../assets/images/brand/cinema.png'
import {useNavigate}  from 'react-router-dom'

export default function BrandItem ({name,location,stallId,imageId}) {
    const navigate = useNavigate()
    const handleGoToDetail = () => {
        navigate(`/brandDetail?id=${stallId}`)
    }
    return(
        <div className={styles.container} onClick={() => handleGoToDetail()}>
            <div className={styles.image} style={{backgroundImage:`url(http://localhost:5209/api/Galleries/download/${imageId})`}}></div>
            <div className={styles.content}>
                <h1>{name}</h1>
                <p>Floor {location}</p>
            </div>
        </div>
    )
}