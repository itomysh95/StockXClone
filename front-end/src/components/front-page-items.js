import React from 'react'
import PopularBrands from './popular-display/popular-brands'
import MostPopular from './popular-display/most-popular'
import NewLowestAsk from './popular-display/new-lowest-ask'
import NewHighestBids from './popular-display/new-highest-bids'
// component for displaying the items on front page

const FrontPageItems = ()=>(
    <div>
        <PopularBrands />
        <MostPopular />
        <NewLowestAsk />
        <NewHighestBids />
    </div>
)

export default FrontPageItems