import React,{useState, useEffect} from 'react';
import {serverURL} from '../../../config/config'

const ItemStats = (props)=>{
    const [itemStats,setItemStats] = useState([])
    const [isLoading,setIsLoading]=useState(true)
    useEffect(()=>{
        const fetchSneaker = async()=>{
            try{
                setIsLoading(true)
                const res = await fetch(`${serverURL}/inventory/retrieve/stats/${props.item}`)

                const item = await res.json()
                console.log('item is ',item[0])
                setItemStats(item[0])
                setIsLoading(false)
            }catch(error){
                console.log(error)
            }
        }
        fetchSneaker()
    },[])
    return(
        <div>
            {
                isLoading? <p>Loading...</p>:
                <div className='background-c-light-grey flex-display'>
                    <div className='container side-by-side caps padding-t-b-lg margin-t-b-lg'>
                    <div className='container' align='center'>
                        <p>52 week high {`${itemStats.highest_sale}`} | low {`${itemStats.lowest_sale}`}</p>
                    </div>
                    <div className='container' align='center'>
                        <p>trade range (12 mos.) {`todo`}</p>
                    </div>
                    <div className='container' align='center'>
                        <p>volatility {`todo`} </p>
                    </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ItemStats