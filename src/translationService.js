//
// BackendService
//
class TranslationService {
    static companyType(key) {
        let dictionary = {
            ibc: 'IBC Unternehmen',
            startup: 'Startup',
            ngo: 'Verein'
        };
        if (key) {
            return dictionary[key];
        }
        return dictionary;
    }

    static registrationStatus(key) {
        let dictionary = {
            accepted: 'Angenommen',
            declined: 'Abgelehnt',
            registered: 'Registriert'
        };
        if (key) {
            return dictionary[key];
        }
        return dictionary;
    }

    static numberOfEmployees(key) {
        let dictionary = {
            0: 'Bis 10',
            1: '11 - 50',
            2: '51 - 100',
            3: '101 - 500',
            4: '501 - 1000',
            5: 'Über 1001'
        };
        if (key) {
            return dictionary[key];
        }
        return dictionary;
    }

    static contractDuration(key) {
        let dictionary = {
            to3: 'Befristet, bis zu 3 Monate',
            3: 'Befristet, 3 bis 6 Monate',
            6: 'Befristet, 6 Monate',
            12: 'Befristet, 12 Monate',
            indefinite: 'Unbefristet'
        };
        if (key) {
            return dictionary[key];
        }
        return dictionary;
    }

    static contractType(key) {
        let dictionary = {
            Direkteinstieg: 'Direkteinstieg',
            Werkstudent: 'Werkstudent',
            Praktikant: 'Praktikant',
            Trainee: 'Trainee',
            Volontariat: 'Volontariat'
        };
        if (key) {
            return dictionary[key];
        }
        return dictionary;
    }

    static entryLevel(key) {
        let dictionary = {
            Studenten: 'Studenten',
            Masteranden: 'Masteranden',
            Bacheloranden: 'Bacheloranden',
            Absolventen: 'Absolventen'
        };
        if (key) {
            return dictionary[key];
        }
        return dictionary;
    }

    static postingStatus(key) {
        let dictionary = {
            active: 'Aktiv',
            deactivated: 'Deaktiviert'
        };
        if (key) {
            return dictionary[key];
        }
        return dictionary;
    }

    static fieldOfEmployment(key) {
        let dictionary = {
            design: 'Grafik & Design',
            video: 'Video & Audio',
            itDev: 'IT & Softwareentwicklung',
            itMan: 'IT (Projekt) Management',
            prodDev: 'Digitale Produktentwicklung & Produktmanagement',
            marketing: 'Digitales Marketing',
            innovation: 'Digitale Innovation & Neue Medien',
            transformation: 'Transformation & Digitalisierung',
            sales: 'Digital Sales',
            else: 'Sonstiges'
        };
        if (key) {
            return dictionary[key];
        }
        return dictionary;
    }

    static startOfEmployment(key) {
        let dictionary = {
            'Nach Vereinbarung': 'Nach Vereinbarung',
            'Ab Sofort': 'Ab Sofort'
        };
        if (key) {
            return dictionary[key] || `Ab ${new Date(key).toLocaleDateString('de-DE')}`;
        }
        return dictionary;
    }
}

export default TranslationService;
