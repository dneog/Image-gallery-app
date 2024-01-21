import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styles from './auth.module.css';
import { AiFillGoogleCircle } from "react-icons/ai";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth, db} from '../../config/Firebase';
import ButtonLoader from '../../components/ButtonLoader';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {useSelector} from'react-redux';
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const navigate= useNavigate()
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [confirmPassword, setConfirmPassword]= useState('');
  const [isLoading, setLoading]= useState(false);

  const redirectUser=()=> {
    navigate('/')
}

  const registerUser= async (e)=> {
    e.preventDefault();
    setLoading(true)
    if(!email){
      toast.error('Email required')
      setLoading(false)
    }else if(!password){
      toast.error('Password Required')
      setLoading(false)
    }else if(!confirmPassword){
      toast.error('Confirm Password Required')
      setLoading(false)
    }else if(password != confirmPassword){
      toast.error('Password is not Matching with Confirm Password')
      setLoading(false)
    }else if(password.length < 6){
      toast.error('Minimum 6 characters required in Password')
      setLoading(false)
    }else{
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const id= user.uid
       setLoading(false);
       navigate('/')
       toast.success('Account Created Successfully')  
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false)
      });
    }
  }

  const signInWithGoogle=()=> {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const Guser = result.user;
    // setName(Guser.displayName)
    // setUserID(Guser.uid)
    // setEmail(Guser.email)
    // storeGUserData(Guser.uid,Guser.displayName,Guser.email,Guser.photoURL)
    // <form onSubmit={registerUser}>
   toast.success('Account Created Successfully')
   redirectUser()
  }).catch((error) => {
    toast.error(error.message)
  });
  }
  return (
    <div className={styles.mainLogin}>

      <div className={styles.signup}>

          <p className={styles.loginText}>Sign Up</p>

          <form className={styles.form} onSubmit={registerUser}>

          <p className={styles.email}>Email</p>
          <input type="email" className={styles.emailInput} placeholder='Enter Email'  value={email} onChange={(e)=> setEmail(e.target.value)}/>

          <p className={styles.password}>Password</p>
          <input type="Password" className={styles.emailInput} placeholder='Enter Password' value={password} onChange={(e)=> setPassword(e.target.value)} />

          <p className={styles.password}>Confirm Password</p>
          <input type="Password" className={styles.emailInput} placeholder='Enter Confirm Password' value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} />

          {isLoading ? <button type='submit' disabled className={styles.lgButton} ><ButtonLoader /></button> : <button type='submit' className={styles.lgButton} >Sign Up</button> }
         
          
          </form>
          <p className={styles.or}>or</p>
          <button className={styles.lgButtonGoogle} onClick={signInWithGoogle}>
            <div className={styles.buttonText}>
            <FcGoogle className={styles.circle} />
            <p className={styles.textLog}>Sign up With Google</p>
            </div>
           
          </button>

          <p className={styles.acc}>Already Have an Account ? 
      <Link to={'/login'}>&nbsp;<span>Login</span></Link></p>
        </div>
      
      

   </div>
   
  )
}

export default Register