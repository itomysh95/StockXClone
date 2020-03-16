import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import PopularItem from './popular-item'
import {serverURL} from '../../../config/config'
import PopularDisplayHeader from './popular-display-header'

// component for lowest asking price shoes 
const NewHighestBids =()=>{
    const [sneakerData, setSneakerData] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    useEffect(()=>{
        const fetchSneaker = async()=>{
            try{
                setIsLoading(true)
                const res = await fetch(`${serverURL}/inventory/price/bid/all/5`)
                const sneakers = await res.json()
                setSneakerData({sneakers})
                setIsLoading(false)
            }catch(error){
                console.log(error)
            }
        }
        fetchSneaker()
    },[])


    return(
    <div className='container'>
        <PopularDisplayHeader header={`New Highest Bids`}/>
        {
            isLoading? <p>Loading...</p>:
            <div>
                <table className='popular-table'>
                    <tbody>
                        <tr>
                            {
                                sneakerData.sneakers.map((sneaker)=>{
                                    return(
                                        <td className='popular-td'>
                                            <PopularItem {...sneaker} />
                                        </td>
                                    )
                                })
                            }
                        </tr>
                    </tbody>
                </table>
            </div>
        }
    </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        
    }
}

export default connect(mapStateToProps)(NewHighestBids)