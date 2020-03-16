import React from 'react'

const ItemInfo=(props)=>{
    // TODO UPDATE DATABASE TO GET MORE DETAILS FOR THIS PAGE
    return(
        <div className='container side-by-side text-size-medium font-family-sans-serif'>
            <div className='container'>
                <p>STYLE</p>
                <p>COLORWAY</p>
                <p>RETAIL PRICE</p>
                <p>RELEASE DATE</p>
            </div>
            <div className='container' align='left'>
                <p>{`${props.item.sneakerInfo}`}</p>
                <p>Insert Shoe Details here</p>
            </div>
        </div>
    )
}

export default ItemInfo 