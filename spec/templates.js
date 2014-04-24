angular.module("minerva.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("/templates/composer.html","<div class=\"composer\" ng-init=\"maxCharacters = 300\">\n  <textarea\n    max-characters=\"maxCharacters\"\n    ng-model=\"feedback\"\n    class=\"form-control\"\n    placeholder=\"Feedback to a @user with #tags\"></textarea>\n\n  <div class=\"info\">\n    <span class=\"characters-left\">{{ feedback | charactersLeft: maxCharacters }}</span>\n    <button class=\"btn btn-primary btn-xs btn-send\">Send</button>\n  </div>\n</div>");
$templateCache.put("/templates/metric.html","<div class=\"metric {{name}}\">\n  <div class=\"icon\"><i class=\"type {{icon}}\"></i></div>\n  <div class=\"count\">{{count}}</div>\n  <div class=\"chart {{color}}\"></div>\n</div>");
$templateCache.put("/templates/timeline.html","<div class=\"timeline\">\n\n  <div class=\"feedback\" ng-repeat=\"feedback in activity\">\n\n    <div class=\"info\">\n      <img ng-src=\"/images/{{feedback.sender.id}}.jpg\" class=\"sender\" />\n      <i class=\"fa fa-chevron-right\"></i>\n      <img ng-src=\"/images/{{feedback.receiver.id}}.jpg\" class=\"receiver\" />\n\n      <span class=\"extra\">{{feedback.createdAt | date: \'shortTime\'}}</span>\n      <span class=\"separator extra\">.</span>\n      <span class=\"extra\"><i class=\"type fa {{feedback.type | feedbackTypeClass}}\"></i></span>\n      <span class=\"separator extra\">.</span>\n      <span class=\"extra\"><i class=\"fa fa-globe visibility\"></i></span>\n      <span class=\"separator extra\">.</span>\n      <span class=\"extra\"><i class=\"fa fa-location-arrow location\"></i></span>\n    </div>\n\n    <div class=\"content\">\n      <i class=\"fa fa-quote-left\"></i>\n      <span>{{feedback.content}}</span>\n      <i class=\"fa fa-quote-right\"></i>\n    </div>\n\n    <div class=\"tags\">\n      <span class=\"tag\" ng-repeat=\"tag in feedback.tags\">#{{tag}}</span>\n    </div>\n  </div>\n\n</div>\n");}]);