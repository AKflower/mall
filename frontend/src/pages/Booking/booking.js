import styles from './booking.module.scss';
import showTimeService from '../../services/showTimeService';
import { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import ticketsService from '../../services/ticketsService';
import moviesService from '../../services/moviesService';
import Ptitle from '../../components/ptitle/ptitle';
import Button from '../../components/button/button';
import Modal from 'react-modal';
import Input from '../../components/input/input';

Modal.setAppElement('#root'); // Đây là phần tử chứa ứng dụng của bạn, thường là id của root

export default function Booking() {
    const navigate = useNavigate()
    const [showTime, setShowTime] = useState(null);
    const [error, setError] = useState('');
    const [seatsBooked, setSeatsBooked] = useState([]);
    const [seats, setSeats] = useState([]);
    const [movie, setMovie] = useState(null);
    const [seatsBooking, setSeatsBooking] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const useQuery = () => {
        return new URLSearchParams(location.search);
    };
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phone: '',
        credit: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const location = useLocation();
    const query = useQuery();
    const id = query.get('id');

    function getLetterFromNumber(number) {
        return String.fromCharCode(64 + number);
    }

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`;
    };

    const formatTime = (isoDate) => {
        const date = new Date(isoDate);
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };
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
                for (let i = 0; i < data.availableSeats; i++) {
                    var row = Math.floor(i / 10) + 1;
                    var col = i % 10 + 1;
                    var name = getLetterFromNumber(row) + '' + col;
                    var status = seatsBooked.includes(i + 1) ? 1 : 0;
                    seatsTemp.push({ row, col, name, status });
                }
                setSeats(seatsTemp);
            } catch (err) {
                setError(err.message);
            }
        } catch (err) {
            setError(err.message);
        }
    };
    useEffect(() => {
       
        fetchShowTime();
    }, []);

    const handleBook = (seat) => {
        if (seat.status == 1) return;
        if (seatsBooking.length > 3 && seat.status != 2) return;

        var newSeatsBooking = [];
        if (seat.status == 0) newSeatsBooking = [...seatsBooking, seat];
        else if (seat.status == 2) {
            newSeatsBooking = seatsBooking.filter((item) => item.col != seat.col || item.row != seat.row);
        }
        var seatsTemp = seats;
        var seatTemp = seatsTemp.find((item) => item.row == seat.row && item.col == seat.col);
        seatTemp.status = seat.status == 0 ? 2 : 0;
        setSeats(seatsTemp);
        newSeatsBooking.sort((a, b) => a.row - b.row);
        setSeatsBooking(newSeatsBooking);
    };

    const handleBookClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handlePayment = async () => {
        
            
            if (formData.credit=='') return;
            const tickets = seatsBooking.map(seat => ({
                SeatNumber: seat.row * 10 + seat.col,
                ShowTimeId: showTime.showTimeId,
                TotalPrice: showTime.price,
                Credit: formData.credit,
                Name: formData.name,
                Mail: formData.email,
                Phone: formData.phone,
                
                // Các thuộc tính khác nếu cần
            }));
           
    
            try {
                await ticketsService.createTicketsBulk(tickets);
                fetchShowTime();
                closeModal();
                setSeatsBooking([])
                // Điều hướng hoặc các hành động khác sau khi đặt vé thành công
            } catch (error) {
                alert('Failed to book tickets: ' + error.message);
            }
        
    }
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
                                <div className={styles.poster} style={{ backgroundImage: `url(http://localhost:5209/api/Galleries/download/${movie.imageId})` }}></div>
                                <div>
                                    <h3>{movie.title}</h3>
                                    <p>{movie.description}</p>
                                    <Ptitle title={'Date'} content={formatDate(showTime.startTime)} />
                                    <Ptitle title={'Time'} content={formatTime(showTime.startTime)} />
                                    <Ptitle title={'Duration'} content={movie.duration + ' minutes'} />
                                </div>
                            </div>}
                        <div className={styles.inforBooking}>
                            <Ptitle title={'Theater'} content={showTime.stallName} />
                            <Ptitle title={'Cinema Hall'} content={showTime.cinemaHallId} />
                            <div><span style={{ fontWeight: '700' }}>Seat: </span>
                                {seatsBooking.map((seat, index) => (
                                    <span key={index}>{index > 0 && ','} {seat.name}</span>
                                ))}
                                {seatsBooking.length == 0 && <span>You can select up to 4 seats only!</span>}
                            </div>
                        </div>
                        {seatsBooking.length != 0 && <div className={styles.btnContainer}><Button name={'Book'} onClick={handleBookClick} /></div>}
                    </div>
                </div>
                <div className={styles.bookSeat}>
                    <div className={styles.screenContainer}>
                        <div className={styles.curve}></div>
                        <h2>Screen</h2>
                    </div>
                    <div className={styles.seats}>
                        {seats.map((seat, index) => (
                            <div key={index} className={styles.seat} onClick={() => handleBook(seat)} style={(seat.status == 2) ? { backgroundColor: 'orange' } : seat.status == 1 ? { backgroundColor: 'red', cursor: 'default' } : { backgroundColor: '#51a997' }}>{seat.name}</div>
                        ))}
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Payment Modal"
                className={styles.modal}
                overlayClassName={styles.overlay}
            >
                <h2>Payment</h2>
                <Ptitle title={'Total price'} content={seatsBooking.length*showTime.price}/>
                <Input label={'Name'} type={'text'} name={'name'} value={formData.name} onChange={handleChange} />
                <Input label={'Phone'} type={'numeric'} name={'phone'} value={formData.phone} onChange={handleChange} />
                <Input label={'Email'} type={'email'} name={'email'} value={formData.email} onChange={handleChange} />
                <Input label={'Credit'} type={'numeric'} name={'credit'} value={formData.credit} onChange={handleChange} />
                <div className={styles.btnContainer}>
                    <Button name={'Close'} onClick={closeModal} color='red' />
                    <Button name={'Submit'} onClick={() => handlePayment()} />
                </div>
            </Modal>
        </div>
    );
}
