import React, { useEffect, useState } from 'react'
import styles from './SearchResult.module.css';
import {useSearchParams} from 'react-router-dom';
import axios from 'axios';
import Heading from '../components/Heading';
import NewSearch from '../components/NewSearch';
import bg1 from '../assets/samplebg1.png';
import Categories from '../components/Categories';
import ImageList from '../components/ImageList';
import { toast } from 'react-toastify';
import PageLoader from '../components/PageLoader';



const SearchResult = () => {
  const [loading, setLoading] = useState(false)
  const [searchParams]= useSearchParams()
  const qTerm= searchParams.get("q")
  const url = 'https://pixabay.com/api/'
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [images, setImages] = useState([])
  const perPage = 20
  let totalPageNumbers = []




  useEffect(()=> {
    async function fetchSearch(){
      try {
        setLoading(true)
        const response= await axios.get(`${url}?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${qTerm}&image_type=photo&page=${page}&per_page=${perPage}&safeSearch=true`)
        const ImageData = await response.data.hits
          if(ImageData){
            setImages(ImageData)
            setTotalPage(Math.ceil(response.data.totalHits / perPage))
            
          }
        setLoading(false)  
       
      } catch (error) {
        toast.error(error.message || error)
        setLoading(false)
      }
    }
     fetchSearch()  
        
    },[qTerm, perPage, page])


    const handlePage = (data)=> {
      setPage(data)
    }
    

    const totalNumbers = ()=> {
      for(let i=1; i<= totalPage; i++){
        totalPageNumbers.push(i)
      }
    }

    const handlePrev=(pageNumber)=> {
      setPage(pageNumber)
    }
    const handleNext=(pageNumber)=> {
      setPage(pageNumber)
    }

    console.log(totalPageNumbers)
    console.log(images)

  return (
    <div className={styles.searchImage}>

      {/* 1st heading and search result part */}
      <div className={styles.searchHeading} style={{backgroundImage: `url(${bg1})`}}>
      <Heading />
      <NewSearch handlePage={handlePage} />
      <p className={styles.result}>Result : <span>{qTerm}</span> </p>
      </div>
      
      {!loading && images.length == 0 && <p className={styles.sorry}>No Result Found</p>}

    {loading ? 
    <div className={styles.loaderImg}>
       <PageLoader />
    </div>
    : 
      (
        <>
         <div className={images.length !== 0 && styles.Categories}>
        <Categories images={images} handlePage={handlePage}/>
      </div>

      {images.length !== 0 && <div className={styles.list}>
        <ImageList images={images} loading= {loading}  />
      </div>} 

      {images.length !== 0 && <div className={styles.pagination}>
      <button className={styles.butPrev} onClick={()=> handlePrev(page-1)} disabled={page==1}>Prev</button>
      <span>{page} / {totalPage}</span>
    <button className={styles.butPrev} onClick={() => handleNext(page+1)}>Next</button>
    </div>}

        </>
      ) 
    }

    

    
    
    
   
    

    </div>
  )
}

export default SearchResult