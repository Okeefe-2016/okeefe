(function () {
    angular.module('okeefeSite.constants', [])
        //.constant('API_CLIENT_AUTH', 'http://localhost:8888/api/')
        .constant('API_CLIENT_AUTH', 'http://auth.okeefe.com.ar/api/')
        //.constant('API_SEARCH', 'http://localhost:8888/Lyncros/API-busqueda/public/api/v1/')
        .constant('API_SEARCH', 'http://search.okeefe.com.ar/api/v1/')
        .constant('API_JOB_APPLICATION', 'http://search.okeefe.com.ar/api/v1/jobApplication')
        //.constant('API_JOB_APPLICATION', 'http://localhost:8888/Lyncros/API-busqueda/public/jobApplication')
        .constant('SITE_URL', 'http://sitio.okeefe.com.ar/#!/')
        //.constant('SITE_URL', 'http://localhost:8888/Lyncros/okeefe/#!/')
        .constant('API_OKEEFE', 'http://crm.okeefe.com.ar/api/v1/external-source/contacts');
})();