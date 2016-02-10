/*global Firebase, console, angular */
angular.module('air.services', [])

    .service('Timer', function (API, $rootScope, $ionicPopup) {
        'use strict';
        var time;
        var self = this;

        self.initializeClock = function (id, startTime, endTime) {
            var clock = document.getElementById(id);
            console.log(clock)
            var minutesSpan = clock.querySelector('.minutes');
            var secondsSpan = clock.querySelector('.seconds');
            time = startTime;

            function updateClock() {
                time = time + 1000;
                console.log(time);

                var t = self.getTimeRemaining(endTime);

                minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
                secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

                console.log(minutesSpan.innerHTML);
                console.log(secondsSpan.innerHTML);


                if (t.total <= 0) {
                    clearInterval($rootScope.timeinterval);
                    self.popupTimeout()
                }
            }

            updateClock();
            $rootScope.timeinterval = setInterval(updateClock, 1000);
        };

        self.getTimeRemaining = function (endtime, label) {
            var t = Date.parse(endtime) - time;
            var seconds = Math.floor((t / 1000) % 60);
            var minutes = Math.floor((t / 1000 / 60) % 60);
            return {
                'total': t,
                'minutes': minutes,
                'seconds': seconds
            };
        };

        self.popupTimeout =  function () {
            $ionicPopup.alert({
                title: 'Timeout',
                template: '<h1 class="title text-center">You took too long</h1>' +
                '<img src="images/notime.png" style="width:150px; display:block; margin:auto;">' +
                '<h2 class="title text-center">Please try again</h2>'
            });
        };

    });