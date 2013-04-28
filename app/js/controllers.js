'use strict';

function MangaListCtrl($scope){
    
    $scope.mangas = 
    [
    {
    "mangaId":"Conan",
    "files":
        [
        { "mangaId":"Conan", "fileId":"849", "pages":21},
        { "mangaId":"Conan", "fileId":"853", "pages":16},
        { "mangaId":"Conan", "fileId":"854", "pages":16}
        ]
    },

    {
    "mangaId":"Death Note",
    "files":
        [
        {"mangaId":"Death Note", "fileId":"1", "pages":13},
        {"mangaId":"Death Note", "fileId":"2", "pages":13},
        {"mangaId":"Death Note", "fileId":"3", "pages":13}
        ]
    }
    ]
    
    $scope.zh = "忙旮"
    $scope.isEmpty = function(x){
        return x ? ': ' + x : '';
    }
}

// Read Controller: The Core: Read a manga file!
function ReadFileCtrl($scope, File) {
    $scope.files = File.query();
}
