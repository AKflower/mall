import styles from './foodStall.module.scss'
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import stallService from '../../services/stallsService';
import BrandItem from '../../components/brandItem/brandItem';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import Select2 from '../../components/select/select2';
import galleryService from '../../services/galleriesService';
import floorsService from '../../services/floorsService';
export default function FoodStall () {
    const [floors, setFloors] = useState([
        { id: 1, name: 'Floor 1' },
        { id: 2, name: 'Floor 2' },
        { id: 3, name: 'Floor 3' },
        { id: 4, name: 'Floor 4' }
    ]);
    const [parkings,setParkings] = useState([])
    
    const [formData, setFormData] = useState({
        floor:  1,
        parking: null,
        name: '',
        file: null,
        description: '',
        contactInfo: '',
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
        if (name=='floor') {
            fetchParking(value);
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
    const fetchParking = async (floorId) => {
        try {
            const data = await floorsService.getAvailableParkings(floorId);
            var newData = [];
            data.map((item) => {
                var temp = {
                    id: item,
                    name: item
                }
                newData.push(temp);
                
            })
            setFormData((prevData) => ({
                ...prevData,
                parking: newData[0].id
            }));
            setParkings(newData);
        } catch (err) {
            setError(err.message);
        }
    };
    useEffect(() => {
        const fetchStalls = async () => {
            try {
                let data = await stallService.getStalls();
                data = data.filter((item) => item.stallTypeId == 2);
                setStalls(data);
                setStallsBackup(data);
            } catch (err) {
                setError(err.message);
            }
        };
        

        fetchParking(1);

        fetchStalls();
    }, []);

    const handleFilter = (id) => {
        let temp;
        if (id == 0) temp = stallsBackup;
        else temp = stallsBackup.filter((item) => item.floorId == id);
        setTab(id);
        setStalls(temp);
    };

    const handleModalSubmit = async () => {
        if (formData.file) {
            try {
                // Tải lên ảnh
                const uploadedImage = await galleryService.uploadImage(formData.file[0]);
                
                var stall = {
                    Name: formData.name,
                    ImageId: uploadedImage.id,
                    Description: formData.description,
                    FloorId: parseInt(formData.floor),
                    Parking: formData.parking,
                    ContactInfo: formData.contactInfo,
                    StallTypeId: 2
                }
                const res = await stallService.createStall(stall);
            }
            catch (err) {
                console.error(err)
            }
        }
    }
    

    return (
        <div className='main'>
            <div className={styles.header}>
                <h1>Food Stall</h1>
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
                        parking={stall.parking}
                        key={stall.stallId}
                        stallId={stall.stallId}
                        imageId={stall.imageId}
                        isAdmin={true}
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
                <h2>New Food Stall</h2>
                
                <Input label={'Name'} type={'text'} name={'name'} value={formData.name} onChange={handleChange} />
                <Input label={'Image'} type='file' name={'file'}  onChange={handleChange}/>
                <Input label={'Contact'} type={'text'} name={'contactInfo'} value={formData.contactInfo} onChange={handleChange} />

                <Select2 label={'Floor'} value={formData.floor} options={floors} onChange={handleChange} name={'floor'}/>
                <Select2 label={'Parking'} value={formData.parking} options={parkings} onChange={handleChange} name={'parking'}/>
                <Input isTextArea={true} label={'Description'} value={formData.description} onChange={handleChange} name={'description'}/>
                    <div className={styles.btnContainer}>
                        
                        <Button name={'Cancel'} onClick={() => setShowModal(false)} color='red'/>
                        <Button name={'Submit'} onClick={() => handleModalSubmit()}/>
                    </div>
               
            </Modal>
        </div>
    )
}