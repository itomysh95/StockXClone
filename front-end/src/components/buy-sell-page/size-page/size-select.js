import React,{useState,useEffect} from 'react'
import SizeTable from './size-table'
import Order from '../order'
import {serverURL} from '../../../../config/config'
import SizeChart from './size-chart'

// component switching between size converter chart and size/price chart
const SizeSelect= (props)=>{
    // if buy we want lowest ask prices
    let buy = 'ask';
    let lowestAsks='Lowest Asks'
    // else we want highest bid prices for sell
    if(!props.buy){
        buy='bid';
        lowestAsks='Highest Bids'
    }
    const [sizeChart,setSizeChart]=useState(false)
    const [isLoading, setIsLoading] =useState(true)
    const [sizeData, setSizeData]=useState([])
    // switch between size chart and price display
    const displaySizes=()=>{
        setSizeChart(!sizeChart)
    }
    useEffect(()=>{
        const fetchSize = async()=>{
            try{
                setIsLoading(true)
                const res = await fetch(`${serverURL}/inventory/retrieve/${buy}/size/${props.name}`)
                const sizePrice = await res.json()
                setSizeData({...sizePrice})
                setIsLoading(false)
            }catch(error){
                console.log(error)
            }
        }
        fetchSize()
    },[])

    return(
        <div className='container'>
            <div className='sizes-display'>
            {
                isLoading?<p>loading...</p>
                :
                <div>
                    {sizeChart? 
                        <div>
                            <div className="navbar navbar-expand-lg padding-none text-size-medium">
                                <h2 className='mr-auto'>Size Chart</h2>
                                <p className='font-color-light-green hover-pointer' 
                                    onClick={displaySizes}>
                                    {`<-back`}
                                </p>
                            </div>
                            <div className='container'>
                                <SizeTable />
                            </div>
                        </div>
                        :
                        <div>
                            <h2>Select Size</h2>
                            <div className="navbar navbar-expand-lg padding-none text-size-medium">
                                <p align='left' className='mr-auto'>U.S. Men's Sizes|{`${lowestAsks}`}</p>
                                <p className='font-color-light-green hover-pointer' 
                                    onClick={displaySizes}>
                                    Size Chart
                                </p>
                            </div>
                            <SizeChart buy={props.buy} sizeData={sizeData} screens={props.screens} setSizeInfo={props.setSizeInfo}/>
                        </div>
                    }
                </div>
            }
            </div>
        </div>
    )
}

export default SizeSelect