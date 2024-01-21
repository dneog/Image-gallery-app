import React from 'react'
import styles from './Profile.module.css';
import HeadingShare from '../components/HeadingShare';
import {useSelector} from 'react-redux';
import { selectEmail, selectIsLoggedIn } from '../redux/slice/AuthSlice';
import {  useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/Firebase';
import {toast} from 'react-toastify';

const Profile = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const email = useSelector(selectEmail);
    const navigate = useNavigate()

    const logoutUser=()=> {
        signOut(auth).then(() => {
         toast.success('LogOut Successful');
         navigate('/login')
        }).catch((error) => {
          toast.error(error)
        });
      }

  return (
    <div className={styles.ProfilePage}>
        <HeadingShare />

        {isLoggedIn && <div className={styles.pEmail}>
        <p className={styles.emailP}>Email</p>
        <p className={styles.emailAddress}>{email}</p>
        <button className={styles.logData} onClick={()=> logoutUser()}>Logout</button>
        </div>}
    </div>
  )
}

export default Profile