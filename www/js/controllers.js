angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    })

    .controller('SellKeypadCtrl', function ($scope) {
        'use strict';

        $scope.viewTitle = 'Sell bitcoin';
        $scope.keypadVar = '';
        $scope.action = 'Sell';

        $scope.keyPress = function (value, source) {
            if (source === 'LEFT_CONTROL') {
                if ($scope.keypadVar.indexOf('.') === -1) {
                    if ($scope.keypadVar.length === 0)
                        $scope.keypadVar += '0.';
                    else
                        $scope.keypadVar += '.';
                }
                console.log($scope.keypadVar.length)
            }
            else if (source === 'RIGHT_CONTROL') {
                $scope.keypadVar = $scope.keypadVar.substr(0, $scope.keypadVar.length - 1);
                console.log($scope.keypadVar.length)
            }
            else if (source === 'NUMERIC_KEY') {
                if ($scope.keypadVar.indexOf('.') === -1) {
                    $scope.keypadVar += value;
                } else if ($scope.keypadVar.length - $scope.keypadVar.indexOf('.') <= 2) {
                    $scope.keypadVar += value;
                }
                console.log($scope.keypadVar.length)

            }
        }

    });
