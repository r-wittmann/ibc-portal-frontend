import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import HomePage from './company_account/HomePage';

import Login from './company_account/loginSignUp/Login';
import AdminLogin from './company_account/loginSignUp/AdminLogin';

import Companies from './company_account/company/Companies';
import Company from './company_account/company/Company';

import Recruiters from "./company_account/recruiter/Recruiters";
import Recruiter from "./company_account/recruiter/Recruiter";

import Postings from "./company_account/postings/Postings";
import Posting from "./company_account/postings/Posting";

import Users from './admin_account/users/Users';
import User from './admin_account/users/User';

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
