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
import AdminProfile from './admin_account/profile/Profile';

import Accounts from './admin_account/accounts/Accounts';
import Registrations from './admin_account/accounts/Registrations';

import PublicPostings from './student_account/postings/PublicPostings'
import PublicPosting from './student_account/postings/PublicPosting'

import PublicCompany from './student_account/company/PublicCompany'

import backendService from '../backendService';
import Footer from "./company_account/Footer";
import FAQ from "./commons/FAQ";
import Impressum from "./commons/Impressum";
import Privacy from "./commons/Privacy";
import Analytics from "./admin_account/accounts/Analytics";

class App extends Component {

    render() {
        return (
            <div>
            <div className={'cont'}>
                <Notification/>
                {!backendService.isAuthenticated() ?
                    <Switch>
                        <Route exact path={'/'} component={PublicPostings}/>
                        <Route exact path={'/postings/:id'} component={PublicPosting}/>
                        <Route exact path={'/companies/:id'} component={PublicCompany}/>
                        <Route exact path={'/faq'} component={FAQ}/>
                        <Route exact path={'/impressum'} component={Impressum}/>
                        <Route exact path={'/privacy'} component={Privacy}/>
                        <Route exact path={'/company/login'} component={Login}/>
                        <Route exact path={'/admin/login'} component={AdminLogin}/>
                        <Redirect from={'/admin'} to={'/admin/login'}/>
                        <Redirect from={'/company'} to={'/company/login'}/>
                        <Redirect to={'/'} />
                    </Switch>
                    :
                    <Switch>
                        <Route exact path={'/'} component={PublicPostings}/>
                        <Route exact path={'/postings/:id'} component={PublicPosting}/>
                        <Route exact path={'/companies/:id'} component={PublicCompany}/>
                        <Route exact path={'/faq'} component={FAQ}/>
                        <Route exact path={'/impressum'} component={Impressum}/>
                        <Route exact path={'/privacy'} component={Privacy}/>
                        <Redirect exact from={'/company/login'} to="/company/home"/>
                        <Route exact path={'/company/home'} component={HomePage}/>
                        <Route exact path={'/company/companies'} component={Companies}/>
                        <Route exact path={'/company/companies/:id'} component={Company}/>
                        <Route exact path={'/company/companies/:id/preview'}
                               render={(routeProps) => (
                                   <Company {...routeProps} preview/>
                               )}/>
                        <Route exact path={'/company/recruiters'} component={Recruiters}/>
                        <Route exact path={'/company/recruiters/:id'} component={Recruiter}/>
                        <Route exact path={'/company/recruiters/:id/preview'}
                               render={(routeProps) => (
                                   <Recruiter {...routeProps} preview/>
                               )}/>
                        <Route exact path={'/company/postings'} component={Postings}/>
                        <Route exact path={'/company/postings/:id'} component={Posting}/>
                        <Route exact path={'/company/postings/:id/preview'}
                               render={(routeProps) => (
                                   <Posting {...routeProps} preview/>
                               )}/>
                        <Route exact path={'/company/profile/'} component={Profile}/>
                        <Route exact path={'/admin/registrations'} component={Registrations}/>
                        <Route exact path={'/admin/accounts'} component={Accounts}/>
                        <Route exact path={'/admin/analytics'} component={Analytics}/>
                        <Route exact path={'/admin/profile/'} component={AdminProfile}/>
                        <Redirect from={'/admin'} to={'/admin/accounts'}/>
                        <Redirect to={'/'}/>
                    </Switch>
                }
                
            </div>
            <Footer/>
            </div>
        )
    }
}

export default App;
