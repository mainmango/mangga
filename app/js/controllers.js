'use strict';

function MangaListCtrl($scope, $http, $routeParams){
    $http.get('mangas/mangas.json').success(function(data){
        $scope.mangas = data;
    });
    
    $scope.zh = "忙旮"
    $scope.isEmpty = function(x){
        return x ? ': ' + x : '';
    }
    $scope.mangaOrderProp="date"
    $scope.query = $routeParams.mangaId
}

// Read Controller: The Core: Read a manga file!
function ReadCtrl($scope, $routeParams) {
    $scope.mangaId = $routeParams.mangaId
    $scope.fileId = $routeParams.fileId
    
}
