import React, { useState, useEffect, Component} from 'react'
import {connect} from 'react-redux'
import PopularItem from './popular-item'
import {serverURL} from '../../../config/config'

// functional component approach
const MostPopular = () => {
    const [sneakerData, setSneakerData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    // const [errorState, setErrorState] = useState(false)
    useEffect(()=>{
        const fetchSneaker = async()=>{
            try{
                setIsLoading(true)
                // read in the data
                const topFiveSneakers = await fetch(`${serverURL}/sneaker/retrieve/popular/5`)
                const sneaker = await topFiveSneakers.json()
                setSneakerData({sneakers:sneaker.list})
                // setIsLoading(false)
            }catch(error){
                // setErrorState(true)
            }
        }
        fetchSneaker()
    },[])
//     <table>
//     <tr>
//         <td><PopularItem /></td>
//     </tr>
// </table>
    return(                    
        <div className='container'>
            <h3 align='center'>Most Popular</h3>
                {
                    isLoading ? <p>loading</p>:
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

export default connect(mapStateToProps)(MostPopular)