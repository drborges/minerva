angular.module('minerva.models')

  .factory('ModelQuery', function ($http) {
    var ModelQuery = function (api) {
      this.url = api ? api.protocol + '://' + api.host + api.path : '';
      this.filters = [];
    };

    var buildQueryParameters = function (filters) {
      var queryParams = filters.map(function (filter) {
        var queryParam = Object.keys(filter).map(function (key) {
          return key + '=' + filter[key];
        });

        return queryParam;
      });
      return [].concat.apply([], queryParams).join('&');
    };

    ModelQuery.prototype.where = function (filter) {
      this.filters.push(Object.create(filter));
      return this;
    };

    ModelQuery.prototype.query = function () {
      var params = buildQueryParameters(this.filters);
      $http.get(this.url, { data: params });
    };

    return ModelQuery;
  });