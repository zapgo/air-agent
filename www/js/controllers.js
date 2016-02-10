angular.module('air.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    })

    .controller('SellBitcoinCtrl', function ($scope, $rootScope, Transaction, Timer, $stateParams) {
        'use strict';
        var sellAmount = $stateParams.amount;
        console.log(sellAmount)
        var qrDetails = Transaction.create('load_bitcoin', sellAmount, 'ZAR');

        qrDetails.then(function (rawData) {
            $scope.tx_data = rawData.data;
            console.log($scope.tx_data);
            var sellBtcExpiry = new Date($scope.tx_data.meta.expiry_timestamp);
            var sellBtcStart = Date.parse($scope.tx_data.created_timestamp);
            Timer.initializeClock('clockdiv', sellBtcStart, sellBtcExpiry);
        });
    })

    .controller('SellKeypadCtrl', function ($scope, $state) {
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
        };

        $scope.submit = function (amount) {
            console.log(amount);
            $state.go('app.sell_bitcoin', {
                amount: amount
            });
        };

    });
