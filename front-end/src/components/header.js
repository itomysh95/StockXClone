import {NavLink,Link} from 'react-router-dom'
import React from 'react'
import { connect } from 'react-redux'


// top navbar
const Header= (props)=>( 
    <div>
        <div className="navbar navbar-expand-lg">
                <Link className="navbar-brand mr-auto" to='/' exact={true}>
                    <img src={'/images/StockXLogo.png'} width="150" height="80"/>
                </Link>
                <NavLink to='/create' exact={true}  activeClassName="is-active" >Browse</NavLink>
                <NavLink to='/help' exact={true} activeClassName="is-active" >News</NavLink>
                <NavLink to='/help' exact={true} activeClassName="is-active" >App</NavLink>
                <NavLink to='/help' exact={true} activeClassName="is-active" >Portfolio</NavLink>
                <NavLink to='/help' exact={true} activeClassName="is-active" >About</NavLink>
                <NavLink to='/help' exact={true} activeClassName="is-active" >Help</NavLink>
                { props.loggedIn?<Link to='/' exact={true} >LogOut</Link>
                    :
                    <div>
                        <Link to='/signup' exact={true} >Login</Link>
                        <Link to='/signup' exact={true} >SignUp</Link>
                    </div>
                }
                <NavLink to='/help' exact={true} activeClassName="is-active" >Sell</NavLink>
        </div>
    </div>
)

const mapStateToProps = (state)=>{
    // return what information from the store we want our component to be able
    // to access
    return{
        loggedIn:state.account.loggedIn
    }
}

const mapDispatchToProps = (dispatch,props)=>({
    setLogOut:()=>dispatch(setLoggedOut())
})

export default connect(mapStateToProps,mapDispatchToProps)(Header);