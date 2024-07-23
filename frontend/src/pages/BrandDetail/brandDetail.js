import styles from './brandDetail.module.scss'
import Navbar from '../../components/navbar/navbar'
import {useNavigate,useLocation } from 'react-router-dom'
import {useEffect, useState} from 'react'
import stallService from '../../services/stallsService'
import PhoneIcon from '@mui/icons-material/Phone';

export default function BrandDetail () {
    const [stall,setStall] = useState(null)
    const useQuery = () => {
        return new URLSearchParams(location.search);
    };
    const location = useLocation();
    const query = useQuery();
    const id = query.get('id');
   
    useEffect( ()=> {
        const fetchStall =  async () => {
            try {
                const data = await stallService.getStall(id);
                var descriptionArray = data.description.split('//');
                data.description = descriptionArray;
                setStall(data)
            }
            catch (err) {
                console.error(err.message)
            }

        };
        fetchStall();
        
    }, [])
    if (!stall) return; 
    return (
        <div className={styles.container}>
            <Navbar />
            <h1 className={styles.title}>Brand Detail</h1>
            <h2>{stall.name} </h2>
            <div className={styles.contact}><PhoneIcon /> {stall.contactInfo}</div>
            <div className={styles.content}>
                <div className={styles.description}>
               
                {stall.description.map((item) => (
                    <p>{item}</p>
                ))}
                </div>
                <div className={styles.imgCover}>
                    <img src={`http://localhost:5209/api/Galleries/download/${stall.imageId}`} width={'50%'}/>
                </div>
            </div>
            <h3>Product</h3>
        </div>
    )
}