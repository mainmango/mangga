'use strict';

function MangaListCtrl($scope, $http){
    $http.get('mangas/mangas.json').success(function(data){
        $scope.mangas = data;
    });
    
    $scope.zh = "忙旮"
    $scope.isEmpty = function(x){
        return x ? ': ' + x : '';
    }
    $scope.mangaOrderProp="date"
}

// Read Controller: The Core: Read a manga file!
function ReadFileCtrl($scope, File) {
    $scope.files = File.query();
}
