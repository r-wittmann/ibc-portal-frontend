import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';

import Login from './loginSignUp/Login';
import AdminLogin from './loginSignUp/AdminLogin';

import Companies from './company/Companies';
import Company from './company/Company';

import Recruiters from "./recruiter/Recruiters";
import Recruiter from "./recruiter/Recruiter";

import Postings from "./postings/Postings";
import Posting from "./postings/Posting";

import Users from './users/Users';
import User from './users/User';

import backendService from '../backendService';

class App extends Component {

    render() {
        return (
            !backendService.isAuthenticated() ? (
                <Switch>
                    <Route exact path={'/login'} component={Login}/>
                    <Route exact path={'/admin/login'} component={AdminLogin}/>
                    <Redirect to={'/login'}/>
                </Switch>
            ) : (
                <Switch>
                    <Redirect exact from={'/'} to="/home"/>
                    <Redirect exact from={'/login'} to="/home"/>
                    <Route exact path={'/home'} component={HomePage}/>
                    <Route exact path={'/companies'} component={Companies}/>
                    <Route exact path={'/companies/:id'} component={Company}/>
                    <Route exact path={'/recruiters'} component={Recruiters}/>
                    <Route exact path={'/recruiters/:id'} component={Recruiter}/>
                    <Route exact path={'/postings'} component={Postings}/>
                    <Route exact path={'/postings/:id'} component={Posting}/>
                    <Route exact path={'/admin/users'} component={Users}/>
                    <Route exact path={'/admin/users/:id'} component={User}/>
                </Switch>
            )
        )
    }
}

export default App;
