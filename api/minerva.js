exports.register = function (app) {

  app.get('/api', function (req, res) {
    res.status(200).send({
      "version": "0.0.1",
      "release": "asdf3g4h5gfdsaasd"
    });
  });

};
