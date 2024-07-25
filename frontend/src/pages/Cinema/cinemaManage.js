import styles from './cinemaManage.module.scss'
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import stallService from '../../services/stallsService';
import BrandItem from '../../components/brandItem/brandItem';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import Select2 from '../../components/select/select2';
import galleryService from '../../services/galleriesService';
// Đặt gốc cho Modal
Modal.setAppElement('#root');

export default function CinemaManage() {
    const [formData, setFormData] = useState({
        location: '',
        name: '',
        file: null,
        
    });
    const handleChange = (e) => {
        
        const { name, value } = e.target;
        if (name=='file') {
            console.log( e.target.files[0])
            setFormData((prevData) => ({
                ...prevData,
                [name]:  e.target.files
            }));
           return;
        }
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const [stalls, setStalls] = useState([]);
    const [stallsBackup, setStallsBackup] = useState([]);
    const [tabChoose, setTab] = useState(0);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);

    const tabs = [
        { id: 0, name: 'All' },
        { id: 1, name: 'Floor 1' },
        { id: 2, name: 'Floor 2' },
        { id: 3, name: 'Floor 3' },
        { id: 4, name: 'Floor 4' },
    ];

    useEffect(() => {
        const fetchStalls = async () => {
            try {
                let data = await stallService.getStalls();
                data = data.filter((item) => item.stallTypeId == 3);
                setStalls(data);
                setStallsBackup(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchStalls();
    }, []);

    const handleFilter = (id) => {
        let temp;
        if (id == 0) temp = stallsBackup;
        else temp = stallsBackup.filter((item) => item.location == id);
        setTab(id);
        setStalls(temp);
    };

    const handleModalSubmit = async () => {
        if (formData.file) {
            try {
                // Tải lên ảnh
                const uploadedImage = await galleryService.uploadImage(formData.file[0]);
                // stallService.createStall()
            }
            catch (err) {
                console.error(err)
            }
        }
    }
    

    return (
        <div className='main'>
            <div className={styles.header}>
                <h1>Cinema</h1>
                <div className={styles.btnContainer}>
                    <Button name={'New'} color='green' onClick={() => setShowModal(true)} />
                </div>
            </div>
            <div className={styles.filter}>
                {tabs.map((tab) => (
                    <div
                        className={styles.filterOption}
                        style={tab.id == tabs.length - 1 ? { border: 'none' } : {}}
                        key={tab.id}
                    >
                        <span
                            onClick={() => handleFilter(tab.id)}
                            style={tab.id == tabChoose ? { fontWeight: '600', color: '#3C6C7C' } : {}}
                        >
                            {tab.name}
                        </span>
                    </div>
                ))}
            </div>
            <div className={styles.brandlist}>
                {stalls.map((stall) => (
                    <BrandItem
                        name={stall.name}
                        location={stall.location}
                        key={stall.stallId}
                        stallId={stall.stallId}
                        imageId={stall.imageId}
                    />
                ))}
            </div>
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="New Cinema"
                className={styles.modalContent}
                overlayClassName={styles.modal}
            >
                <h2>New Cinema</h2>
                
                <Input label={'Name'} type={'text'} name={'name'} value={formData.name} onChange={handleChange} />
                <Input label={'Image'} type='file' name={'file'}  onChange={handleChange}/>
                    <div className={styles.btnContainer}>
                        
                        <Button name={'Cancel'} onClick={() => setShowModal(false)} color='red'/>
                        <Button name={'Submit'} onClick={() => handleModalSubmit()}/>
                    </div>
               
            </Modal>
        </div>
    );
}
