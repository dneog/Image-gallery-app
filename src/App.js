import 'react-toastify/dist/ReactToastify.css';
import { Flip, ToastContainer } from 'react-toastify';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './config/Firebase';
import {  NavLink, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER, selectUserID } from './redux/slice/AuthSlice';
import Register from './pages/auth/Register';
import SearchResult from './pages/SearchResult';
import SharePage from './pages/SharePage';
import Favourates from './pages/Favourates';
import Downloads from './pages/Downloads';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {

  const dispatch= useDispatch()
  const navigate= useNavigate()
  const userID= useSelector(selectUserID)

  useEffect(()=> {   
    onAuthStateChanged(auth,  (user) => {

      if (user) {
        
        const uniqueID= user.uid
        dispatch(SET_ACTIVE_USER(
          {
            email: user.email,
            userID: user.uid,
            profilePic: user.userProfilePic,
            sessionID: uniqueID,             
          }
       ))

      }else{
        dispatch(REMOVE_ACTIVE_USER())
      }
    });
  },[dispatch])


  return (
    <div className="App">
    <ToastContainer transition={Flip}/>
     <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/favourates' element={<Favourates />} />
      <Route path='/register' element={<Register />} />
      <Route path='/downloads' element={<Downloads />} />
      <Route path='/search' element={<SearchResult />} />
      <Route path='/*' element={<NotFound />} />
      <Route path='/image/:id' element={<SharePage />} />
     </Routes>
    </div>
  );
}

export default App;
