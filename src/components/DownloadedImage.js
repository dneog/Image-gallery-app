import React, { useState } from 'react'
import styles from './ImageList.module.css';
import Model from './Model';
import { CgCloseR } from "react-icons/cg";
import { IoIosRadioButtonOff } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { IoIosShareAlt } from "react-icons/io";
import LinkModel from './LinkModel';
import {toast} from 'react-toastify';
import { AiOutlineDelete } from "react-icons/ai";
import {useDispatch, useSelector} from 'react-redux';
import { SAVE_URL, selectIsLoggedIn, selectUserID } from '../redux/slice/AuthSlice';
import {useNavigate} from 'react-router-dom';
import {  deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/Firebase';


const ShowImage = ({images, allData}) => {

  console.log(images)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const userID = useSelector(selectUserID)
  const [open, setOpen] = useState(false)
  const [openLink, setOpenLink] = useState(false)
  const [data, setData] = useState(null)
  const [active, setActive]= useState('small')
  const [urlData, setUrlData] = useState(null)
  const [hover, setHover] = useState(false)

 const currentPageUrl = window.location.href

  const handleActive = (item) => {
    setActive(item)
  }

  const handleData= (item)=> {
    setOpen(!open)
    setData(item)
  }
  const handleClose= ()=> {
    setActive('small')
    setOpen(!open)
  }
  let filteredTags
  if(data){
  filteredTags = data.tags.split(',')
  }
  let currentUrl
  const handleLinkModel =(data)=> {
    setOpenLink(!openLink)
    currentUrl = window.location.href
    const mainUrl = new URL(currentUrl)
    const baseUrl = `${mainUrl.protocol}//${mainUrl.host}`

    setUrlData(`${baseUrl}/image/${data.id}`)
  }

  const handleCopy=()=> {
    navigator.clipboard.writeText(urlData).then(()=> {
      toast.success('Link Copied Successfully')
      // setOpenLink(!openLink)
    })
  }

  const handleDelete= async (item)=> {
    const mainArr = await allData.find((data)=> data.item == item)
    
    try{
      await deleteDoc(doc(db, "favourate", mainArr.id));
     toast.success('Post Deleted Successfully')

    }catch(error){
      console.log(error.message)
    }
  }


  return (
    <>
     <div className={styles.imgContainerFlex}>
        {images && images.map((item)=> (
          <div className={styles.containerBFlex}> 
            <img className={styles.imgsFlex} src={item.webformatURL} onClick={()=> handleData(item)}  alt="images" />

          <div className={styles.wrapper}></div>
          

         {/* <div className={styles.imgTag}>
         {item.tags.split(',').map((i)=> (
            <p className={styles.tagName}>{i}</p>
          ))}
         </div>    */}
          </div>   
        ))}
    </div>

    {open && <Model>
      <div className={styles.preview}>
      <p className={styles.pr}>Preview ID : {data.id}</p>
      <CgCloseR className={styles.cl} onClick={()=> handleClose()} />
      </div>

      <div className={styles.ModelBody}>

        {/* left Part */}

       <div className={styles.modelInner}>

       <div className={styles.ModelPic}>

        <img className={styles.ModelImg} src={data.webformatURL} alt="" />

        <div className={styles.tags}>
          <p className={styles.tag}>Tags : </p>
        {filteredTags.map((item)=> (
          <p className={styles.tagsData}>{item}</p>
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

          <button disabled className={styles.free}>Already Downloaded</button> 

          <p className={styles.info}>Information</p>

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

          <button className={styles.share} onClick={()=> handleLinkModel(data)}>Share <IoIosShareAlt className={styles.sharebut} /></button>

              {openLink && <LinkModel>
              <div className={styles.preview}>
              <p className={styles.pr}>Copy Link</p>
              <CgCloseR className={styles.cl} onClick={()=> setOpenLink(!openLink)} />
              </div>
              <div className={styles.copyBox}>
              <p className={styles.urlData}>{urlData}</p>
                <button  className={styles.copyLink} onClick={()=> handleCopy()}>Copy</button>
              </div>
                
              </LinkModel>}
  
      </div>
      </div>
    </Model>}
   
    </>
   
  )
}

export default ShowImage