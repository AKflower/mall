import styles from './booking.module.scss'
import showTimeService from '../../services/showTimeService';
import { useState,useEffect } from 'react';
import Navbar from '../../components/navbar/navbar';
import {useNavigate,useLocation } from 'react-router-dom'
import ticketsService from '../../services/ticketsService';
import moviesService from '../../services/moviesService';
import Ptitle from '../../components/ptitle/ptitle';
import Button from '../../components/button/button';


export default function Booking () {
    const [showTime, setShowTime] = useState(null);
    const [error, setError] = useState('');
    const [seatsBooked,setSeatsBooked] = useState([])
    const [seats,setSeats] = useState([])
    const [movie,setMovie] = useState(null)
    const [seatsBooking,setSeatsBooking] = useState([])
    const useQuery = () => {
        return new URLSearchParams(location.search);
    };
    
    const location = useLocation();
    const query = useQuery();
    const id = query.get('id');
    function getLetterFromNumber(number) {
        return String.fromCharCode(64 + number);
    }
    const formatDate = (isoDate) => {
        console.log(isoDate);
        const date = new Date(isoDate);

        // Lấy ngày, tháng và năm
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getUTCFullYear();
        console.log(day,month,year)
        // Kết hợp thành chuỗi DD/MM/YYYY
        return `${day}/${month}/${year}`;
    }
    useEffect(() => {
        
        const fetchShowTime = async () => {
            try {
                const data = await showTimeService.getShowTime(id);
                
                setShowTime(data);
                const movie = await moviesService.getMovie(data.movieId);
                setMovie(movie);
                try {
                    const seatsBooked = await ticketsService.getSeatNumbersByShowtime(id);
                    
                    setSeatsBooked(seatsBooked);
                    var seatsTemp = [];
   
                    for (let i=0; i<data.availableSeats;i++) {

                        console.log('test');
                        var row =  Math.floor(i/10) + 1;
                        
                        var col = i % 10 + 1;
        
                        var name = getLetterFromNumber(row)+''+col;
                        var status = seatsBooked.includes(i+1) ? 1 : 0;
                       
                        seatsTemp.push({row,col,name,status});
                    }
                     
                        
                 
                    setSeats(seatsTemp);
                    console.log(seatsTemp)
                }  catch (err) {
                    setError(err.message);
                }
            } catch (err) {
                setError(err.message);
            }
        };
       
      
        fetchShowTime();
    },[]);
    const handleBook = (seat) => {
        if (seat.status==1) return;
        if (seatsBooking.length>3 && seat.status!=2) return;

        var newSeatsBooking=[]
        if(seat.status==0) newSeatsBooking = [...seatsBooking, seat];
        else if (seat.status==2) {
            console.log('seat: ',seat);
            newSeatsBooking = seatsBooking;
             newSeatsBooking = newSeatsBooking.filter((item) => (item.col!=seat.col || item.row!=seat.row));
            

            
        }
        var seatsTemp = seats;
        var seatTemp = seatsTemp.find((item) => (item.row==seat.row && item.col==seat.col));
        seatTemp.status = seat.status==0 ? 2 : 0;
        setSeats(seatsTemp);
        newSeatsBooking.sort((a, b) => a.row - b.row);

        setSeatsBooking(newSeatsBooking);
    };
    if (!showTime || !movie) return;
    return (

        <div className={styles.container}>
            <Navbar />
            <h1>Booking</h1>
            <div className={styles.bookingContainer}>
                <div className={styles.infor}>
                    <div className={styles.inforCard}>
                        {movie && 
                        <div className={styles.inforMovie}>
                            <div className={styles.poster} style={{backgroundImage: `url(http://localhost:5209/api/Galleries/download/${movie.imageId})`}}></div>
                           <div> 
                                <h3>{movie.title}</h3>
                                <p>{movie.description}</p>
                                <Ptitle title={'Date'} content={formatDate(showTime.startTime)} />
                                <Ptitle title={'Duration'} content={movie.duration + ' minutes'}/>
                            </div>
                            
                        </div>}
                        <div className={styles.inforBooking}>
                            <p>Theater: CGV</p>
                            <Ptitle title={'Cinema Hall'} content={showTime.cinemaHallId}/>
                            <div><span style={{fontWeight:'700'}}>Seat: </span> 
                            {seatsBooking.map((seat,index) => (
                                <span>{index >0 && ','} {seat.name}</span>
                            ))}
                            {seatsBooking.length ==0 && <span>You can select up to 4 seats only!</span>}
                            </div>
                        </div> 
                        {seatsBooking.length!=0 && <div className={styles.btnContainer}><Button name={'Book'}/></div>}
                    </div>
                </div>
                <div className={styles.bookSeat}>
                    <div className={styles.screenContainer}>
                        
                        <div className={styles.curve}></div>
                        <h2>Screen</h2>
                    </div>
                    <div className={styles.seats}>
                        {seats.map((seat) => (
                            <div className={styles.seat} onClick={() => handleBook(seat)} style={(seat.status==2) ? {backgroundColor:'orange'}: seat.status==1 ? {backgroundColor:'red',cursor:'default'} : {backgroundColor:'#51a997'}}>{seat.name}</div>
                        ))}
                       
                    </div>
                </div>
                
            </div>
            
        </div>
    )
}