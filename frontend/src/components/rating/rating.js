import { useState } from 'react';

import StarIcon from '@mui/icons-material/Star';
import styles from './rating.module.scss';
import Input from '../../components/input/input';
import Button from '../../components/button/button'

import {useNavigate} from 'react-router-dom'



const RatingComponent = ({data,onChange}) => {

const navigate = useNavigate()
const starsData = [
    {
        id:1,
        isTick: false,
    },
    {
        id:2,
        isTick: false,
    },
    {
        id:3,
        isTick: false,
    },
    {
        id:4,
        isTick: false,
    },
    {
        id:5,
        isTick: false,
    }
    
]
    const [stars, setStars] = useState(starsData);
    

  

  
  const handleRatingHover = (id) => {
   
    
    const updatedStars = stars.map((star, index) => ({
        ...star,
        isTick: index < id,
      }));
      setStars(updatedStars);
      var starPoint = updatedStars.filter(star=> star.isTick).length;
      onChange(starPoint)
    
  }
  const handleSkip = () => {
    navigate('/home');
  }
  return (
    <div>

     {/* <ReactStars
        count={5}
        onChange={ratingChanged}
        size={24}
        activeColor="#ffd700"
  /> */}
    <div className={styles.starComponent}>
    {stars.map((star) => (
        <span key={`star${star.id}`} onMouseEnter={() => handleRatingHover(star.id)} style={{ color: star.isTick ? 'yellow' : 'silver', fontSize: '3em',cursor:'pointer' }} ><StarIcon fontSize='inherit'/></span>
    ))}
    </div>
   
     
    </div>
  );
};

export default RatingComponent;
