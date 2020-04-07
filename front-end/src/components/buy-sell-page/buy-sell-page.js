import React, {useState,useEffect} from 'react'
import ItemImage from '../item-image'
import {serverURL} from '../../../config/config'
import {Link} from 'react-router-dom'
import Order from './order'


const BuySellPage=(props)=>{
    return(
        <div className='side-by-side'>
            <ItemImage name={props.match.params.name}/>
            <Order name={props.match.params.name} buy={props.buy} history={props.history} />
        </div>
    )
}


export default BuySellPage