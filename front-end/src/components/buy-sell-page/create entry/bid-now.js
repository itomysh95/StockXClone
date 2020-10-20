import React,{useState,useEffect} from 'react'


const BidNow =(props)=>{
    let totalCost= '--'
    let [expirationDate,setExpirationDate]=useState('')
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
        <div className='container col-sm-8' align='center'>
            <form>
                <div className='side-by-side payment-details'>
                    <h1>$</h1>
                    <input
                        className="form-control
                        form-control-lg
                        text-size-medium
                        font-family-sans-serif"
                        defaultValue={`Enter a bid`}
                    />
                </div>
                <span className=''>{`A good bid would be around ${props.goodBid||'...'}`}</span>
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
                    <span>{`${totalCost}`}</span>
                </div>
            </form>
            <div className='container'>
                <div>
                    Ask Expiration Date:
                    <select id='expiration-days'>
                        <option value='one'>1 Day</option>
                        <option value='three'>3 Days</option>
                        <option value='seven'>7 Days</option>
                        <option value='fourteen'>14 Days</option>
                        <option value='thirty'>30 Days</option>
                        <option value='sixty'>60 Days</option>
                    </select>
                </div>
            </div>
            <div className='container prev-next-buttons'>
                    <input type="button" className="btn btn-danger" value='Prev' id='prev-order-details' onClick={()=>{
                        props.prev('size')
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

export default BidNow