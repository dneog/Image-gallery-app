import { UseSelector, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/slice/AuthSlice';

 const ShowHide = ({children}) => {

    const isLoggedIn= useSelector(selectIsLoggedIn)
    console.log(isLoggedIn)
    
    if(isLoggedIn){
        return children
    }else{
        return null
    }
  
}

export default ShowHide
