describe ('minerva.models', function () {
  var ModelQuery, $http

  beforeEach(module('minerva.models'))
  beforeEach(inject(function (_ModelQuery_, _$http_) {
    ModelQuery = _ModelQuery_
    $http = _$http_
  }))

  describe('ModelQuery', function () {

    describe('#where', function () {
      it ('adds a new criterion to the filters list', function () {
        var filteredQuery = new ModelQuery().where({
          author: 'username',
          email: 'username@company.com'
        })

        expect(filteredQuery.filters).to.deep.equal([
          { author: 'username', email: 'username@company.com' }
        ])
      })

      it ('adds filters by value rather than by reference', function () {
        var filter = { author: 'username', email: 'username@company.com' }

        var filteredQuery = new ModelQuery().where(filter)

        expect(filteredQuery.filters[0]).to.not.equal(filter)
      })

      it ('returns the same instance of ModelQuery when adding filters', function () {
        var query = new ModelQuery()

        var filteredQuery = query.where({ filter: 'value' })

        expect(filteredQuery).to.equal(query)
      })
    })

    describe('#query', function () {
      it ('queries for a given resource', function () {
        $http.get = sinon.spy()

        var modelQuery = new ModelQuery({
          protocol: 'http',
          host: 'api.company.com',
          path: '/v1/users'
        })

        modelQuery.query()

        expect($http.get).to.have.been.calledWith('http://api.company.com/v1/users')
      })

      it ('queries for a given resource with filter', function () {
        $http.get = sinon.spy()

        var modelQuery = new ModelQuery({
          protocol: 'http',
          host: 'api.company.com',
          path: '/v1/users'
        })

        modelQuery.where({ 'field': ['a', 'b'] }).query()

        expect($http.get).to.have.been.calledWith('http://api.company.com/v1/users?field=a,b')
      })
    })
  })
})