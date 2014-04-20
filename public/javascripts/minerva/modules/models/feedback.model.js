angular.module('minerva.models')

  .factory('Feedback', function ($http) {

    return {
      all: function () {
        return $http.get('/api/feedback').then(function (response) {
          return response.data
        })
      }
    }
  });
