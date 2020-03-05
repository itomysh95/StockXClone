import React from 'react'
import MostPopular from './most-popular'
import NewLowestAsk from './new-lowest-ask'
import NewHighestBids from './new-highest-bids'
import PopularBrands from './popular-brands'

const PopularDisplay = ()=>(
    <div className='popular-container'>
        <PopularBrands />
        <MostPopular />
        <NewLowestAsk />
        <NewHighestBids />
    </div>
)

export default PopularDisplay