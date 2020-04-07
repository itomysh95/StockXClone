import React,{useState,useEffect} from 'react'
import mensUSASizeConverter from '../size-page/size-converter'
import NewEntry from './new-entry'

const PaymentSelect = (props)=>{
    const cont=(paymentDetails)=>{
        props.setPaymentInfo(paymentDetails)
        props.screens('shipping')
    }
    const prev=()=>{
        props.screens('size')
    }
    return(
        <div>
            <div className='container' align='center'>
                <button type='button' id='change-size-button' onClick={()=>{
                    props.screens('size')
                }}>
                    {`U.S. Men's Size ${props.sizeInfo.size}`} <i className="fas fa-pen"></i>   
                </button>
            </div>
            <div className='container'>
                <NewEntry 
                    screens={props.changeScreen} 
                    sizeInfo={props.sizeInfo} 
                    buy={props.buy}
                    cont={cont}
                    prev={prev}
                />
            </div>
            <div className='left-space-right'>
            </div>
        </div>
    )
}

export default PaymentSelect