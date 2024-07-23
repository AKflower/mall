import styles from './brand.module.scss'
import Navbar from '../../components/navbar/navbar'
import BrandItem from '../../components/brandItem/brandItem'
import {useState, useEffect} from 'react'
import stallService from '../../services/stallsService'

export default function Brand () {
    const [stalls, setStalls] = useState([]);
    const [stallsBackup, setStallsBackup] = useState([]);
    const [tabChoose,setTab] = useState(0);
    const [error, setError] = useState('');

    const tabs = [
        {
            id: 0,
            name: 'All'
        },
        {
            id: 1,
            name: 'Floor 1'
        },
        {
            id: 2,
            name: 'Floor 2'
        },
        {
            id: 3,
            name: 'Floor 3'
        },
        {
            id: 4,
            name: 'Floor 4'
        },
    ]
    useEffect(() => {
        const fetchStalls = async () => {
            try {
                const data = await stallService.getStalls();
                setStalls(data);
                setStallsBackup(data)
            } catch (err) {
                setError(err.message);
            }
        };

        fetchStalls();
    }, []);
    const handleFilter = (id) =>  {
    
        var temp;
        if  (id ==0) temp = stallsBackup;
        else temp = stallsBackup.filter((item) => item.location == id);
        console.log(temp);
        setTab(id)
        setStalls(temp)
    }
    return (
        <div className={styles.container}>
        <Navbar />
        <h1 className={styles.title}>Brands</h1>
        <div className={styles.filter}>
            {tabs.map((tab) => (
                <div className={styles.filterOption} style={tab.id==tabs.length-1 ? {border:'none'}: {}} key={tab.id}><span onClick={() => handleFilter(tab.id)} style={tab.id == tabChoose ? {fontWeight:'600',color:'#3C6C7C'} : {}}>{tab.name}</span></div>
            ))}
            
           
        </div>
        <div className={styles.brandlist}>
        {stalls.map((stall) => (
            <BrandItem name={stall.name} location={stall.location} key={stall.stallId} stallId={stall.stallId} imageId={stall.imageId}/>
        ))}
           
           
        </div>
        </div>
    )
}