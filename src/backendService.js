import 'whatwg-fetch'

//
// BackendService - Fetch Helpers
//
const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    if (response.status === 403) {
        localStorage.removeItem('ibc-user-token');
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
};

const convertResponseToJson = (response) => response.json();

// const baseUrl = process.env.NODE_ENV === 'development'
//   ? 'http://localhost:9090/api/'
//   : 'https://indoornav.cfapps.io/api/'

const baseUrl = 'http://localhost:9090';

//
// BackendService
//
class BackendService {
    //
    // DATABASE ENDPOINTS
    //

    static isAuthenticated() {
        return localStorage.getItem('ibc-user-token');
    }

    static login(email, password) {
        return fetch(`${baseUrl}/api/authenticate`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name: email, password: password })
        })
            .then(checkStatus)
            .then(convertResponseToJson)
            .then((json) => localStorage.setItem('ibc-user-token', json.token));
    }

    static logout() {
        localStorage.removeItem('ibc-user-token');
    }

    // =================
    // Company endpoints
    // =================

    static getCompanies() {
        return fetch(`${baseUrl}/api/companies`, {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('ibc-user-token')
            },
        })
            .then(checkStatus)
            .then(convertResponseToJson);
    }

    static getCompanyById(id) {
        return fetch(`${baseUrl}/api/companies/${id}`, {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('ibc-user-token')
            },
        })
            .then(checkStatus)
            .then(convertResponseToJson);
    }

    static createCompany(name, address) {
        return fetch(`${baseUrl}/api/companies`, {
            method: 'POST',
            headers: {
                'x-access-token': localStorage.getItem('ibc-user-token'),
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name: name, address: address })
        })
            .then(checkStatus)
            .then(convertResponseToJson);
    }

    static updateCompany(id, company) {
        return fetch(`${baseUrl}/api/companies/${id}`, {
            method: 'PUT',
            headers: {
                'x-access-token': localStorage.getItem('ibc-user-token'),
                'content-type': 'application/json'
            },
            body: JSON.stringify({ company })
        })
            .then(checkStatus)
            .then(convertResponseToJson);
    }

    static deleteCompany(id) {
        return fetch(`${baseUrl}/api/companies/${id}`, {
            method: 'DELETE',
            headers: {
                'x-access-token': localStorage.getItem('ibc-user-token')
            }
        })
    }
}

export default BackendService
