describe ('minerva.models', function () {
  var Resource, $http

  beforeEach(module('minerva.models'))
  beforeEach(inject(function (_Resource_, _$http_) {
    Resource = _Resource_
    $http = _$http_
  }))

  describe('Resource', function () {

    describe('#where', function () {
      it ('adds a new criterion to the filters list', function () {
        var resource = new Resource().where({
          author: 'username',
          email: 'username@company.com'
        })

        expect(resource.filters).to.deep.equal({
          author: 'username',
          email: 'username@company.com'
        })
      })

      it ('adds filters by value rather than by reference', function () {
        var filter = { author: 'username', email: 'username@company.com' }
          , resource = new Resource().where(filter)

        expect(resource.filters).to.not.equal(filter)
      })

      it ('returns the same instance of Resource when adding filters', function () {
        var resource = new Resource()
          , filteredResource = resource.where({ filter: 'value' })

        expect(filteredResource).to.equal(resource)
      })
    })

    describe('#headers', function () {
      it ('adds headers to request', function () {
        $http.get = sinon.spy()

        var resource = new Resource({
          protocol: 'http',
          host: 'api.company.com',
          path: '/v1/users'
        })

        resource.header('Content-Type', 'application/json')

        expect(resource.headers).to.deep.equal({ 'Content-Type': 'application/json' })
      })
    })

    describe('#select', function () {
      it ('selects resource fields to be returned in a get/query operations', function () {
        var resource = new Resource()
          , fieldsList = [ 'field1', 'field2.nestedField' ]

        resource.select(fieldsList)

        expect(resource.fields).to.deep.equal(fieldsList)
      })

      it ('copies fields by value rather than by reference', function () {
        var resource = new Resource()
          , fieldsList = [ 'field1', 'field2.nestedField' ]

        resource.select(fieldsList)

        expect(resource.fields).to.not.equal(fieldsList)
      })
    })

    describe('#get', function () {
      it ('queries for a given resource', function () {
        $http.get = sinon.spy()

        var resource = new Resource({
          protocol: 'http',
          host: 'api.company.com',
          path: '/v1/users'
        })

        resource.get()

        expect($http.get).to.have.been.calledWith('http://api.company.com/v1/users')
      })

      it ('gets a resource using filters', function () {
        $http.get = sinon.spy()

        var resource = new Resource({
          protocol: 'http',
          host: 'api.company.com',
          path: '/v1/users'
        })

        var filter = { 'field': ['a', 'b'] }

        resource.where(filter).get()

        expect($http.get).to.have.been.calledWith(
          'http://api.company.com/v1/users', { data: filter, headers: {} }
        )
      })
    })

    describe('#post', function () {
      it ('creates a resource', function () {
        $http.post = sinon.spy()

        var resource = new Resource({
          protocol: 'http',
          host: 'api.company.com',
          path: '/v1/users'
        })

        resource.post()

        expect($http.post).to.have.been.calledWith('http://api.company.com/v1/users')
      })
    })
  })
})