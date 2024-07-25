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
    const [movies,setMovies] = useState([])
    const [newMovie, setNewMovie] = useState({ title: '', duration: '', imageId: '' }); // New movie state
    const [editMovie, setEditMovie] = useState(null); 
    const [showAddMovieModal, setShowAddMovieModal] = useState(false); // New state for Add Movie modal
    const [showEditMovieModal, setShowEditMovieModal] = useState(false);
    const [newImage,setNewImage] = useState(null)
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

    const fetchShowTimes = async (date) => {
        try {
            const stallId = id; // Thay đổi stallId theo nhu cầu của bạn
            const data = await showTimeService.getMoviesAndShowTimesByDateAndStall(date, stallId);
            setShowTimes(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchStall = async () => {
        try {
            const data = await stallService.getStall(id);
            setStallUpdate(data);
            console.log(data);
            var descriptionArray = data.description.split('//');
            data.descriptionUpdate = data.description;
            data.description = descriptionArray;
            setStall(data);
            if (data.stallTypeId==3) {
                const movieData = await moviesService.getMoviesByStallId(data.stallId);
                console.log(movieData.data);
                setMovies(movieData.data)
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        fetchShowTimes(selectedDate);
        fetchStall();
    }, [selectedDate, id]);

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

    const handleDeleteStall = async () => {
        const res = await stallService.deleteStall(id);
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
            newMovie.imageId=uploadedImage.id;
            newMovie.stallId=id;
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

        await moviesService.updateMovie(movie.movieId,{...movie,isDelete:true})
    }
    if (!stall || stall && stall.stallTypeId==3 && movies.length==0) return null;

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
            {stall.stallTypeId != 3 && <h3>Product</h3>}
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
            
            { movies.map((movie) => (
                <div className={styles.movie}>
                    <div className={styles.posterCover}><div className={styles.poster} style={{ backgroundImage: `url(http://localhost:5209/api/Galleries/download/${movie.imageId})` }}></div></div>
                    <div className={styles.infor}>
                        <h3>{movie.title}</h3>
                        <Ptitle title={'Duration'} content={movie.duration + ' minutes'}/>
                        <div className={styles.btnContainer} style={{float:'left'}}>
                            <Button name={'Delete'} onClick={() => handleDeleteMovie(movie)} color='red' />
                            <Button name="Edit" onClick={() => handleOpenEditMovieModal(movie)} />
                        </div>
                    </div>
                </div>
            ))}

            </div>
             
            <div className={styles.schedule}>
                {showTimes.map((time) => (
                    <div className={styles.scheduleItem} key={time.movieId}>
                        <h3>{time.movieName}</h3>
                        <p>Showtimes:</p>
                        {time.showTimes.map((showTime) => (
                            <p key={showTime.id}>{formatTime(showTime.time)}</p>
                        ))}
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
                    onChange={(e) => setNewMovie({...newMovie, description: e.target.value})}
                    isTextArea={true}
                />
                <Input label={'Image'} type='file' name={'file'}  onChange={(e) => setNewImage(e.target.files)}/>

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
                            onChange={(e) => setEditMovie({...editMovie, description: e.target.value})}
                            isTextArea={true}
                       />
                        <div className={styles.btnContainer}>
                             <Button name="Update" onClick={handleUpdateMovie} />
                        <Button name="Cancel" color='gray' onClick={handleCloseEditMovieModal} />
                
                        </div>
                        </> 
                )}
            </Modal>
            
        </div>
    );
}
