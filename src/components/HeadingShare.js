import React, { useEffect, useState } from 'react';
import styles from './Heading.module.css';
import user from '../assets/user.png';
import {toast} from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {onAuthStateChanged, signOut } from "firebase/auth";
import {auth, db} from '../config/Firebase';
import {  NavLink, useNavigate } from 'react-router-dom';
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER, selectEmail, selectProfilePic, selectUserID } from '../redux/slice/AuthSlice';
import { MdOutlineLogout } from "react-icons/md";
import { MdOutlineBookmarks } from "react-icons/md";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import ShowHide from './ShowHide';
import ShowOnLogout from './ShowOnLogout';

const HeadingShare = () => {
  const userID= useSelector(selectUserID)
  const profilePics= useSelector(selectProfilePic)
  const [show, setShow]= useState(false)
  
  const dispatch= useDispatch()
  const navigate= useNavigate()
  
  const handleClick=()=> {
    setShow(!show)
  }
  const handleRoute=()=> {
    navigate('/')
  }

 const logout=()=> {
  signOut(auth).then(() => {
   toast.success('LogOut Successful');
   navigate('/login')
   setShow(!show)
  }).catch((error) => {
    toast.error(error)
  });
}

  return (
    <div className={styles.mains}>
    <div className={styles.flShare}>

    <NavLink to={'/'}>
    <p className={styles.logo}>HomePage</p>
    </NavLink>
     

     <ShowOnLogout>
      <ul className={styles.ul}>
        <NavLink to={'/login'}>
        <li className={styles.li}>Login</li>
        </NavLink>
        
        <NavLink to={'/register'}>
        <li className={styles.account}>Create Account</li>
        </NavLink>   
      </ul>
     </ShowOnLogout>
       
     <ShowHide> 
      {profilePics ? (!userID || profilePics == '' ? <img className={styles.user} src={user} alt="" onClick={handleClick} /> : <img className={styles.user} src={profilePics} alt="" onClick={handleClick} />) : ( <img className={styles.user} src={user} alt="" onClick={handleClick} />) }  
      </ShowHide>     
  
    </div>

    {show && <div className={styles.profile}>
      <ul className={styles.boxul}>

      <NavLink to={'/profile'}>
         <ShowHide>
            <li className={styles.navLi} onClick={handleClick}>
            <span className={styles.sun}>
            <FaRegUser className={styles.pp2}/>
            <p>Profile</p>
            </span>
            </li>
        </ShowHide>
      </NavLink>

      <NavLink to={'/downloads'}>
         <ShowHide>
            <li className={styles.navLi} onClick={handleClick}>
            <span className={styles.sun}>
            <PiDownloadSimpleBold className={styles.pp1}/>
            <p>Downloads</p>
            </span>
            </li>
        </ShowHide>
      </NavLink>

      <NavLink to={'/favourates'}>
         <ShowHide>
            <li className={styles.navLi} onClick={handleClick}>
            <span className={styles.sun}>
            <MdOutlineBookmarks className={styles.pp1}/>
            <p>Favourates</p>
            </span>
            </li>
        </ShowHide>
      </NavLink>
       
      <ShowHide>   
        <li className={styles.navLi} onClick={logout}>
        <span className={styles.sun}>
            <MdOutlineLogout className={styles.pp1} />
            <p>Logout</p>
          </span>
        </li>
      </ShowHide>
     
      </ul>
    </div>}
    
    </div>
  )
}

export default HeadingShare