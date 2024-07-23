import styles from './gallery.module.scss'
import galleryService from '../../services/galleriesService'
import {useState,useEffect} from 'react'
import Button from '../../components/button/button';


export default function Gallery() {
    const [galleries, setGalleries] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchGalleries = async () => {
            try {
                const data = await galleryService.getGalleries();
                setGalleries(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchGalleries();
    }, []); 
    
    return (
        <div className='main'>
            <div className={styles.header}>
                <h1>Gallery</h1>
                <div className={styles.btnContainer}><Button name={'New'} color='green'/></div>
            </div>
            <div className={styles.galleries}>
                {galleries.map((gallery) => (
                    <div className={styles.img} style= {{backgroundImage:`url(http://localhost:5209/api/Galleries/download/${gallery.imageId})`}}>
                        <div className={styles.overlay}>
                          
                        </div>
                        <h4>{gallery.name}</h4>
                    </div>
                ))}
            </div>
            
        </div>
    )
}