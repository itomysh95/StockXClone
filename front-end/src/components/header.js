import {NavLink,Link} from 'react-router-dom'
import React from 'react'
import { connect } from 'react-redux'


// top navbar
const Header= (props)=>( 
    <div>
        <div className="navbar navbar-expand-lg">
                <Link className="navbar-brand mr-auto" to='/'>
                    <img src={'/images/StockXLogo.png'} width="150" height="80"/>
                </Link>
                <Link to='/create'>Browse</Link>
                <NavLink to='/help' exact={true} activeClassName="is-active" >News</NavLink>
                <NavLink to='/help' exact={true} activeClassName="is-active" >App</NavLink>
                <NavLink to='/help' exact={true} activeClassName="is-active" >Portfolio</NavLink>
                <NavLink to='/help' exact={true} activeClassName="is-active" >About</NavLink>
                <NavLink to='/help' exact={true} activeClassName="is-active" >Help</NavLink>
                { props.loggedIn?<Link to='/' >LogOut</Link>
                    :
                    <div>
                        <Link to='/signup' >Login</Link>
                        <Link to='/signup' >SignUp</Link>
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