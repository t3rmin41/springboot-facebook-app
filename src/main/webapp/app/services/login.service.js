(function() {
  'use strict';

  angular
    .module('app')
    .factory('LoginService', LoginService);
  
  LoginService.$inject = ['$http', '$location'];
  
  function LoginService($http, $location) {

    var service = {};

    service.login = login;
    service.loginFacebook = loginFacebook;
    service.loginGoogle = loginGoogle;
    service.logout = logout;
    service.loginSuccessful = loginSuccessful;

    function login(credentials, success, error) {
      $http({
        url: '/users/login',
        method: 'POST',
        data: credentials,
        headers : {
          "Content-Type" : "application/json;charset=UTF-8"
        }
      }).success(success).error(error);
    }
    
    function loginFacebook(success, error) {
      $http({
        url: '/facebooklogin',
        method: 'POST',
        data: {scope: "public_profile"},
      }).success(success).error(error);
    }
    
    function loginGoogle(success, error) {
    $http({
      url: '/googlelogin',
      method: 'GET',
    }).success(success).error(error);
  }
    
    function loginSuccessful(success, error) {
      $http({
        url: '/users/login/success',
        method: 'POST',
        headers : {
          "Content-Type" : "application/json;charset=UTF-8",
          "Accept" : "application/json;charset=UTF-8"
        }
      }).success(success).error(error);
    }
    
    function logout(callback) {
      $http.post('/users/logout').success(callback).error(callback);
    }
    
    return service;
  }
  
})();