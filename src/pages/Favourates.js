import React, { useEffect, useState } from 'react'
import styles from './Favourates.module.css';
import HeadingShare from '../components/HeadingShare';
import {useSelector} from 'react-redux';
import { selectUserID } from '../redux/slice/AuthSlice';
import { db } from '../config/Firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import {toast} from 'react-toastify';
import PageLoader from '../components/PageLoader';
import ShowImage from '../components/ShowImage';

const Favourates = () => {
    const userID = useSelector(selectUserID);
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState([])
    const [allData, setAllData] = useState([])
    const arr = []

    useEffect(()=> {
        const getPosts=()=> {
            setLoading(true)
             try{
           const postRef= collection(db, "favourate");
           const qw = query(postRef, orderBy("createdAt", "desc"));
         
          onSnapshot(qw, (snapshot) => {
           const allPosts= snapshot.docs.map((doc)=> ({
             id: doc.id,
             ...doc.data()
           }))
           if(allPosts){
            const favImages = allPosts.filter((data) => data.userID == userID)
            const onlyItems = favImages.map((data) => data.item)
            
           
              setImages(onlyItems)
              setAllData(favImages)
           }
          
           setLoading(false)
         });
         
         
          }catch(error){
           toast.error(error.message)
          setLoading(false)
          }
           }
           getPosts()
    },[userID])

  return (
    <div className={styles.Favourates}>
        <HeadingShare />

        <div className={styles.fv}>

        <p className={styles.fvImg}>Favourate Images</p>
        
        {loading ? 
      <div className={styles.loader}>
          <PageLoader />
      </div>
       : (
        <div className={styles.wrap}>
          <ShowImage images={images} allData={allData} />
        </div>
        
        
      )}

        {!loading && images.length == 0 && 
        <div className={styles.loader}>
            <p>No Favourate Images Found.</p>
        </div>
        }

        </div>
    
        </div>

  )
}

export default Favourates