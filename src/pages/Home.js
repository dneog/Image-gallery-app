import React, { useEffect, useState } from 'react'
import styles from './Home.module.css';
import Search from '../components/Search';
import Heading from '../components/Heading';
import bg1 from '../assets/samplebg1.png';
import axios from 'axios';

const Home = () => {

  const [wallpaper, setWallPaper] = useState(null)
  const [loading, setLoading] = useState(false)

  const url = 'https://pixabay.com/api/'
  const searchItem = 'mountains'
  const perPage = 40
  const orientation = 'horizontal'
  const order = 'popular'

  useEffect(()=> {
    async function fetchSearch(){
      try {
        setLoading(true)
        const response= await axios.get(`${url}?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${searchItem}&image_type=photo&&per_page=${perPage}&orientation=${orientation}&order=${order}&safeSearch=true`)

        const ImageData = await response.data.hits

          if(ImageData){
            const randomIndex = Math.floor(Math.random()* ImageData.length)
            const randomObject = ImageData[randomIndex]
    
            setWallPaper(randomObject)
            
          }
        setLoading(false)  
       
      } catch (error) {
       console.log(error.message)
        setLoading(false)
      }
    }
     fetchSearch()  
        
    },[])

   

  return (
    <>
    <Heading />
    
      <div className={styles.home} style={{backgroundImage: `url(${ !wallpaper ? bg1 : wallpaper.largeImageURL})` }}>
      <p className={styles.centerText}>Discover over 2,000,000 <br /> free Stock Images</p>
      <Search />
      <div className={styles.trending}>
        <p className={styles.t1}><span>Trending : </span> flowers, love, forest, river</p>
      </div>

    </div>
    
    </>
  
  )
}

export default Home