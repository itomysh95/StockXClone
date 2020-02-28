import React from 'react'

const PopularItem = (props)=>{
    // TODO --- get image format---
    return(
        <div>
            <p className='popular-item-name'>{props.name}</p>
            <p className='popular-item-price'>{props.price}</p>
            <p className='popular-item-time-last-sold'>{props.timeLastSold}</p>
        </div>
    )
}

export default PopularItem