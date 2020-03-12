import React, { useState, useEffect, Component } from 'react'
import { Link } from 'react-router-dom'
import {serverURL} from '../../../config/config'

const PopularItem = (props)=>{
    // TODO --- get image format---
    // TODO change last sold at time stamp
    const [sneakerInventory, setSneakerInventory] = useState([])
    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        const fetchInventory = async()=>{
            try{
                setIsLoading(true)
                const res = await fetch(`${serverURL}/inventory/details/${props.sneakerName}`)
                const inventory = await res.json()
                setSneakerInventory({inventory:inventory.data})
                setIsLoading(false)
            }catch(error){
                console.log(error)
            }
        }
        fetchInventory()
    },[])

    return(
        <div>
            {
                isLoading ? <p>loading...</p>
                :
                <Link to={`/${props.sneakerName}`} className='popular-item'>
                    <div>
                        <p className='popular-item-name'>{props.sneakerName}</p>
                        <p className='popular-item-quantity'>Quantity in stock:{sneakerInventory.inventory.quantity}</p>
                        <p className='popular-item-current-ask'>Current Ask Price {sneakerInventory.inventory.lowestAskPrice}</p>
                        <p className='popular-item-current-bid'>Current Bid Price {sneakerInventory.inventory.highestBidPrice}</p>
                    </div>
                </Link>
            }
        </div>
    )
}   

export default PopularItem