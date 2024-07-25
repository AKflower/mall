import styles from './brandItem.module.scss'
import cinema from '../../assets/images/brand/cinema.png'
import {useNavigate}  from 'react-router-dom'
import galleryService from '../../services/galleriesService'

export default function BrandItem ({name,parking,stallId,imageId,isAdmin=false}) {
   
    const navigate = useNavigate()
    const handleGoToDetail = () => {
        if (isAdmin) {
            navigate(`/admin/editBrand?id=${stallId}`)
        }
        else navigate(`/brandDetail?id=${stallId}`)
    }
    const handleImage = async (imageId) => {
       const data= await galleryService.downloadImage(imageId)
       return data;
    }
    return(
        <div className={styles.container} onClick={() => handleGoToDetail()}>
            <div className={styles.image} style={{backgroundImage:`url(http://localhost:5209/api/Galleries/download/${imageId})`}}></div>
            <div className={styles.content}>
                <h1>{name}</h1>
                <p>{parking}</p>
            </div>
        </div>
    )
}