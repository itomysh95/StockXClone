import React from 'react'
import moment from 'moment'

const ItemInfo=(props)=>{
    return(
        <div className='container side-by-side text-size-medium font-family-sans-serif'>
            <div className='container'>
                <p>COLORWAY {`${props.item.colorWay}`} </p>
                <p>RETAIL PRICE {`${props.item.retailPrice}`} </p>
                <p>RELEASE DATE {`${moment(props.item.releaseDate).format("YYYY/MM/DD")}`} </p>
            </div>
            <div className='container' align='left'>
                <p>(INSERT SHOE DETAILS HERE){`${props.item.sneakerInfo}`}</p>
            </div>
        </div>
    )
}

export default ItemInfo 