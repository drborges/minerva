angular.module('minerva.models')

  /**
   * Creates instances of contextualized Feedback model
   *
   * @param  {$http} $http
   * @return {Feedback}
   */
  .factory('Feedback', function ($http) {

    /**
     * Feedback model
     *
     * @class
     * @typedef {Feedback}
     *
     * @param {Object} properties - Object containing Feedback properties
     *
     * @property {string} author - The author of the feedback
     * @property {string} receiver - The receiver of the feedback
     * @property {string} content - The content of the feedback
     * @property {string} type - The feedback type (achievement|shout|back-tap|improvement|screw-up)
     * @property {string} location - The geo location where the feedback was composed
     * @property {string} tags - A list of tags
     * @property {string} visibility - The visibility of the feedback (public|private|friends)
     */
    var Feedback = function (properties) {
      this.author = properties.author; // required, read operations such as #find should be specific to the author
      this.receiver = properties.receiver;
      this.content = properties.content;
      this.type = properties.type;
      this.location = properties.location;
      this.tags = properties.tags || [];
      this.visibility = properties.visibility || 'public';
    };

    /**
     *  Fetches find feebacks for the user bound to the current Feedback instance
     *
     *  @return {Array.<Feedback>}
     */
    Feedback.find = function () {
      return $http.get('/api/feedback').then(function (response) {
        return response.data;
      });
    };

    return Feedback;
  });
