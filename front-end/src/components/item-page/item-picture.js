import React from 'react'
import ItemImage from '../item-image'

const ItemPicture =(props)=>{
    return(
        <div className='container'>
            <h1>TODO INSERT IMAGE</h1>
            <ItemImage item={props.item.sneakerName} />
        </div>
    )
}

export default ItemPicture