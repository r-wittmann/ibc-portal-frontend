import React, { Component } from 'react';
import backendService from '../../../backendService';
import Header from "../Header";
import AnalyticsListItem from "./AnalyticsListItem";

class Analytics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accounts: []
        };
    }

    componentDidMount() {
        backendService.getAnalytics()
            .then((accounts) => this.setState({ accounts }));
    }

    render() {
        return (
            <div>
                <Header history={this.props.history}/>

                <div className={'headline'}>
                    <h1>Account Analytics</h1>
                </div>
                <div className={'container'}>
                <p>
                    <a className={'nav-link'}
                       href={'https://analytics.google.com/analytics/web/#embed/report-home/a71308674w167653651p167860407/'}
                       target={'_blank'}>
                        Google Analytics
                    </a>
                </p>
                    <table className={'table table-hover'}>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Anzahl Unternehmen</th>
                            <th>Anzahl Recruiter</th>
                            <th>Anzahl Postings</th>
                            <th>Aktive Postings</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.accounts && this.state.accounts.map((account) =>
                            <AnalyticsListItem key={account.id}
                                               account={account}
                                               history={this.props.history}/>
                        )}
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }
}

export default Analytics;
