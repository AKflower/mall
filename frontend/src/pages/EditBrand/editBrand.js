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
            var descriptionArray = data.description.split('//');
            data.descriptionUpdate = data.description;
            data.description = descriptionArray;
            setStall(data);
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

    const handleUpdate = async () => {
        try {
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

    if (!stall) return null;

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
                <div className={styles.header}><h3>Movies</h3><span className={styles.btnAdd}><AddIcon /></span></div>
            }
            {stall.stallTypeId == 3 &&
                <div>Test</div>
                }
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
        </div>
    );
}
