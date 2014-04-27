var through = require('through2')
  , q = require('q')
  , elasticsearch = require('elasticsearch')

function Indexer() {
  var client = elasticsearch.Client()

  function done(cb) {
    return function () {
      cb()
    }
  }

  function error(err) {
    return q.resolve()
  }

  function clear(data) {
    return client.indices
      .delete({ 'index': data.index, 'type': data.type })
      .catch(error)
  }

  function index(data) {
    var bulkOperations = [].concat.apply([], data.documents.map(function (document) {
      return [{ index:  { _index: data.index, _type: data.type } }, document]
    }))

    return function () {
      return client
        .bulk({ body: bulkOperations })
        .catch(error)
    }
  }

  return through.obj(function (file, encoding, next) {
    var data = JSON.parse(file.contents.toString(encoding))

    this.push(file)

    return clear(data).then(index(data)).then(done(next))
  })
}

module.exports = Indexer