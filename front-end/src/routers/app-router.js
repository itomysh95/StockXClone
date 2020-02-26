import React from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom'
<<<<<<< HEAD
import DashboardPage from '../components/dashboard-page';
import HelpPage from '../components/help-page';
import NotFoundPage from '../components/not-found-page';
import Header from '../components/header'
=======
import DashboardPage from '../components/DashboardPage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header'
>>>>>>> 2411ca756a1a655b2b54cd94da58e147b6afe002

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