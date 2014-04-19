angular.module('minerva.common')

  .filter('humanize', function(){
    return function(text) {
      if(text) {
        var string = text.replace(/[_|-]/g, ' ').toLowerCase();
        string = string.charAt(0).toUpperCase() + string.slice(1);

        return string;
      }
    };
  });