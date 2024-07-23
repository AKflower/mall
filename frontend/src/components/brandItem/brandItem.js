import styles from './brandItem.module.scss'
import cinema from '../../assets/images/brand/cinema.png'
import {useNavigate}  from 'react-router-dom'
import galleryService from '../../services/galleriesService'

export default function BrandItem ({name,location,stallId,imageId}) {
    console.log(name,location,stallId,imageId);
    const navigate = useNavigate()
    const handleGoToDetail = () => {
        navigate(`/brandDetail?id=${stallId}`)
    }
    const handleImage = async (imageId) => {
       const data= await galleryService.downloadImage(imageId)
       return data;
    }
    return(
        <div className={styles.container} onClick={() => handleGoToDetail()}>
            <div className={styles.image} style={{backgroundImage:`url(${handleImage(imageId)})`}}></div>
            <div className={styles.content}>
                <h1>{name}</h1>
                <p>Floor {location}</p>
            </div>
        </div>
    )
}