import React from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom'
import DashboardPage from '../components/dashboard-page';
import HelpPage from '../components/help-page';
import NotFoundPage from '../components/not-found-page';
import Header from '../components/header'
import SignupPage from '../components/signup-page/signup-page';
import ItemPage from '../components/item-page/item-page'
import BuySellPage from '../components/buy-sell-page/buy-sell-page'

const AppRouter = ()=>(
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={DashboardPage} exact={true} />
                <Route path="/help" component={HelpPage} />
                <Route path="/signup" component ={SignupPage} />
                <Route path="/login" component = {SignupPage} />
                <Route path={`/item/sneaker/:name`} exact={true} component={ItemPage} />
                <Route path={`/item/buy/:name`} exact={true} render={(props)=><BuySellPage {...props} buy={true} />} />
                <Route path={`/item/sell/:name`} exact={true} render={(props)=><BuySellPage {...props} buy={false} />}/>
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter;