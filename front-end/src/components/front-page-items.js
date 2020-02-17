import React from 'react'
import PopularBrands from './popular-brands'
import MostPopular from './most-popular'
import NewLowestAsk from './new-lowest-ask'
import NewHighestBids from './new-highest-bids'
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