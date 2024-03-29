var elasticsearch = require('elasticsearch');

exports.register = function (app) {

  app.post('/api/v1/users/:userId/feedbacks', function (req, res) {
    var feedbackData = req.body;
    res.status(200).send();
  });

  app.get('/api/v1/users/:userId/feedbacks', function (req, res) {
    var client = elasticsearch.Client();
    var userId = req.params.userId;

    client.search({ index: 'minerva', type: 'feedback', size: -1, body: {
      query: {
        multi_match: {
          query: userId,
          fields: [ "receiver", "author" ]
        }
      }
    }}).then(function (response) {
      var documents = response.hits.hits
        , feedbacks = documents.map(function (document) { return document._source });

      res.status(200).send([].concat(feedbacks));
    });
  });
};