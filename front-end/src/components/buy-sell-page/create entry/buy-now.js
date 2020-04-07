import React,{useState,useEffect} from 'react'
import {serverURL} from '../../../../config/config'
// import validatePayment TODO

const BuyNow=(props)=>{
    let totalCost = '--'
    if(props.sizeInfo.price){
        totalCost=(parseFloat(props.details.shipping.slice(1))+parseFloat(props.sizeInfo.price.slice(1))).toFixed(2)
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
        totalCost
    }

    // validatePayment(paymentDetails) TODO
    const [discountCode,setDiscountCode]=useState(false)
    // to check if the code is valid
    // TODO
    const checkCode = async()=>{
        try{
            let code = document.getElementById('discount-code').value
            let fetchDetails = {
                method:'POST',
                mode: 'cors',
                body:JSON.stringify({code}),
                headers:{
                    'Content-Type':'application/json'
                },
                referrerPolicy: 'no-referrer'
            }
            let res = await fetch(`${serverURL}/codes/discount/validate`,fetchDetails)
            // if code is valid apply discount to total, else invalid alert
            let valid = res.json()
            valid = {
                valid:true,
                discount:50
            }
            if(valid.valid){
                setDiscountCode(true)
            }else{
                alert('invalid code!')
            }
        }catch(error){
            console.log(error)
        }
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
                            {props.details.shipping}
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
                        <p>
                            Total
                        </p>
                        <p id='total-cost'>
                            {`$${totalCost}`}
                        </p>
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
                <input type="number" 
                    placeholder="Expiration MM/YY" 
                    id="payment-expiry-date"
                    required
                    className="form-control"
                    onChange={(event)=>{
                        setExpiry(event.target.value)
                    }}
                />
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
                    <input type="button" className="btn btn-success" value='Next' id='next-order-details' onClick={()=>{
                        props.cont(paymentDetails)
                    }}>
                    </input>
                </div>
        </div>
    )
}

export default BuyNow