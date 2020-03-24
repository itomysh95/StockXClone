import React,{useEffect, useState} from 'react'

const ItemImage =(props)=>{
    const [imageSrc,setImageSrc]=useState([])
    useEffect(()=>{
        // TODO linnk this to image
        setImageSrc('/images/no-image-found.jpg')
    },[])
    return(
        <div className='container' align='center'>
            <h1>figure out images TODO</h1>
            <img src={`${imageSrc}`} onError={()=>{
                setImageSrc('https://unbxd.com/wp-content/uploads/2014/02/No-results-found.jpg')
            }}/>
        </div>
    )
}

export default ItemImage