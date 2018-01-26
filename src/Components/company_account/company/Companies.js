import React, { Component } from 'react';
import backendService from '../../../backendService';
import Header from "../Header";
import CompanyListItem from "./CompanyListItem";
import { toast } from "react-toastify";

class Companies extends Component {
    handleDelete = (companyId) => {
        backendService.deleteCompany(companyId)
            .then(() => this.setState({ companies: this.state.companies.filter(company => company.id !== companyId) }))
            .then(() => toast('Unternehmen erfolgreich gelöscht', { type: 'success' }))
            .catch(() => toast('Es ist ein Fehler aufgetreten', { type: 'error' }));
    };

    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            loading: true
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        backendService.getCompanies()
            .then((companies) => this.setState({ companies, loading: false }));
    }

    render() {
        return (
            <div>
                <Header history={this.props.history}/>

                <div className={'headline'}>
                    <h1>Ihre Unternehmen</h1>
                </div>
                <p className={'description'}>
                    Legen Sie Ihre Tochterunternehmen an und erstellen Sie Stellenanzeigen für Ihre
                    Tochterunternehmen.
                </p>
                <div className={'create-button'}>
                    <button className={'btn btn-primary'}
                            onClick={() => this.props.history.push('/company/companies/create')}>
                        Neues Unternehmen erstellen
                    </button>
                </div>
                <div className={'container'}>
                    {this.state.loading
                        ? <div className={'loader'}/>
                        : <table className={'table table-hover'}>
                            <thead>
                            <tr>
                                <th>Unternehmensname</th>
                                <th>Aktionen</th>
                                <th>Stellenanzeigen aktiv</th>
                                <th>gesamt</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.companies.map((company) =>
                                <CompanyListItem key={company.id}
                                                 company={company}
                                                 history={this.props.history}
                                                 delete={this.handleDelete}/>
                            )}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        );
    }
}

export default Companies;
