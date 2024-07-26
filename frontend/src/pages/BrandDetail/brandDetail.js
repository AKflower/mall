import styles from './brandDetail.module.scss'
import Navbar from '../../components/navbar/navbar'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import stallService from '../../services/stallsService'
import PhoneIcon from '@mui/icons-material/Phone';
import showTimeService from '../../services/showTimeService'
import EventSeatIcon from '@mui/icons-material/EventSeat';

export default function BrandDetail() {
    const navigate = useNavigate()
    const [stall, setStall] = useState(null)
    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-CA'));
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

    useEffect(() => {
        const fetchShowTimes = async (date) => {
            try {
                const stallId = id; // Thay đổi stallId theo nhu cầu của bạn
                const data = await showTimeService.getMoviesAndShowTimesByDateAndStall(date, stallId);
                setShowTimes(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchShowTimes(selectedDate);

        const fetchStall = async () => {
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
    }, [selectedDate, id]);

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const getFormattedDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();
        const dayOfWeek = daysOfWeek[date.getDay()];
        return `${dayOfWeek}, ${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    };
    const today = new Date();
    const todayFormatted = getFormattedDate(today);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowFormatted = getFormattedDate(tomorrow);

    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);
    const dayAfterTomorrowFormatted = getFormattedDate(dayAfterTomorrow);

    // Đổi sang định dạng 'YYYY-MM-DD' cho selectedDate
    const formatDateForApi = (date) => {
        return date.toLocaleDateString('en-CA'); // 'en-CA' cho định dạng YYYY-MM-DD
    };

    if (!stall) return;
    return (
        <div className={styles.container}>
            <Navbar />
            <h1 className={styles.title}>Brand Detail</h1>
            <h2>{stall.name} </h2>
            <div className={styles.contact}><PhoneIcon /> {stall.contactInfo}</div>
            <div className={styles.content}>
                <div className={styles.description}>
                    {stall.description.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                </div>
                <div className={styles.imgCover}>
                    <img src={`http://localhost:5209/api/Galleries/download/${stall.imageId}`} width={'50%'} />
                </div>
            </div>
            {stall.stallTypeId != 3 && <h3>Product</h3>}
            {stall.stallTypeId != 3 && <div className={styles.products}>
                {stall.products.map((product) => (
                    <div className={styles.product} key={product.productId}>
                        <div className={styles.imgCover} style={{ backgroundImage: `url(http://localhost:5209/api/Galleries/download/${product.imageId})` }}></div>
                        <div className={styles.content}>
                            <h5>{product.name}</h5>
                            <p>{product.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            }
            {stall.stallTypeId == 3 && <h3>Movies</h3>}
            {stall.stallTypeId == 3 &&
                <div className={styles.date}>
                    <div className={`${styles.dateBox} ${selectedDate === formatDateForApi(today) ? styles.selectedDate : ''}`} onClick={() => setSelectedDate(formatDateForApi(today))}>
                        <p>{todayFormatted}</p>
                    </div>
                    <div className={`${styles.dateBox} ${selectedDate === formatDateForApi(tomorrow) ? styles.selectedDate : ''}`} onClick={() => setSelectedDate(formatDateForApi(tomorrow))}>
                        <p>{tomorrowFormatted}</p>
                    </div>
                    <div className={`${styles.dateBox} ${selectedDate === formatDateForApi(dayAfterTomorrow) ? styles.selectedDate : ''}`} onClick={() => setSelectedDate(formatDateForApi(dayAfterTomorrow))}>
                        <p>{dayAfterTomorrowFormatted}</p>
                    </div>
                </div>
            }
            {stall.stallTypeId == 3 && <div className={styles.movies}>
                {showTimes.map((showTime) => (
                    !showTime.isDisabled && <div className={styles.movie} key={showTime.movie.movieId}>
                        <div className={styles.img} style={{ backgroundImage: `url(http://localhost:5209/api/Galleries/download/${showTime.movie.imageId})` }}></div>
                        <div className={styles.content}>
                            <h1>{showTime.movie.title}</h1>
                            <p>{showTime.movie.description}</p>
                            <div className={styles.showTimes}>
                                {showTime.showTimes.map((item) => (
                                    <div className={styles.showTime} key={item.showTimeId} onClick={() => navigate(`/booking?id=${item.showTimeId}`)}>{formatTime(item.startTime)}</div>
                                ))}
                                {showTime.length == 0 && <h2>There are no showtimes yet!</h2>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>}
        </div>
    )
}
