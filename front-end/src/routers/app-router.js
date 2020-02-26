import React from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom'
import DashboardPage from '../components/dashboard-page';
import HelpPage from '../components/help-page';
import NotFoundPage from '../components/not-found-page';
import Header from '../components/header'


const AppRouter = ()=>(
    <BrowserRouter>
        <div>
            <Header />
        <Switch>
            <Route path="/" component={DashboardPage} exact={true}/>
            <Route path="/help" component={HelpPage}/>
            <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter;