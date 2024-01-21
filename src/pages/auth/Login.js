import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import styles from './auth.module.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../config/Firebase';
import { toast } from 'react-toastify';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import ButtonLoader from '../../components/ButtonLoader';
import { FcGoogle } from "react-icons/fc";
import { useSelector } from "react-redux";
import { selectPrevious } from '../../redux/slice/AuthSlice';

const Login = () => {

  const navigate= useNavigate()
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [isLoading, setLoading]= useState(false);

  const previousURL = useSelector(selectPrevious);
  

  const handleLoginGuest=()=> {
    setEmail('test@gmail.com')
    setPassword('123456')
  }

  const redirectUser=()=> {
    if (previousURL.includes("search")) {
      const parsedUrl = new URL(previousURL)
      const query = parsedUrl.search.substring(1)
      return navigate(`/search/?${query}`);
    }else{
      navigate("/");   
    }
   
  }

  const UserLogin=(e)=> {
    e.preventDefault();
    setLoading(true)
    if(!email){
      toast.error('Email required')
      setLoading(false)
    }else if(!password){
      toast.error('Password Required')
      setLoading(false)
    }else if(password.length < 6){
      toast.error('Minimum 6 characters required in Password')
      setLoading(false)
    }else{
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => { 
    const user = userCredential.user;
    setLoading(false)
    toast.success('Login Successful')
    redirectUser()
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setLoading(false)
    toast.error(errorMessage)

  });
}

  }

  const signInWithGoogle=()=> {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
   redirectUser()
  }).catch((error) => {
    toast.error(error.message)   
  });
  }


  return (
    <div className={styles.mainLogin}>

      <div className={styles.login}>

          <p className={styles.loginText}>Login</p>

          <form className={styles.form} onSubmit={UserLogin}>

          <p className={styles.email}>Email</p>
          <input type="email" className={styles.emailInput} placeholder='Enter Email'  value={email} onChange={(e)=> setEmail(e.target.value)} />

          <p className={styles.password}>Password</p>
          <input type="Password" className={styles.emailInput} placeholder='Enter Password' value={password} onChange={(e)=> setPassword(e.target.value)} />

          {isLoading ? <button type='submit' disabled className={styles.lgButton} ><ButtonLoader /></button> : <button type='submit' className={styles.lgButton} >Login</button> }
         
          
          </form>
          <p className={styles.or}>or</p>
          <button className={styles.lgButtonGoogle} onClick={signInWithGoogle}>
            <div className={styles.buttonText}>
            <FcGoogle className={styles.circle} />
            <p className={styles.textLog}>Login With Google</p>
            </div>
           
          </button>

          <p className={styles.acc}>Don't Have an Account ? 
      <Link to={'/register'}>&nbsp;<span>SignUp</span></Link></p>
        </div>
      
      

   </div>
  
  )
}

export default Login