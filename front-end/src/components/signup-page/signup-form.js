import React, { useState} from 'react'
import SignupScreen from './signup'
import LoginScreen from './login'
import {serverURL} from '../../../config/config'
import { withRouter, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import {setLoggedIn} from '../../actions/account'


const SignupForm = (props)=>{
    const [isSignup,setSignup] = useState(true) 
    const [accountName, setAccountName]= useState("")
    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")
    let url = `${serverURL}/account`
    const submission = async (event)=>{
        try{
            event.preventDefault()
            let body = {
                accountName,
                email,
                password
            }
            if(!isSignup){
                url = `${serverURL}/account/login`
            }
            const result = await fetch(url,{
                method:'POST',
                mode:'cors',
                body:JSON.stringify(body),
                headers:{
                    'Content-Type': 'application/json'
                },
                referrerPolicy: 'no-referrer'
            })
            // if there was a problem signing up
            if(result.status!==201){
                return alert("Cannot Sign up! Please try again with different values!")
            }
            const account = await result.json()
            // store the token in session storage
            sessionStorage.setItem('jwt',account.jwtToken)
            // set status to logged in and redirect to the home page logged in
            props.setLoggedIn()
            props.history.push('/')
        }catch(error){
        console.log(error)
        }
    }
    return(
        <div className='container' id="signup-form-container">
            <form className='sign-up' onSubmit={submission}>
                <div className='container social-media-login' align='center'>
                    <button name='sign-up' type="button" className="btn btn-light" onClick={()=>{
                        setSignup(true)}
                    }>
                        Sign Up
                    </button>
                    <button name='login' type="button" className="btn btn-light" onClick={()=>{
                        setSignup(false)
                    }}>
                        Log In
                    </button>
                    {
                        isSignup? 
                        <SignupScreen 
                            setAccountName={setAccountName}
                            setEmail={setEmail}
                            setPassword={setPassword}
                        />
                        :
                        <LoginScreen 
                            setEmail={setEmail}
                            setPassword={setPassword}
                        />
                    }
                </div>
            </form>
        </div>
    )
}


const mapDispatchToProps = (dispatch,props)=>({
    setLoggedIn:()=>dispatch(setLoggedIn())
})

// call to connect that pulls it all together
export default connect(undefined,mapDispatchToProps)(withRouter(SignupForm));