import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './HomePage';
import Login from './Login';
import Companies from './company/Companies';
import Company from './company/Company';
import CompanyCreate from './company/CompanyCreate';
import backendService from '../backendService';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                {!backendService.isAuthenticated() ? (
                    <Switch>
                        <Route exact path={'/login'} component={Login}/>
                        <Redirect to={'/login'}/>
                    </Switch>
                ) : (
                    <Switch>
                        <Redirect exact from={'/'} to="/home"/>
                        <Redirect exact from={'/login'} to="/home"/>
                        <Route exact path={'/home'} component={HomePage}/>
                        <Route exact path={'/companies'} component={Companies}/>
                        <Route exact path={'/companies/create'} component={CompanyCreate}/>
                        <Route exact path={'/companies/:id'} component={Company}/>
                        <Route exact path={'/recruiters'}/>
                        <Route exact path={'/recruiters/:id'}/>
                        <Route exact path={'/postings'}/>
                        <Route exact path={'/postings/:id'}/>
                    </Switch>
                )}

            </div>
        )
    }
}

export default App;
