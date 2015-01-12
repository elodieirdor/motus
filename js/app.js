var motusApp = angular.module('motusApp', []);

motusApp.controller('gameCtrl', function ($scope, $timeout, $http) {
    $scope.levels = [];
    $scope.levels[0] = {'id':0,'nbRows':6,'nbSquares':6, 'name':'Simple'};
    $scope.levels[1] = {'id':1,'nbRows':6,'nbSquares':9, 'name':'Difficile'};
    $scope.level = 0;
    $scope.playingGame = false;
    $scope.userLetters = [];
    $scope.classLetters = [];
    $scope.playingRow = 0;
    $scope.editableRow = [];
    $scope.partyFinnish = false;
    $scope.settingParameters = false;
    $scope.home = true;
    $scope.correctKeyLetters = [];

    $scope.backHome = function() {
        $scope.settingParameters = false;
        $scope.playingGame = false;
        $scope.home = true;
    };

    $scope.setParameters = function() {
        $scope.home = false;
        $scope.settingParameters = true;
    };

    $scope.playGame = function () {
        $scope.home = false;
        $scope.playingGame = true;
        $scope.initGame();
    };

    $scope.changeLevel = function(level) {
        $scope.level = level;
        var url = "src/level-" + $scope.level + ".json";
        $http.get(url).then(function (response) {
            $scope.words = response.data['words'];
        });
    };

    $scope.initGame = function () {
        $scope.correctKeyLetters = [];
        $scope.playingRow = 0;
        $scope.word = $scope.words[Math.floor(Math.random()*$scope.words.length)].toUpperCase();
        $scope.partyFinnish = false;
        $scope.nbSquares = $scope.levels[$scope.level]['nbSquares'];
        $scope.nbRows = $scope.levels[$scope.level]['nbRows'];
        $scope.initRows();
        $scope.initRow();
        $scope.editableRow[$scope.playingRow] = true;
        console.info($scope.word);
    };

    $scope.initRows = function () {
        for (var i = 0; i < $scope.nbRows; i++) {
            $scope.classLetters[i] = new Array();
            $scope.userLetters[i] = {};
            $scope.editableRow[i] = false;
            for (var j = 0; j < $scope.nbSquares; j++) {
                $scope.classLetters[i][j] = 0;
                $scope.userLetters[i][j] = '';
            }
        }
    };

    $scope.initRow = function() {
        console.info($scope.playingRow);
        $scope.userLetters[$scope.playingRow][0] = $scope.word[0];
        // put correct user letters
//        angular.forEach($scope.correctKeyLetters, function (value, key) {
//            $scope.userLetters[$scope.playingRow][value] = $scope.word[value];
//        });
    };

    $scope.placeholder = function(row, letterIndex) {
//        console.log(row);

        if (row == $scope.playingRow) {
            console.info('placeholder');
            console.log($scope.correctKeyLetters);
            console.log(letterIndex);
            console.info('---');
            if ($scope.correctKeyLetters.indexOf(letterIndex) != -1) {
                console.log('coucou');
                return $scope.word[value];
            }
        }
        return null;

//        if ($scope.correctKeyLetters[letterIndex])
//        return 'A';
    };


    $scope.$watch('userLetters', function () {
        if ((!$scope.partyFinnish)
            && (angular.isDefined($scope.userLetters[$scope.playingRow]))
            && ($scope.userLetters[$scope.playingRow][$scope.nbSquares - 1] != '')) {
            $scope.checkWord();
        }

//        if ((!$scope.partyFinnish)
//            && (angular.isDefined($scope.userLetters[$scope.playingRow]))) {
//            $timeout(function() {
//
//            }, 1000)
//            $scope.checkWord();
//        }


    }, true);

    $scope.setClassLetters = function() {
        var nbGreat = 0;
        angular.forEach($scope.userLetters[$scope.playingRow], function (userLetter, userKey) {
            userLetter = userLetter.toUpperCase();
            if (userLetter == $scope.word[userKey]) {
                $scope.classLetters[$scope.playingRow][userKey] = 1;
                $scope.correctKeyLetters.push(userKey);
                // useless : use correctKeyLetters
                nbGreat++;
            } else {
                var search = true;
                angular.forEach($scope.word, function (wordLetter, key) {
                    if (search) {
                        if (wordLetter == userLetter) {
                            $scope.classLetters[$scope.playingRow][userKey] = 2;
                            search = false;
                        }
                    }
                });
            }
        });

        return nbGreat;
    };

    $scope.checkWord = function () {
        var nbGreat = $scope.setClassLetters();
        $scope.editableRow[$scope.playingRow] = false;
        $scope.playingRow++;
        if (nbGreat == $scope.nbSquares) {
            $timeout(function() {
                alert('Good!');
                $scope.partyFinnish = true;
            }, 1000);
        } else {
            if ($scope.playingRow == $scope.nbRows) {
                $timeout(function() {
                    alert('Perdu');
                    $scope.partyFinnish = true;
                    $scope.playingRow--;
                    $scope.userLetters[$scope.playingRow] = $scope.word.split('');
                    $scope.setClassLetters();
                }, 1000);
            } else {
                $scope.initRow();
                $scope.editableRow[$scope.playingRow] = true;
            }

        }
    };

    $scope.range = function (n) {
        return new Array(n);
    };
});