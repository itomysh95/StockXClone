import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import OrderSubmitted from '../order-submitted'
import { withRouter     } from 'react-router-dom'
import {serverURL} from '../../../../config/config'
import {connect} from 'react-redux'
import LoginPrompt from '../../signup-page/login-prompt'

const Confirm=(props)=>{
    const [isLoading,setIsLoading]=useState(false)
    const [loginPrompt,setLoginPrompt]=useState(false)
    CONST [orderId,setOrderId]=useState([])
    const paymentDetails = {
        "Full Name":props.paymentInfo.fullName,
        "Card Number":props.paymentInfo.cardNum,
        "Expiry":props.paymentInfo.expiry,
        "cvv":props.paymentInfo.cvv,
        "Total Cost":props.paymentInfo.totalCost
    }
    const shippingDetails = {
        "Full Name":props.shippingInfo.fullName,
        "Phone Number": props.shippingInfo.phoneNumber||"None",
        "Address One":props.shippingInfo.addressOne,
        "Address Two":props.shippingInfo.addressTwo||"None",
        "Country":props.shippingInfo.country,
        "Province":props.shippingInfo.province,
        "City": props.shippingInfo.city,
        "Zip Code":props.shippingInfo.zipCode,
    }
    const itemDetails={
        "Your Item":props.name,
        "Your Size":props.sizeInfo.size
    }
    

    const submit = async ()=>{
        try{
            let token = sessionStorage.getItem('jwt')||''
            // todo post order into orders database
            let body={
                paymentInfo:props.paymentInfo,
                shippingInfo:props.shippingInfo,
                id:props.sizeInfo.id
            }
            let fetchDetails={
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(body),
                headers:{
                    'Content-Type':'application/json'
                },
                referrerPolicy: 'no-referrer'
            }
            let guest = `/guest`
            // if the user is logged in
            if(props.loggedIn){
                fetchDetails={...fetchDetails,
                    // figure out what this does
                    // withCredentials: true,
                    // credentials: 'include',
                    headers:{
                        'Authorization':'Bearer '+token,
                        'Content-Type':'application/json'
                    }
                }
                guest = ''
            }
            // if shopping as a guest
            const res = await fetch(`${serverURL}/orders/submit/createOrder${guest}`,fetchDetails)
            let response = await res.json()
            if(res.status===200){
                setOrderId = [response.orderId]
                return true
            }else{
                return false
            }
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div className='container'>
            <div className='container'>
                <div>
                    <div className='container confirm-order' >
                        <h1 align='center'>Payment Details</h1>
                        <hr className="style3" />
                        {
                            Object.keys(paymentDetails).map((name)=>{
                                return(
                                    <div className='side-by-side' >
                                        <h2 align='left'>{name} : </h2>
                                        <h3 aligh='left'>{paymentDetails[name]} </h3>
                                    </div>
                                )
                            })
                        }
                        <h1 align='center'>Shipping Details</h1>
                        <hr className="style3" />
                        {
                            Object.keys(shippingDetails).map((name)=>{
                                return(
                                    <div className='side-by-side'>
                                        <h2 align='left'>{name} : </h2>
                                        <h3 align='left'>{shippingDetails[name]}</h3>
                                    </div>
                                ) 
                            })
                        }
                        <h1 align='center'>Item Details</h1>
                        <hr className="style3" />
                        {
                            Object.keys(itemDetails).map((name)=>{
                                return(
                                    <div className='side-by-side'>
                                        <h2 align='left'>{name} : </h2>
                                        <h3 align='left'>{itemDetails[name]}</h3>
                                    </div>
                                )
                            })
                        }
                    </div>
                    

                    <div className='container prev-next-buttons'>
                        <input type="button" className="btn btn-danger" value='Prev' id='prev-order-details' onClick={()=>{
                            props.screens('shipping')
                        }}>
                        </input>
                        <input type="button" className="btn btn-success" value='Confirm Order' id='next-order-details' onClick={async ()=>{
                            setIsLoading(true)
                            // TODO
                            // if(!props.loggedIn){
                            //     setLoginPrompt(true)
                            // }
                            let res = await submit()
                            if(res){
                                setIsLoading(false)
                                history.pushState({

                                },null,`/order/submit/${orderNumber}/${sneakerName}`)
                            }else{
                                setIsLoading(false)
                                alert('Sorry, your order could not be submitted currently, please check your details')
                            }
                        }}>
                        </input>
                    </div>
                </div>
            </div>
            
        </div>
            
    )
}

const mapStateToProps = (state)=>{
    return{
        loggedIn: state.account.loggedIn
    }
}
// call to connect that pulls it all together
export default connect(mapStateToProps)(Confirm);