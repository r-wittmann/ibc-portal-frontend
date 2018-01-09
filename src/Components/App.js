import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Notification from './commons/Notification';

import HomePage from './company_account/HomePage';

import Login from './company_account/loginSignUp/Login';
import AdminLogin from './admin_account/AdminLogin';

import Companies from './company_account/company/Companies';
import Company from './company_account/company/Company';

import Recruiters from "./company_account/recruiter/Recruiters";
import Recruiter from "./company_account/recruiter/Recruiter";

import Postings from "./company_account/postings/Postings";
import Posting from "./company_account/postings/Posting";

import Profile from "./company_account/profile/Profile";

import Accounts from './admin_account/accounts/Accounts';
import Registrations from './admin_account/accounts/Registrations';

import PublicPostings from './student_account/postings/PublicPostings'
import PublicPosting from './student_account/postings/PublicPosting'

import PublicCompany from './student_account/company/PublicCompany'

import backendService from '../backendService';

class App extends Component {

    render() {
        return (
            <div>
                <Notification/>
                {!backendService.isAuthenticated() ?
                    <Switch>
                        <Route exact path={'/public/postings'} component={PublicPostings}/>
                        <Route exact path={'/public/postings/:id'} component={PublicPosting}/>
                        <Route exact path={'/public/companies/:id'} component={PublicCompany}/>
                        <Route exact path={'/login'} component={Login}/>
                        <Route exact path={'/admin/login'} component={AdminLogin}/>
                        <Redirect from={'/admin'} to={'/admin/login'}/>
                        <Redirect to={'/login'}/>
                    </Switch>
                    :
                    <Switch>
                        <Route exact path={'/public/postings'} component={PublicPostings}/>
                        <Route exact path={'/public/postings/:id'} component={PublicPosting}/>
                        <Route exact path={'/public/companies/:id'} component={PublicCompany}/>
                        <Redirect exact from={'/'} to="/home"/>
                        <Redirect exact from={'/login'} to="/home"/>
                        <Route exact path={'/home'} component={HomePage}/>
                        <Route exact path={'/companies'} component={Companies}/>
                        <Route exact path={'/companies/:id'} component={Company}/>
                        <Route exact path={'/companies/:id/preview'}
                               render={(routeProps) => (
                                   <Company {...routeProps} preview/>
                               )}/>
                        <Route exact path={'/recruiters'} component={Recruiters}/>
                        <Route exact path={'/recruiters/:id'} component={Recruiter}/>
                        <Route exact path={'/recruiters/:id/preview'}
                               render={(routeProps) => (
                                   <Recruiter {...routeProps} preview/>
                               )}/>
                        <Route exact path={'/postings'} component={Postings}/>
                        <Route exact path={'/postings/:id'} component={Posting}/>
                        <Route exact path={'/postings/:id/preview'}
                               render={(routeProps) => (
                                   <Posting {...routeProps} preview/>
                               )}/>
                        <Route exact path={'/profile/'} component={Profile}/>
                        <Route exact path={'/admin/registrations'} component={Registrations}/>
                        <Route exact path={'/admin/accounts'} component={Accounts}/>
                        <Redirect from={'/admin'} to={'/admin/accounts'}/>
                        <Redirect to={'/home'}/>
                    </Switch>
                }
            </div>
        )
    }
}

export default App;
