import React from 'react'
import PopularBrands from './PopularBrands'
import MostPopular from './MostPopular'
import NewLowestAsk from './NewLowestAsk'
import NewHighestBids from './NewHighestBids'
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