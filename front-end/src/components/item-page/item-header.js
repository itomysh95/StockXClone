import React from 'react';
import {Link} from 'react-router-dom'

const ItemHeader = (props)=>{
    const item = props.item
    return(
        <div className='container item-header'>
            <div className="navbar navbar-expand-lg"> 
                <Link className='item-header-path' to='/'>HOME</Link>
                /<Link className='item-header-path' to={`/brand/${item.brandName}`}>{`${item.brandName}`}</Link>
                /<Link className="mr-auto item-header-path" to={`/item/sneaker/${item.sneakerName}`}>{`${item.sneakerName}`}</Link>
                <Link className='ml-auto item-header-buttons' to='/'><span></span>Share</Link>
                <Link className='item-header-buttons' to='/'>+ Portfolio</Link>
                <Link className='item-header-buttons' to='/'>+ Follow</Link>
            </div>
            <div className='container'>
                <p align='left' id='item-page-item-name'>{`${item.sneakerName}`}</p>
                <p align='left' className='font-color-grey text-size-medium'>
                    Condition: <span className='font-color-green'>NEW</span>| 
                    Item ID: <span className='font-color-black'>{item.id}</span>| 
                    <span className='font-color-green'>100% Authentic</span></p>
            </div>
        </div>
    )
}

export default ItemHeader