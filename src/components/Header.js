import {NavLink,Link} from 'react-router-dom'
import React from 'react'


// top navbar
const Header= ()=>( 
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
                <NavLink to='/help' exact={true} activeClassName="is-active" >Login</NavLink>
                <NavLink to='/help' exact={true} activeClassName="is-active" >Sign Up</NavLink>
                <NavLink to='/help' exact={true} activeClassName="is-active" >Sell</NavLink>
        </div>
    </div>
)

export default Header;