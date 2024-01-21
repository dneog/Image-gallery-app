import { UseSelector, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/slice/AuthSlice';

const ShowOnLogout = ({children}) => {
    const isLoggedIn= useSelector(selectIsLoggedIn)
    if(!isLoggedIn){
        return children
    }else{
        return null
    }
  
}
export default ShowOnLogout
