angular.module('minerva')
  .config(function ($stateProvider) {
    $stateProvider.state("home", {
      url: '',
      views: {
        'timeline': { templateUrl: 'templates/timeline.html' },
        'composer': { templateUrl: 'templates/composer.html' },
        'summary': { templateUrl: 'templates/summary.html' }
      }
    });
  });