import React, { useEffect, useState } from 'react';
import styles from './editBrand.module.scss';
import Navbar from '../../components/navbar/navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import stallService from '../../services/stallsService';
import PhoneIcon from '@mui/icons-material/Phone';
import showTimeService from '../../services/showTimeService';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Modal from 'react-modal';
import productService from '../../services/productService';
import AddIcon from '@mui/icons-material/Add';
import moviesService from '../../services/moviesService';
import Ptitle from '../../components/ptitle/ptitle';
import galleryService from '../../services/galleriesService';
import cinemaHallsService from '../../services/cinemaHallService';
import showTimesService from '../../services/showTimeService';
import TimePicker from 'react-time-picker';
import Select2 from '../../components/select/select2';

Modal.setAppElement('#root'); // Thiết lập phần tử gốc cho modal

export default function EditBrand() {
    const navigate = useNavigate();
    const [stall, setStall] = useState(null);
    const [stallUpDate, setStallUpdate] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [showModal, setShowModal] = useState(false);
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productUpdate, setProductUpdate] = useState({});
    const [movies, setMovies] = useState([])
    const [newMovie, setNewMovie] = useState({ title: '', duration: '', imageId: '' }); // New movie state
    const [editMovie, setEditMovie] = useState(null);
    const [showAddMovieModal, setShowAddMovieModal] = useState(false); // New state for Add Movie modal
    const [showEditMovieModal, setShowEditMovieModal] = useState(false);
    const [showCreateShowTimeModal, setShowCreateShowTimeModal] = useState(false);
    const [newImage, setNewImage] = useState(null)
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        description: ''
    });
    const [newImageProduct, setNewImageProduct] = useState(null);
    const [cinemaHalls, setCinemaHalls] = useState([])
    const [cinemaHallPick, setCinemaHallPick] = useState(null)
    const [showTimeDisabled, setShowTimeDisabled] = useState(null);
    const [bookedSlots, setBookedSlots] = useState([]);
    const [movieShowTime, setMovieShowTime] = useState(null)
    const [bookedTimes, setBookedTimes] = useState([])

    const [hour, setHour] = useState(8)
    const [minute, setMinute] = useState(0);
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // getMonth() trả về tháng từ 0 đến 11
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const [date, setDate] = useState(formattedDate);
    const useQuery = () => {
        return new URLSearchParams(location.search);
    };
    const minutes = [
        { id: 0, name: "00" },
        { id: 1, name: "01" },
        { id: 2, name: "02" },
        { id: 3, name: "03" },
        { id: 4, name: "04" },
        { id: 5, name: "05" },
        { id: 6, name: "06" },
        { id: 7, name: "07" },
        { id: 8, name: "08" },
        { id: 9, name: "09" },
        { id: 10, name: "10" },
        { id: 11, name: "11" },
        { id: 12, name: "12" },
        { id: 13, name: "13" },
        { id: 14, name: "14" },
        { id: 15, name: "15" },
        { id: 16, name: "16" },
        { id: 17, name: "17" },
        { id: 18, name: "18" },
        { id: 19, name: "19" },
        { id: 20, name: "20" },
        { id: 21, name: "21" },
        { id: 22, name: "22" },
        { id: 23, name: "23" },
        { id: 24, name: "24" },
        { id: 25, name: "25" },
        { id: 26, name: "26" },
        { id: 27, name: "27" },
        { id: 28, name: "28" },
        { id: 29, name: "29" },
        { id: 30, name: "30" },
        { id: 31, name: "31" },
        { id: 32, name: "32" },
        { id: 33, name: "33" },
        { id: 34, name: "34" },
        { id: 35, name: "35" },
        { id: 36, name: "36" },
        { id: 37, name: "37" },
        { id: 38, name: "38" },
        { id: 39, name: "39" },
        { id: 40, name: "40" },
        { id: 41, name: "41" },
        { id: 42, name: "42" },
        { id: 43, name: "43" },
        { id: 44, name: "44" },
        { id: 45, name: "45" },
        { id: 46, name: "46" },
        { id: 47, name: "47" },
        { id: 48, name: "48" },
        { id: 49, name: "49" },
        { id: 50, name: "50" },
        { id: 51, name: "51" },
        { id: 52, name: "52" },
        { id: 53, name: "53" },
        { id: 54, name: "54" },
        { id: 55, name: "55" },
        { id: 56, name: "56" },
        { id: 57, name: "57" },
        { id: 58, name: "58" },
        { id: 59, name: "59" }

    ];
    const hours = [
        { id: 8, name: '08' },
        { id: 9, name: '09' },
        { id: 10, name: '10' },
        { id: 11, name: '11' },
        { id: 12, name: '12' },
        { id: 13, name: '13' },
        { id: 14, name: '14' },
        { id: 15, name: '15' },
        { id: 16, name: '16' },
        { id: 17, name: '17' },
        {
            id: 18,
            name: '18'
        },
        { id: 19, name: '19' },
        { id: 20, name: '20' },
        { id: 21, name: '21' },
        { id: 22, name: '22' },
        { id: 23, name: '23' },
        {
            id: 24, name: '24'
        }
    ];
    const [hoursArr, setHoursArr] = useState(hours);
    const [minutesArr, setMinutesArr] = useState(minutes);

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

    const fetchShowTimes = async (date) => {
        try {
            const stallId = id; // Thay đổi stallId theo nhu cầu của bạn
            const data = await showTimeService.getMoviesAndShowTimesByDateAndStall(date, stallId);
            setShowTimes(data);
        } catch (err) {
            setError(err.message);
        }
    };
    const fetchCinemaHall = async () => {
        var data = await cinemaHallsService.getCinemaHallsByStallId(id);
        setCinemaHalls(data);
    }

    const fetchStall = async () => {
        try {
            const data = await stallService.getStall(id);
            setStallUpdate(data);
            console.log(data);
            var descriptionArray = data.description.split('//');
            data.descriptionUpdate = data.description;
            data.description = descriptionArray;
            setStall(data);
            if (data.stallTypeId == 3) {
                const movieData = await moviesService.getMoviesByStallId(data.stallId);
                console.log(movieData.data);
                setMovies(movieData.data)
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const compareShowTimesWithSched = async (date, movieId, stallId, cinemaHallId) => {
        try {
            const result = await showTimesService.compareShowTimesWithSched(date, movieId, stallId, cinemaHallId);
            var minutes = minutesArr;
            setBookedTimes(result);
            console.log(result);
        } catch (error) {
            console.error(error.message);
        }
    };
    useEffect(() => {
        fetchShowTimes(selectedDate);
        fetchStall();
        fetchCinemaHall();


    }, [selectedDate, id]);

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


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

    const handleDeleteStall = async () => {
        const res = await stallService.deleteStall(id);
        navigate('/admin/shop')
    };

    const handleDeleteProduct = async (productId) => {
        const res = await productService.deleteProduct(productId);
        fetchStall(); // Refresh stall data after deleting a product
    };

    const handleEditClick = () => {
        setShowModal(true);
    };
    const handleOpenAddMovieModal = () => {
        setNewMovie({ title: '', duration: '', imageId: '' });
        setShowAddMovieModal(true);
    };

    const handleOpenEditMovieModal = (movie) => {
        setEditMovie(movie);
        setShowEditMovieModal(true);
    };

    const handleEditProductClick = (product) => {
        setSelectedProduct(product);
        setProductUpdate(product);
        setShowProductModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCloseProductModal = () => {
        setShowProductModal(false);
    };
    const handleCloseAddMovieModal = () => {
        setShowAddMovieModal(false);
    };

    const handleCloseEditMovieModal = () => {
        setShowEditMovieModal(false);
    };
    const handleCreateShowTimeModal = (movie) => {


        setMovieShowTime(movie);
        setShowCreateShowTimeModal(true);
    };

    const handleCloseCreateShowTimeModal = () => {
        setShowCreateShowTimeModal(false);
    };

    // const handleCheckTime = async () => {

    // }
    const handleUpdate = async () => {
        try {
            console.log(stallUpDate);
            stallUpDate.description = stallUpDate.descriptionUpdate;
            const res = await stallService.updateStall(id, stallUpDate);
            fetchStall();
            handleCloseModal();
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateProduct = async () => {
        try {
            const res = await productService.updateProduct(selectedProduct.productId, productUpdate);
            fetchStall();
            handleCloseProductModal();
        } catch (err) {
            console.error(err);
        }
    };
    const handleAddMovie = async () => {
        try {
            const uploadedImage = await galleryService.uploadImage(newImage[0]);
            newMovie.imageId = uploadedImage.id;
            newMovie.stallId = id;
            await moviesService.createMovie(newMovie);
            fetchStall();
            handleCloseAddMovieModal();
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateMovie = async () => {
        try {
            await moviesService.updateMovie(editMovie.movieId, editMovie);
            fetchStall();
            handleCloseEditMovieModal();
        } catch (err) {
            console.error(err);
        }
    };
    const handleDeleteMovie = async (movie) => {

        await moviesService.updateMovie(movie.movieId, { ...movie, isDelete: true })
    }
    const [selectedTime, setSelectedTime] = useState(null);
    const slots = [
        { startTime: '08:00', endTime: '09:30' },
        { startTime: '10:00', endTime: '11:30' },
        // ...
    ];

    // Kiểm tra xem thời gian có nằm trong các khoảng đã đặt không
    const isTimeDisabled = ({ hour, minute }) => {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

        // Đổi `15` phút thành mili giây
        const fifteenMinutes = 15 * 60 * 1000;

        return bookedSlots.some(slot => {
            const start = new Date(`1970-01-01T${slot.startTime}:00Z`).getTime();
            const end = new Date(`1970-01-01T${slot.endTime}:00Z`).getTime();
            const selectedTime = new Date(`1970-01-01T${time}:00Z`).getTime();

            // Kiểm tra nếu thời gian được chọn nằm trong khoảng thời gian đã đặt
            const isWithinExistingSlot = selectedTime >= start && selectedTime <= end;

            // Kiểm tra thời gian chênh lệch
            const isTooClose = bookedSlots.some(existingSlot => {
                const existingStart = new Date(`1970-01-01T${existingSlot.startTime}:00Z`).getTime();
                const existingEnd = new Date(`1970-01-01T${existingSlot.endTime}:00Z`).getTime();

                return Math.abs(existingEnd - selectedTime) < fifteenMinutes || Math.abs(selectedTime - existingStart) < fifteenMinutes;
            });

            return isWithinExistingSlot || isTooClose;
        });
    };
    function convertDateFormat(dateString) {
        return dateString.replace(/\//g, '-');
    }
    const handleCreateShowTime = async () => {
        var minuteName = minutes.find((item) => item.id == minute).name;
        var hourName = hours.find((item) => item.id == hour).name;
        var showTime = {
            movieId: movieShowTime.movieId,
            cinemaHallId: cinemaHallPick,
            startTime: convertDateFormat(date) + 'T' + hourName + ':' + minuteName + ':00Z',
            price: 50000,
        }
        console.log(cinemaHallPick);
        await showTimeService.createShowTime(showTime)
        setCinemaHallPick(null)
        setDate(formattedDate)
        setHour(8)
        setMinute(0)
        handleCloseCreateShowTimeModal()

        // showTimeService.createShowTime()
    }
    const handleOpenAddProductModal = () => {
        setShowAddProductModal(true);
    };

    const handleCloseAddProductModal = () => {
        setShowAddProductModal(false);
        setNewProduct({
            name: '',
            price: '',
            description: ''
        });
        setNewImageProduct(null);
    };

    const handleAddProduct = async () => {
        const uploadedImage = await galleryService.uploadImage(newImageProduct[0]);
        var productData = newProduct;
        productData.imageId=uploadedImage.id;
        productData.stallId = id;
        await productService.createProduct(productData)
        fetchStall();
        // Implement the logic to add the product here
     
        // After adding the product, close the modal
        
        handleCloseAddProductModal();
    };
    if (!stall || stall && stall.stallTypeId == 3 && movies.length == 0) return null;

    return (
        <div className={'main ' + styles.container}>
            <h1 className={styles.title}>Edit Brand</h1>
            <h2>{stall.name} </h2>
            <div className={styles.contact}><PhoneIcon /> {stall.contactInfo}</div>
            <div className={styles.content}>
                <div className={styles.description}>
                    {stall.description.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                </div>
                <div className={styles.imgCover}>
                    <img src={`http://localhost:5209/api/Galleries/download/${stall.imageId}`} width={'70%'} />
                </div>
            </div>
            <div className={styles.btnContainer} style={{ padding: '0 2em 0 0' }}>
                <Button name={'Delete'} color='red' onClick={() => handleDeleteStall()} />
                <Button name={'Edit'} onClick={handleEditClick} />
            </div>
            {stall.stallTypeId != 3 && <div className={styles.header}><h3>Product</h3><span className={styles.btnAdd} onClick={handleOpenAddProductModal}><AddIcon /></span></div>}
            {stall.stallTypeId != 3 && <div className={styles.products}>
                {stall.products.map((product) => (
                    <div className={styles.product} key={product.productId}>
                        <div className={styles.imgCover} style={{ backgroundImage: `url(http://localhost:5209/api/Galleries/download/${product.imageId})` }}></div>
                        <div className={styles.content}>
                            <h5>{product.name}</h5>
                            <div className={styles.btnContainer} style={{ padding: '0 1em 0 0' }}>
                                <Button name={'Delete'} color='red' onClick={() => handleDeleteProduct(product.productId)} />
                                <Button name="Edit" onClick={() => handleEditProductClick(product)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>}
            {stall.stallTypeId == 3 &&
                <div className={styles.header}><h3>Movies</h3><span className={styles.btnAdd} onClick={handleOpenAddMovieModal}><AddIcon /></span></div>
            }
            <div className={styles.movieContainer}>

                {movies.map((movie) => (
                    <div className={styles.movie}>
                        <div className={styles.posterCover}>
                            <div className={styles.poster} style={{ backgroundImage: `url(http://localhost:5209/api/Galleries/download/${movie.imageId})` }}></div>
                            <div className={styles.createShowTime}> <Button name="Create showtime" color='#ff6710' onClick={() => handleCreateShowTimeModal(movie)} /></div>
                        </div>
                        <div className={styles.infor}>
                            <h3>{movie.title}</h3>
                            <Ptitle title={'Duration'} content={movie.duration + ' minutes'} />
                            <div className={styles.btnContainer} style={{ float: 'left' }}>
                                <Button name={'Delete'} onClick={() => handleDeleteMovie(movie)} color='red' />
                                <Button name="Edit" onClick={() => handleOpenEditMovieModal(movie)} />

                            </div>

                        </div>

                    </div>
                ))}

            </div>


            {/* Modal for editing stall */}
            <Modal
                isOpen={showModal}
                onRequestClose={handleCloseModal}
                contentLabel="Edit Stall Modal"
                className={styles.modal}
                overlayClassName={styles.overlay}
            >
                <h2>Edit Stall</h2>
                <Input label="Name" value={stallUpDate.name} onChange={(e) => setStallUpdate({ ...stallUpDate, name: e.target.value })} />
                <Input label="Contact Info" value={stallUpDate.contactInfo} onChange={(e) => setStallUpdate({ ...stallUpDate, contactInfo: e.target.value })} />
                <Input label="Description" value={stallUpDate.descriptionUpdate} onChange={(e) => setStallUpdate({ ...stallUpDate, descriptionUpdate: e.target.value })} isTextArea />
                <div className={styles.btnContainer}>
                    <Button name={'Cancel'} onClick={handleCloseModal} color='red' />
                    <Button name="Save" onClick={handleUpdate} />
                </div>
            </Modal>
            {/* Modal for editing product */}
            <Modal
                isOpen={showProductModal}
                onRequestClose={handleCloseProductModal}
                contentLabel="Edit Product Modal"
                className={styles.modal}
                overlayClassName={styles.overlay}
            >
                <h2>Edit Product</h2>
                <Input label="Name" value={productUpdate.name} onChange={(e) => setProductUpdate({ ...productUpdate, name: e.target.value })} />
                <Input label="Price" value={productUpdate.price} onChange={(e) => setProductUpdate({ ...productUpdate, price: e.target.value })} />
                <Input label="Description" value={productUpdate.description} onChange={(e) => setProductUpdate({ ...productUpdate, description: e.target.value })} isTextArea />
                <div className={styles.btnContainer}>
                    <Button name={'Cancel'} onClick={handleCloseProductModal} color='red' />
                    <Button name="Save" onClick={handleUpdateProduct} />
                </div>
            </Modal>
            {/* Add Movie Modal */}
            <Modal
                isOpen={showAddMovieModal}
                onRequestClose={handleCloseAddMovieModal}
                className={styles.modal}
                overlayClassName={styles.overlay}
            >
                <h2>Add New Movie</h2>
                <Input
                    label="Title"
                    value={newMovie.title}
                    onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                />
                <Input
                    label="Duration (minutes)"
                    value={newMovie.duration}
                    onChange={(e) => setNewMovie({ ...newMovie, duration: e.target.value })}
                />
                <Input
                    label={'Description'}
                    value={newMovie.description}
                    onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                    isTextArea={true}
                />
                <Input label={'Image'} type='file' name={'file'} onChange={(e) => setNewImage(e.target.files)} />

                <div className={styles.btnContainer}>
                    <Button name="Add Movie" onClick={handleAddMovie} />
                    <Button name="Cancel" color='gray' onClick={handleCloseAddMovieModal} />
                </div>

            </Modal>
            {/* Edit Movie Modal */}
            <Modal
                isOpen={showEditMovieModal}
                onRequestClose={handleCloseEditMovieModal}
                className={styles.modal}
                overlayClassName={styles.overlay}
            >
                <h2>Edit Movie</h2>
                {editMovie && (
                    <>
                        <Input
                            label="Title"
                            value={editMovie.title}
                            onChange={(e) => setEditMovie({ ...editMovie, title: e.target.value })}
                        />
                        <Input
                            label="Duration (minutes)"
                            value={editMovie.duration}
                            onChange={(e) => setEditMovie({ ...editMovie, duration: e.target.value })}
                        />
                        <Input
                            label={'Description'}
                            value={editMovie.description}
                            onChange={(e) => setEditMovie({ ...editMovie, description: e.target.value })}
                            isTextArea={true}
                        />
                        <div className={styles.btnContainer}>
                            <Button name="Update" onClick={handleUpdateMovie} />
                            <Button name="Cancel" color='gray' onClick={handleCloseEditMovieModal} />

                        </div>
                    </>
                )}
            </Modal>
            <Modal
                isOpen={showCreateShowTimeModal}
                onRequestClose={handleCloseCreateShowTimeModal}
                className={styles.modal}
                overlayClassName={styles.overlay}
            >
                <h2>Create Showtime</h2>
                {cinemaHalls && movieShowTime && (
                    <>

                        <div className={styles.film}>
                            <div style={{ backgroundImage: `url(http://localhost:5209/api/Galleries/download/${movieShowTime.imageId})`, width: '60%', height: '10em', backgroundSize: 'cover' }} ></div>
                            <div><h3>{movieShowTime.title}</h3>
                                <Ptitle title={'Duration'} content={movieShowTime.duration + ' minutes'} /></div>
                        </div>
                        <div className={styles.cinemaHallContainer}>
                            {cinemaHalls.map((cinemaHall) => (
                                <div className={styles.cinemaHall} onClick={() => {
                                    setCinemaHallPick(cinemaHall.cinemaHallId)
                                    compareShowTimesWithSched(date, movieShowTime.movieId, id, cinemaHall.cinemaHallId)
                                }} style={cinemaHallPick == cinemaHall.cinemaHallId ? { background: 'rgb(9, 84, 84)', color: 'white' } : {}}>{cinemaHall.name}</div>
                            ))}
                        </div>
                        <Input label={'Date'} type='date' value={date} onChange={(e) => {
                            setDate(e.target.value)
                            compareShowTimesWithSched(e.target.value, movieShowTime.movieId, id, cinemaHallPick)
                        }
                        } />
                        <div style={{ display: 'grid', gridTemplateColumns: ' repeat(2,1fr)', gap: '1em' }}>
                            <Select2 label={'Hour'} options={hours} value={hour} onChange={(e) => setHour(e.target.value)} />
                            <Select2 label={'Minute'} options={minutes} value={minute} onChange={(e) => setMinute(e.target.value)} />


                        </div>

                        <div className={styles.btnContainer}>
                            <Button name="Create" onClick={handleCreateShowTime} />
                            <Button name="Cancel" color='gray' onClick={handleCloseCreateShowTimeModal} />
                        </div>
                    </>
                )}
            </Modal>
            <Modal
                isOpen={showAddProductModal}
                onRequestClose={handleCloseAddProductModal}
                className={styles.modal}
                overlayClassName={styles.overlay}
            >
                <h2>Add New Product</h2>
                <Input
                    label="Product Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
                <Input
                    label="Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
                <Input
                    label="Description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    isTextArea={true}
                />
                <Input
                    label="Image"
                    type="file"
                    name="file"
                    onChange={(e) => setNewImageProduct(e.target.files)}
                />

                <div className={styles.btnContainer}>
                    <Button name="Add Product" onClick={handleAddProduct} />
                    <Button name="Cancel" color="gray" onClick={handleCloseAddProductModal} />
                </div>
            </Modal>
        </div>
    );
}
