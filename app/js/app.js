'use strict';

/* App Module */

angular.module('mangacab', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/mangas', {templateUrl: 'partials/manga-list-view.html',   controller: MangaListCtrl}).
      when('/mangas/:mangaId', {templateUrl: 'partials/manga-list-view.html',   controller: MangaListCtrl}).
      when('/mangas/:mangaId/:fileID', {templateUrl: 'partials/read-view.html', controller: ReadCtrl}).
      otherwise({redirectTo: '/mangas'});
}]);
