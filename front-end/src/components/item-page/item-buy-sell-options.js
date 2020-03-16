import React,{ useState,useEffect } from 'react'
import {serverURL} from '../../../config/config'
import { Link } from 'react-router-dom'

const ItemBuySellOptions=(props)=>{
    const [data,setData] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    useEffect(()=>{
        const fetchSneakerData=async()=>{
            try{
                setIsLoading(true)
                const res = await fetch(`${serverURL}/inventory/details/${props.sneakerName}`)
                const sneakerData = await res.json()
                setData({...sneakerData.data})
                setIsLoading(false)
            }catch(error){
                console.log(error)
            }
        }
        fetchSneakerData()
    },[])
    return(
        <div>   
            {
                isLoading?<p>Loading...</p>:
                <div className='container side-by-side'>
                    <div className='container'>
                        <p className='font-color-grey text-size-medium'>Size</p>
                    </div>
                    <div className='container'>
                        <p className='font-color-grey text-size-medium'>Last Sale{}</p>
                    </div>
                    <div className='container'>
                        <Link to={`/item/buy/${props.sneakerName}`}>
                            <button type='button' className='btn btn-success btn-buy-sell'>
                                <div className='container side-by-side'>
                                    <div className='container'>
                                        <p className='font-color-white text-size-medium margin-none'>{data.lowestAskPrice}</p>
                                        <p className='font-color-light-grey text-size-medium margin-none'>Lowest Ask</p>
                                    </div>
                                    <p> 
                                        <span className='separator'></span>
                                    </p>
                                    <div className='container'> 
                                        <p className='font-color-white text-size-medium margin-none'>Buy</p>
                                        <p className='font-color-light-grey text-size-medium margin-none'>or Bid</p>
                                    </div>
                                </div>
                            </button>
                        </Link>
                    </div>
                    <div className='container'>
                        <Link to={`/item/sell/${props.sneakerName}`}> 
                            <button type='button' className='btn btn-danger btn-buy-sell'>
                                <div className='container side-by-side'>
                                    <div className='container'>
                                    <p className='font-color-white text-size-medium margin-none'>{data.highestBidPrice}</p> 
                                        <p className='font-color-light-grey text-size-medium margin-none'>Highest Bid</p>
                                    </div>
                                    <p> 
                                        <span className='separator'></span>
                                    </p>
                                    <div className='container'> 
                                        <p className='font-color-white text-size-medium margin-none'>Sell</p>
                                        <p className='font-color-light-grey text-size-s-m margin-none'>or ASK</p>
                                    </div>
                                </div>
                            </button>
                        </Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default ItemBuySellOptions