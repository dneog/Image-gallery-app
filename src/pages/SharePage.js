import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import styles from '../components/ImageList.module.css';
import { IoIosRadioButtonOff } from "react-icons/io";
import { MdDone } from "react-icons/md";
import PageLoader from '../components/PageLoader';
import Heading from '../components/Heading';
import HeadingShare from '../components/HeadingShare';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { SAVE_URL, selectIsLoggedIn, selectUserID } from '../redux/slice/AuthSlice';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { db } from '../config/Firebase';

const SharePage = () => {

    const {id} = useParams()
    const url = 'https://pixabay.com/api/'
    const apiKey = '41905285-f5c76dba9bb7d63437add8d6f'
  const userID = useSelector(selectUserID)
  const currentPageUrl = window.location.href
    const [data, setData] = useState([])
    const [dataMain, setDataMain] = useState([])
    let arr = []
    const [loading, setLoading] = useState(false)
    const [active, setActive]= useState('small')
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const dispatch = useDispatch()
  const navigate = useNavigate()

    const handleActive = (item) => {
      setActive(item)
    }

  
    useEffect(()=> {
      async function fetchSearch(){
        try {
          setLoading(true)
          const response= await axios.get(`${url}?key=${process.env.REACT_APP_PIXABAY_API_KEY}&id=${id}&image_type=photo&safeSearch=true`)
          const ImageData = await response.data.hits
    
           if(ImageData){
              setData(ImageData)
           }
           
          setLoading(false) 

        } catch (error) {
          toast.error(error.message || error)
          setLoading(false)
        }
      }
    
       fetchSearch()  
    },[id])

    

    const handleDownload = async (item) => {
      const [i] = item
      
      if (isLoggedIn) {
        const docRef = await addDoc(collection(db, "downloads"), {
          userID,
          item: i,
          createdAt: Timestamp.now().toDate()
      
          });
        toast.success('Downloaded Successfully.')
      } else {
        dispatch(SAVE_URL(currentPageUrl))
        navigate("/login");
        toast.info('Please Login to Continue.')
      }
    }



    let filteredTags
    if(data){
    filteredTags = data.forEach(i => (
      arr.push(i.tags.split(''))
    ))
    }
    
    console.log(arr)

   
  return (
    
    <div>
      <HeadingShare />
      {loading ? <div className={styles.loaderImg}>
       <PageLoader />
    </div> : 
      <>
      
      <div className={styles.shareBox}>
      <div className={styles.ModelBody}>

{/* left Part */}

<div className={styles.modelInner}>

<div className={styles.ModelPic}>
{data.map(item => (
<img className={styles.ModelImg} src={item.webformatURL} alt="" />
))}

<div className={styles.tags}>
  <p className={styles.tag}>Tags : </p>

{data.length !== 0 && arr.map((item, index)=> (
  
  <p key={index} className={styles.tagsDatas}> {item} </p>
))}
</div>

</div>
</div>

{/* Right Part */}

<div className={styles.download}>
  <p className={styles.down}>Download</p>
  <div className={styles.outer}>

    <div className={`${styles.ineerPart} ${active== 'small' ? styles.bgModel : ''}`} onClick={()=> handleActive('small')}>
      <div>
        <p className={styles.medium}>Small</p>
      </div>

      <div className={styles.innerPartOne}>
      <p className={styles.size}>640 x 960</p>
      <div className={styles.rd}>
      <IoIosRadioButtonOff className={`${styles.radio} ${active== 'small' ? styles.hide : ''}`} />
      {active == 'small' && 
      <MdDone className={styles.radioDone} />
      } 
      </div>
     
      </div>
    </div>

    <div className={`${styles.ineerPart} ${active== 'medium' ? styles.bgModelM : ''}`} onClick={()=> handleActive('medium')}>
      <div>
        <p className={styles.medium}>Medium</p>
      </div>

      <div className={styles.innerPartOne}>
      <p className={styles.size}>1920 x 2660</p>
      <div className={styles.rd}>
      <IoIosRadioButtonOff className={`${styles.radio} ${active== 'medium' ? styles.hide : ''}`} />
      {active == 'medium' && 
      <MdDone className={styles.radioDone} />
      } 
      </div>
      
      </div>
    </div>

    <div className={`${styles.ineerPart} ${active== 'big' ? styles.bgModelM : ''}`} onClick={()=> handleActive('big')}>
      <div>
        <p className={styles.medium}>Big</p>
      </div>

      <div className={styles.innerPartOne}>
      <p className={styles.size}>2400 x 3600</p>
      <div className={styles.rd}>
      <IoIosRadioButtonOff className={`${styles.radio} ${active== 'big' ? styles.hide : ''}`} />
      {active == 'big' && 
      <MdDone className={styles.radioDone} />
      } 
      </div>
      </div>
    </div>

    <div className={`${styles.ineerPartLast} ${active== 'original' ? styles.bgModelL : ''}`} onClick={()=> handleActive('original')}>
      <div>
        <p className={styles.medium}>Original</p>
      </div>

      <div className={styles.innerPartOne}>
      <p className={styles.size}>3850 x 5680</p>
      <div className={styles.rd}>
      <IoIosRadioButtonOff className={`${styles.radio} ${active== 'original' ? styles.hide : ''}`} />
      {active == 'original' && 
      <MdDone className={styles.radioDone} />
      } 
      </div>
      </div>
    </div>

  </div>

  <button className={styles.free} onClick={()=> handleDownload(data)}>Download for Free!</button> 

  <p className={styles.info}>Information</p>

  {data.map((data)=> (
     <table>
     <tbody>
       <tr>
       <td className={styles.infoUser}>User</td>
       <td className={styles.infoUser}>User ID</td>
       <td className={styles.infoUser}>Type</td>
       </tr>
       
     </tbody>
 
     <tbody>
       <tr>
         <td className={styles.infoUserName}>{data.user}</td>
         <td className={styles.infoUserName}>{data.user_id}</td>
         <td className={styles.infoUserName}>{data.type}</td>
       </tr>
     </tbody>
 
     <tbody>
       <tr>
       <td className={styles.infoUser2}>Views</td>
       <td className={styles.infoUser2}>Downloads</td>
       <td className={styles.infoUser2}>Likes</td>
       </tr>
     </tbody>
 
     <tbody>
       <tr>
         <td className={styles.infoUserName}>{data.views}</td>
         <td className={styles.infoUserName}>{data.downloads}</td>
         <td className={styles.infoUserName}>{data.likes}</td>
       </tr>
     </tbody>
   </table>
  ))}

 

 

     

</div>
</div>
      </div>
     
      </>
      }
    </div>
  )
}

export default SharePage