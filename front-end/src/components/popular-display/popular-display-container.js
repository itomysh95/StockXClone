import React from 'react'
import mostPopular from './most-popular'
import newLowestAsk from './new-lowest-ask'
import newHighestBids from './new-highest-bids'

const popularDisplay = ()=>{
    <div>
        <mostPopular />
        <newLowestAsk />
        <newHighestBids />
    </div>
}

export default popularDisplay