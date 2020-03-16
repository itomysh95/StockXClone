import React, {useState,useEffect} from 'react'
import ItemPicture from '../item-page/item-picture'
import {serverURL} from '../../../config/config'
import {Link} from 'react-router-dom'
import SizeChart from '../size-chart'


const BuySellPage=(props)=>{

    console.log(props)
    return(
        <div className='side-by-side'>
            <ItemPicture />
            <SizeChart />
        </div>
    )
}


export default BuySellPage