import React,{useState,useEffect} from 'react'
import {serverURL} from '../../../../config/config'

const SellNow=(props)=>{
    let totalPayout = '--'
    if(props.sizeInfo.price){
        totalPayout=(parseFloat(props.shipping.slice(1))+parseFloat(props.sizeInfo.price.slice(1))).toFixed(2)
    }
    let [cvv,setCvv]=useState('')
    let [fullName,setFullName]=useState('')
    let [cardNum,setCardNum]=useState('')
    let [expiry,setExpiry]=useState('')
    let paymentDetails = {
        fullName,
        cardNum,
        expiry,
        cvv,
        totalPayout
    }

    // validatePayment(paymentDetails) TODO
    const [discountCode,setDiscountCode]=useState(false)
    // to check if the code is valid
    // TODO
    const checkCode = async()=>{
    }
    return(
        <div className='container col-sm-8'>
            <form>
                <div className='side-by-side payment-details'>
                    <h1>$</h1>
                    <input 
                        className="form-control 
                            form-control-lg 
                            text-size-medium 
                            font-family-sans-serif" 
                        value={props.sizeInfo.price?`${props.sizeInfo.price.slice(1)}`:'None Available Currently'}
                        readOnly
                    />
                </div>
                <div className='text-size-medium font-family-sans-serif'>
                    <div className='left-space-right'>  
                        <p>
                            Estimated Shipping
                        </p>
                        <p>
                            {props.shipping}
                        </p>
                    </div> 
                    <div className='left-space-right'>  
                        <p>
                            Authentication Fee
                        </p>
                        <p>
                            Free!
                        </p>
                    </div>
                    <div className='left-space-right'>  
                        <p>
                            Discount Code
                        </p>
                        <div className='side-by-side'>
                            <input 
                                className="form-control rtl border-0" 
                                type="text" 
                                placeholder='Add Discount+'
                                id='discount-code'
                            />
                            <input 
                                type="button" 
                                value='Check Code!' 
                                id='check-discount-button' 
                                onClick={async ()=>{
                                    await checkCode()
                                }}
                            />
                        </div>
                    </div>
                    <div className='left-space-right'>  
                        <p>Total Payout</p>
                        <p id='total-payout'>
                            {`$${totalPayout}`}
                        </p>
                    </div>
                    <div>
                        
                    </div>
                </div>
                <input id="payment-fullname"
                    type="text"
                    placeholder="Full name (on the card)" 
                    required 
                    className="form-control"
                    onChange={(event)=>{
                        setFullName(event.target.value)
                    }} 
                />
                <input 
                    id="payment-card-num"
                    type="text" 
                    name="cardNumber" 
                    placeholder="Card Number"
                    required
                    className="form-control"
                    onChange={(event)=>{
                        setCardNum(event.target.value)
                    }}
                />
                <span className="expiration">
                    <input type="text" name="month" placeholder="MM" maxLength="2" size="2" />
                    <span>/</span>
                    <input type="text" name="year" placeholder="YY" maxLength="2" size="2" />
                </span>
                <input 
                    type="number" 
                    placeholder="cvv" 
                    required
                    id="payment-cvv"
                    value={cvv}
                    className="form-control"
                    onChange={(event)=>{
                        if(cvv>3){
                            setCvv(event.target.value.slice(0,3))
                        }else setCvv(event.target.value)
                    }} 
                />
            </form>
                <div className='container prev-next-buttons'>
                    <input type="button" className="btn btn-danger" value='Prev' id='prev-order-details' onClick={()=>{
                        props.prev()
                    }}>
                    </input>
                    <input type="button" disabled={totalPayout==='--'} className="btn btn-success" value='Next' id='next-order-details' onClick={()=>{
                        props.cont(paymentDetails)
                    }}>
                    </input>
                </div>
        </div>
    )
}

export default SellNow