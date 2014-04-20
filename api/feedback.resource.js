var elasticsearch = require('elasticsearch');

exports.register = function (app) {

  app.post('/api/feedback', function (req, res) {
    var feedbackData = req.body;
    res.status(200).send();
  });

  app.get('/api/feedback', function (req, res) {
    var client = elasticsearch.Client();

    client.search({ index: 'minerva', type: 'feedback', size: 50 }).then(function (response) {
      var documents = response.hits.hits
        , feedbacks = documents.map(function (document) { return document._source });

      res.status(200).send([].concat(feedbacks));
    });
  });
}