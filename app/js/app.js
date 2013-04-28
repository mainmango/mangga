'use strict';

/* App Module */

angular.module('mangacab', ['mangacabFilters', 'mangacabServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/mangas', {templateUrl: 'partials/manga-list.html',   controller: MangaListCtrl}).
      when('/mangas/:mangaId', {templateUrl: 'partials/file-list.html',   controller: FileListCtrl}).
      when('/mangas/:mangaId/:fileID', {templateUrl: 'partials/read.html', controller: ReadCtrl}).
      otherwise({redirectTo: '/mangas'});
}]);
