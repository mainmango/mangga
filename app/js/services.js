'use strict';

/* Services */

angular.module('mangaCollectionServices', ['ngResource']).
    factory('Manga', function($resource){
  return $resource('Manga/:phoneId.json', {}, {
    query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
  });
});
