//
// BackendService
//
class TranslationService {
    static translateCompanyType(key) {
        let companyTypes = {
            ibc: 'IBC Unternehmen',
            startup: 'Startup',
            ngo: 'Verein'
        };
        return companyTypes[key];
    }

    static translateRegistrationStatus(key) {
        let registrationStatus = {
            accepted: 'Angenommen',
            declined: 'Abgelehnt',
            registered: 'Registriert'
        };
        return registrationStatus[key];
    }
}

export default TranslationService;
