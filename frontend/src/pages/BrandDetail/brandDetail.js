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

        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today = new Date();

        const getFormattedDate = (date) => {
            const day = date.getDate();
            const month = date.getMonth() + 1; // Months are zero-based
            const year = date.getFullYear();
            const dayOfWeek = daysOfWeek[date.getDay()];
            return `${dayOfWeek}, ${day}/${month}/${year}`;
        };

        const todayFormatted = getFormattedDate(today);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const tomorrowFormatted = getFormattedDate(tomorrow);

        const dayAfterTomorrow = new Date(today);
        dayAfterTomorrow.setDate(today.getDate() + 2);
        const dayAfterTomorrowFormatted = getFormattedDate(dayAfterTomorrow);
    
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
           {stall.stallTypeId!=3 && <h3>Product</h3>}
           {stall.stallTypeId!=3 && <div className={styles.products}>
                {stall.products.map((product) => (
                    <div className={styles.product} key={product.productId}>
                        <div className={styles.imgCover} style={{backgroundImage: `url(http://localhost:5209/api/Galleries/download/${product.imageId})`}}></div>
                        <div className={styles.content}>
                            <h5>{product.name}</h5>
                            <p>{product.description}</p>
                        </div> 
                    </div>
                    
                ))}
            </div> 
            }
            {stall.stallTypeId==3 && <h3>Movies</h3> }
            {stall.stallTypeId==3 && 
                <div className={styles.date}>
                    <div className={styles.dateBox}>
                    
                    <p>{todayFormatted}</p>
                </div>
                <div className={styles.dateBox}>
                    
                    <p>{tomorrowFormatted}</p>
                </div>
                <div className={styles.dateBox}>
                    
                    <p>{dayAfterTomorrowFormatted}</p>
                </div>
                </div>
            }
        </div>
    )
}