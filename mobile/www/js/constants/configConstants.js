(function () {
  angular.module('starter.constants', [])
  //.constant('API_CLIENT_AUTH', 'http://localhost:8080/api/')
    .constant('API_CLIENT_AUTH', 'http://auth.okeefe.com.ar/api/')
    //.constant('API_SEARCH', 'http://localhost:3000/api/v1/')
    //.constant('API_SEARCH', 'http://localhost:8080/Lyncros/API-busqueda/public/api/v1/')
    .constant('API_SEARCH', 'http://search.okeefe.com.ar/api/v1/')
    .constant('API_JOB_APPLICATION', 'http://search.okeefe.com.ar/api/v1/jobApplication')
    //.constant('API_JOB_APPLICATION', 'http://localhost:8080/Lyncros/API-busqueda/public/jobApplication')
    .constant('SITE_URL', 'http://m.okeefe.com.ar/#!/')
    //.constant('SITE_URL', 'http://localhost:8100/#!/')
    .constant('API_CONF', {host: 'http://auth.okeefe.com.ar/api/'})
    .constant('API_OKEEFE', 'http://crm.okeefe.com.ar/api/v1/external-source/contacts');
})();
