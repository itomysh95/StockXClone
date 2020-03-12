import React, { useState, useEffect, Component} from 'react'
import {connect} from 'react-redux'
import BrandLogo from './brand-logo'
import PopularDisplayHeader from './popular-display-header'
import {serverURL} from '../../../config/config'

const PopularBrands=()=>{
    const [brandData, setBrands] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        const fetchBrands = async()=>{
            try{
                setIsLoading(true)
                // retrieve the top 4 brands( based on amount sold ) 
                const res = await fetch(`${serverURL}/sneaker/retrieve/popularbrands/4`)
                const brands = await res.json()
                setBrands({brands:brands.brands})
                setIsLoading(false)
            }catch(error){
                console.log(error)
            }
        }
        fetchBrands()
    },[])

    return(
    <div>
        <div align='center' className='container'>
            <PopularDisplayHeader header={`Popular Brands`}/>
            {
                isLoading? <p>Loading...</p>:
                <div>
                    <table className = 'popular-table'>
                        <tbody>
                            <tr>
                                {
                                    brandData.brands.map((brand)=>{
                                        return(
                                            <td className ='popular-td'>
                                                <BrandLogo {...brand}/>
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
        <BrandLogo />
    </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        
    }
}

export default connect(mapStateToProps)(PopularBrands)