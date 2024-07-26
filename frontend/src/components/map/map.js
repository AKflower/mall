import styles from './map.module.scss'
import {useState} from 'react'

export default function MapMall () {
    const [floors, setFloors] = useState([
        { id: 1, name: 'Floor 1' },
        { id: 2, name: 'Floor 2' },
        { id: 3, name: 'Floor 3' },
        // { id: 4, name: 'Floor 4' }
    ]);
    const [floorPick,setFloorPick] = useState(1)
    return (
        <div className={styles.container}>
            <div className={styles.tabHeader}>
                {floors.map((floor) => (
                    <div className={floor.id==floorPick ? styles.tabActive :  styles.tab } onClick={()=> setFloorPick(floor.id)} >
                        {floor.name}
                    </div>
                ))}
            </div>
            <div className={styles.mapContainer}>
                <div className={floorPick ==1? styles.map1 : floorPick ==2 ? styles.map2 :  floorPick == 3 ?  styles.map3 : '' } style={{width:'60%',height:'50em',backgroundSize:'cover',borderRadius:'10px'}}>
                </div>
            </div>
        </div>
       
        
    )
}