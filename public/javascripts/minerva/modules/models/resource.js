angular.module('minerva.models')

  .factory('Resource', function ($http) {
    var Resource = function (api) {
      this.url = api ? api.protocol + '://' + api.host + api.path : '';
      this.filters = {};
      this.headers = {};
      this.selection = [];
    };

    Resource.prototype.where = function (filter) {
      this.filters = Object.create(filter);
      return this;
    };

    Resource.prototype.select = function (selection) {
      this.selection = selection.slice(0);
      return this;
    };

    Resource.prototype.header = function (header, value) {
      this.headers[header] = value;
      return this;
    };

    Resource.prototype.get = function () {
      return $http.get(this.url, { params: this.filters, headers: this.headers });
    };

    Resource.prototype.post = function () {
      return $http.post(this.url, this.filters, { headers: this.headers });
    };

    return Resource;
  });

  // resource.select([ 'name', 'email' ]).where({ name: 'diego' }).get()
  // GET http://endpoint/resource?selection=name&selection=email&filters=name:diego&filters=email:drborges@company.com