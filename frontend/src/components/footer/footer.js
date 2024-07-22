import styles from './footer.module.scss'
import Input from '../../components/input/input'
import RatingComponent from '../rating/rating'
import Button2 from '../button/button2'
import React, { useEffect, useState } from 'react';
import feedbackService from '../../services/feedbackService';

export default function Footer() {
    const [feedback, setFeedback] = useState('');
   
    const [stars, setStars] = useState(0);
    const handleFeedbackChange = (e) => {
        console.log(e.target.value);
        setFeedback(e.target.value);
    }
    const handleSubmit = () => {
        console.log(stars,feedback);
        feedbackService.postFeedBack({Content: feedback,Rating:stars})
    }
    return (
        <div className={styles.container}>
            <div className={styles.overlay}>
         
            </div>
            <div className={styles.footerContainer}>
                <h1>
                
                    ABCD MAll
                </h1>
                <RatingComponent onChange={setStars}/>
                <Input label={'Leave your feedback'} isTextArea={true} onChange={(e) =>handleFeedbackChange(e)} value={feedback}/>
                <div className={styles.btnContainer}><Button2 name={'Gửi'} onClick={handleSubmit}/></div>
            </div>
            
        </div>
    )
}