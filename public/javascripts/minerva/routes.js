angular.module('minerva')

  .config(function ($stateProvider) {
    $stateProvider.state('home', {
      url: '',
      views: {
        'home': { templateUrl: 'partials/home.html' }
      }
    });
  });