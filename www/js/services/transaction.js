/*global Firebase, console, angular */
angular.module('air.services.transaction', [])

    .service('Balance', function ($http, API) {
        'use strict';
        var self = this;
        self.get = function () {
            return $http.get(API + '/balance/');
        }
    })

    .service('Transaction', function ($http, API) {
        'use strict';
        var self = this;

        self.query = function () {
            return $http.get(API + '/transactions/');
        };

        self.get = function (txId) {
            return $http.get(API + '/transactions/' + txId + '/');
        };

        self.create = function (type, amount, currency) {
            return $http.post(API + '/transactions/', {
                'tx_type': type,
                'amount': amount,
                'currency': currency
            });
        }
    })

    .service('Quote', function ($http, API) {
        'use strict';
        var self = this;

        self.get = function (quoteId) {
            return $http.get(API + '/quote/' + quoteId + '/');
        };

        self.create = function (type, amount, input_currency, output_currency) {
            return $http.post(API + '/quote/', {
                'tx_type': type,
                'amount': amount,
                'input_currency': input_currency,
                'output_currency': output_currency
            });
        }
    });