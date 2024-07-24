import styles from './booking.module.scss'
import showTimeService from '../../services/showTimeService';
import { useState,useEffect } from 'react';
import Navbar from '../../components/navbar/navbar';

export default function Booking () {
    const [showTime, setShowTime] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchShowTime = async () => {
            try {
                const data = await showTimeService.getShowTime(1);
                setShowTime(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchShowTime();
    },[]);
    return (

        <div className={styles.container}>
            <Navbar />
        </div>
    )
}