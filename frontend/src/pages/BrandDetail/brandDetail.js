import styles from './brandDetail.module.scss'
import Navbar from '../../components/navbar/navbar'
import {useNavigate,useLocation } from 'react-router-dom'
import {useEffect, useState} from 'react'
import stallService from '../../services/stallsService'
import PhoneIcon from '@mui/icons-material/Phone';
import showTimeService from '../../services/showTimeService'
import EventSeatIcon from '@mui/icons-material/EventSeat';

export default function BrandDetail () {
    const navigate = useNavigate()
    const [stall,setStall] = useState(null)
    const useQuery = () => {
        return new URLSearchParams(location.search);
    };
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      };
    const location = useLocation();
    const query = useQuery();
    const id = query.get('id');
    const [showTimes, setShowTimes] = useState([]);
    const [error, setError] = useState(null);

   
   
    useEffect( ()=> {
        const fetchShowTimes = async () => {
            try {
                const date = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại
                const stallId = id; // Thay đổi stallId theo nhu cầu của bạn
                const data = await showTimeService.getMoviesAndShowTimesByDateAndStall(date, stallId);
                setShowTimes(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchShowTimes();
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
            {stall.stallTypeId==3 && <div className={styles.movies}>
             {showTimes.map((showTime) => (
                <div className={styles.movie}>
                    <div className={styles.img} style={{backgroundImage: `url(http://localhost:5209/api/Galleries/download/${showTime.movie.imageId})`}}></div>
                    <div className={styles.content}>
                        <h1>{showTime.movie.title}</h1>
                        <p>{showTime.movie.description}</p>
                        <div className={styles.showTimes}>
                        {showTime.showTimes.map((item) => (
                            <div className={styles.showTime} onClick={()=> navigate(`/booking?id=${item.showTimeId}`)}>{formatTime(item.startTime)}</div>
                        ))}
                        </div>
                        
                    </div>
                </div>
             ))}
            </div>}
        </div>
    )
}
