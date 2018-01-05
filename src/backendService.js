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
        localStorage.removeItem('ibc-admin-token');
        window.location.reload();
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
        let logedIn = localStorage.getItem('ibc-user-token') || localStorage.getItem('ibc-admin-token');
        return logedIn;
    }

    static checkUsername(name) {
        return fetch(`${baseUrl}/api/register/check-username`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name })
        })
            .then(checkStatus)
            .then(convertResponseToJson)
    }

    static register(user) {
        return fetch(`${baseUrl}/api/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(checkStatus)
            .then(convertResponseToJson)
    }

    static login(name, password) {
        return fetch(`${baseUrl}/api/authenticate`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, password })
        })
            .then(checkStatus)
            .then(convertResponseToJson)
            .then((json) => localStorage.setItem('ibc-user-token', json.token));
    }

    static adminLogin(name, password) {
        return fetch(`${baseUrl}/admin/authenticate`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, password })
        })
            .then(checkStatus)
            .then(convertResponseToJson)
            .then((json) => localStorage.setItem('ibc-admin-token', json.token));
    }

    static logout() {
        localStorage.removeItem('ibc-user-token');
    }

    static adminLogout() {
        localStorage.removeItem('ibc-admin-token');
    }

    // ====================
    // admin accounts endpoints
    // ====================

    static getAccounts() {
        return fetch(`${baseUrl}/admin/accounts`, {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('ibc-admin-token')
            },
        })
            .then(checkStatus)
            .then(convertResponseToJson);
    }

    static updateAccount(id, account) {
        return fetch(`${baseUrl}/admin/accounts/${id}`, {
            method: 'PATCH',
            headers: {
                'x-access-token': localStorage.getItem('ibc-admin-token'),
                'content-type': 'application/json'
            },
            body: JSON.stringify(account)
        })
            .then(checkStatus)
            .then(convertResponseToJson);
    }

    static acceptAccount(id, company_type) {
        return fetch(`${baseUrl}/admin/accounts/${id}/accept`, {
            method: 'PATCH',
            headers: {
                'x-access-token': localStorage.getItem('ibc-admin-token'),
                'content-type': 'application/json'
            },
            body: JSON.stringify({ company_type })
        })
            .then(checkStatus)
            .then(convertResponseToJson);
    }

    static declineAccount(id) {
        return fetch(`${baseUrl}/admin/accounts/${id}/decline`, {
            method: 'PATCH',
            headers: {
                'x-access-token': localStorage.getItem('ibc-admin-token')
            },
        })
            .then(checkStatus)
            .then(convertResponseToJson);
    }

    static deleteAccount(id) {
        return fetch(`${baseUrl}/admin/accounts/${id}`, {
            method: 'DELETE',
            headers: {
                'x-access-token': localStorage.getItem('ibc-admin-token')
            }
        })
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

    static createCompany(company) {
        return fetch(`${baseUrl}/api/companies`, {
            method: 'POST',
            headers: {
                'x-access-token': localStorage.getItem('ibc-user-token'),
                'content-type': 'application/json'
            },
            body: JSON.stringify(company)
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
            body: JSON.stringify(company)
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

    // ===================
    // Recruiter endpoints
    // ===================

    static getRecruiters() {
        return fetch(`${baseUrl}/api/recruiters`, {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('ibc-user-token')
            },
        })
            .then(checkStatus)
            .then(convertResponseToJson);
    }

    static getRecruiterById(id) {
        return fetch(`${baseUrl}/api/recruiters/${id}`, {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('ibc-user-token')
            },
        })
            .then(checkStatus)
            .then(convertResponseToJson);
    }

    static createRecruiter(recruiter) {
        return fetch(`${baseUrl}/api/recruiters`, {
            method: 'POST',
            headers: {
                'x-access-token': localStorage.getItem('ibc-user-token'),
                'content-type': 'application/json'
            },
            body: JSON.stringify(recruiter)
        })
            .then(checkStatus)
            .then(convertResponseToJson);
    }

    static updateRecruiter(id, recruiter) {
        return fetch(`${baseUrl}/api/recruiters/${id}`, {
            method: 'PUT',
            headers: {
                'x-access-token': localStorage.getItem('ibc-user-token'),
                'content-type': 'application/json'
            },
            body: JSON.stringify(recruiter)
        })
            .then(checkStatus)
            .then(convertResponseToJson);
    }

    static deleteRecruiter(id) {
        return fetch(`${baseUrl}/api/recruiters/${id}`, {
            method: 'DELETE',
            headers: {
                'x-access-token': localStorage.getItem('ibc-user-token')
            }
        })
    }

    // =================
    // Posting endpoints
    // =================

    static getPostings(filters) {
        let url = filters ? `${baseUrl}/api/postings?${filters}` : `${baseUrl}/api/postings`;
        return fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('ibc-user-token')
            },
        })
            .then(checkStatus)
            .then(convertResponseToJson);
    }

    static getPostingById(id) {
        return fetch(`${baseUrl}/api/postings/${id}`, {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('ibc-user-token')
            },
        })
            .then(checkStatus)
            .then(convertResponseToJson);
    }

    static createPosting(posting) {
        return fetch(`${baseUrl}/api/postings`, {
            method: 'POST',
            headers: {
                'x-access-token': localStorage.getItem('ibc-user-token'),
                'content-type': 'application/json'
            },
            body: JSON.stringify(posting)
        })
            .then(checkStatus)
            .then(convertResponseToJson);
    }

    static updatePosting(id, posting) {
        return fetch(`${baseUrl}/api/postings/${id}`, {
            method: 'PUT',
            headers: {
                'x-access-token': localStorage.getItem('ibc-user-token'),
                'content-type': 'application/json'
            },
            body: JSON.stringify(posting)
        })
            .then(checkStatus)
            .then(convertResponseToJson);
    }

    static deletePosting(id) {
        return fetch(`${baseUrl}/api/postings/${id}`, {
            method: 'DELETE',
            headers: {
                'x-access-token': localStorage.getItem('ibc-user-token')
            }
        })
    }

    // =================
    // Profile endpoints
    // =================

    static getProfile() {
        return fetch(`${baseUrl}/api/account`, {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('ibc-user-token')
            },
        })
            .then(checkStatus)
            .then(convertResponseToJson);
    }

    static updateProfile(profile) {
        return fetch(`${baseUrl}/api/account`, {
            method: 'PATCH',
            headers: {
                'x-access-token': localStorage.getItem('ibc-user-token'),
                'content-type': 'application/json'
            },
            body: JSON.stringify(profile)
        })
            .then(checkStatus)
            .then(convertResponseToJson);
    }

    static updatePassword(oldPassword, newPassword) {
        return fetch(`${baseUrl}/api/account/password`, {
            method: 'PATCH',
            headers: {
                'x-access-token': localStorage.getItem('ibc-user-token'),
                'content-type': 'application/json'
            },
            body: JSON.stringify({ oldPassword, newPassword })
        })
            .then(checkStatus)
            .then(convertResponseToJson);
    }

}

export default BackendService
