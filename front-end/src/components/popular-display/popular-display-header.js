import React from 'react'
import {Link} from 'react-router-dom'

const PopularDisplayHeader = (props)=>{
    return(
        <h3 className='categories-label-popular-component'>{`${props.header}`} 
            <span align='right'>
                <Link to={`/sneakers`} className='see-all'>See All</Link>
            </span>
        </h3>
    )
}

export default PopularDisplayHeader