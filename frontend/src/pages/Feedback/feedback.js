import styles from './feedback.module.scss'
import feedbackService from '../../services/feedbackService'

import StarIcon from '@mui/icons-material/Star';
import { useEffect, useState } from 'react'

export default function Feedback () {
    const [feedbacks,setFeedbacks] = useState([]);
    useEffect(() => {
        const fetchFeedback = async () => {
            const data = await feedbackService.getFeedBacks();
            setFeedbacks(data);

        }
        fetchFeedback();
    },[])
    return (
        <div className='main'>
        <h1>Feedback</h1>
        <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
        {feedbacks.map((feedback) => (
            <div className={styles.feedbackContainer}>
                <p style={{display:'flex',alignItems:'center'}}>{feedback.rating} <span style={{color:'#e0e03e'}}><StarIcon /></span></p>
                <h3>{feedback.content? feedback.content : 'No content'}</h3>
            </div>
        ))}
        </div>
    </div>
    )
}