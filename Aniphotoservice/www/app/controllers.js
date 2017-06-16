(function () {
    "use strict";

    angular.module("myapp.controllers", [])

    .controller("appCtrl", ["$scope", function ($scope) {
    }])

    //homeCtrl provides the logic for the home screen
        .controller("homeCtrl", ["$scope", "$state", "$rootScope", "$window", "$ionicPlatform", "dataStorage", function ($scope, $state, $rootScope, $window, $ionicPlatform, dataStorage) {
        
            $ionicPlatform.ready(function () {
                
                if ((localStorage.getItem("id") == null) || (localStorage.getItem("id") == undefined)) {
                    localStorage.setItem("id", 0)
                }
                
                if ($window.MobileAccessibility) {
                    $window.MobileAccessibility.usePreferredTextZoom(false);
                }
            });
        
            $scope.$on('$ionicView.enter', function () {
                dataStorage.imageArrayMultipleBool = false;
                $rootScope.disableButtonShow = true;
                $rootScope.bottomBarShow = false;
                if ((localStorage.getItem("fblogin") == null) || (localStorage.getItem("fblogin") == undefined)) {
                    localStorage.setItem("fblogin", 0)
                }
            dataStorage.number = 0;
            dataStorage.picture = "";
            //dataStorage.imageArrayMultiple = [];
            //$scope.ready = false;
            $scope.images = [];
            if (dataStorage.arrayPictur) {
                $scope.arrayPic = dataStorage.arrayPictur;
            } else {
                $scope.arrayPic = []
            }
            $scope.download = false
            if (parseInt(localStorage.getItem("fblogin")) == 0) {
                $scope.fbLogin = true;
            } else {
                $scope.fbLogin = false;
            }
            $rootScope.loadingShow = false;
            $scope.$apply()
        })
        $rootScope.gotoGallery = function () {
            dataStorage.imageArrayMultipleBool = true
            location.href = "#/app/galleryPage";
        }
        $rootScope.gotoHome = function () {
            location.href = "#/app/home";
        }
        $scope.myImage = function () {
            $scope.chooseSource = true;
        }
        $scope.closePopup = function () {
            $scope.chooseSource = false;
        }
        $scope.goToGallery = function () {
           
            location.href = "#/app/galleryPage";
            $scope.chooseSource = false;
        }
        var asscecToken = ""
        $scope.statusFb = function () {
            if (window.cordova.platformId == "browser") {
                facebookConnectPlugin.browserInit('1035688406566191');
            }
            facebookConnectPlugin.getLoginStatus(function (response) {
                console.log(response);
                if (response.status === 'connected') {
                    console.log('User Already LoggedIn');

                } else {
                    console.log('User Not Logged In');
                }
            }, function () {
                // $log.warn('Get Login Status Error');
            }); 
        }
        //if (parseInt(localStorage.getItem("fblogin")) == 0) {
            
            $scope.facebook = function () {
                facebookConnectPlugin.login(["email", "public_profile", "user_photos"],
                    function (response) {
                        console.log(response)
                        $scope.fbLogin = false;
                        localStorage.setItem("fblogin", 1)
                        $scope.$apply();
                    },
                    function (error) {
                        console.log(error)
                    });
            }
       // }
        
        $scope.photoFb = function () {
            console.log("photo albom")
            facebookConnectPlugin.api("me?fields=albums{name,picture{url},id}", ["user_photos"],
                function (result) {
                    console.log(result);
                },
                function (error) {
                    console.log(error);
                });
        }
            
        /*$rootScope.$watch('appReady.status', function () {
            console.log('watch fired ' + $rootScope.appReady.status);
            if ($rootScope.appReady.status) $scope.ready = true;
        });*/
        $scope.selImages = function () {
            dataStorage.imageArrayMultiple = [];
            $scope.chooseSource = false;
            window.imagePicker.getPictures(
                function (results) {
                    for (var i = 0; i < results.length; i++) {
                        console.log('Image URI: ' + results[i]);
                        $scope.images.push(results[i]);
                        console.log($scope.images)
                    }
                    console.log($scope.images)
                    if (!$scope.$$phase) {
                        $scope.$apply();
                        console.log($scope.images)
                    }
                    dataStorage.imageArrayMultiple = $scope.images;
                    location.href = "#/app/galleryPage";

                    console.log($scope.images)
                }, function (error) {
                    console.log('Error: ' + error);
                }
            );
            
        };
        
        $scope.popupPhoto = function (s) {
            $scope.chooseSource = false;
            console.log(s);
            navigator.camera.getPicture(function (imageUri) {
                $scope.pic = imageUri;
                dataStorage.picture = $scope.pic;
                /*encodeImage($scope.pic, function (encodedImage) {
                    console.log("5")
                    dataStorage.pic = encodedImage;
                    $scope.pic = encodedImage;
                    console.log($scope.pic)
                    dataStorage.picture = $scope.pic;
                    
                    $scope.$apply();
                    console.log("6")
                });*/
                location.href = "#/app/galleryPage";
                $scope.$apply()

            }, null, {
                    quality: 50,
                    destinationType: navigator.camera.DestinationType.FILE_URI,
                    encodingType: Camera.EncodingType.PNG,
                    correctOrientation: true,
                    sourceType: s
                });

        }
        
        function encodeImage(src, callback) {
            console.log("1")
            var canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d'),
                img = new Image();
            console.log("2")
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                callback(canvas.toDataURL());
            }
            console.log("3")
            img.src = src;
            console.log("4")
        }
        $scope.refresh = function () {
            //refresh binding
            $scope.$broadcast("scroll.refreshComplete");
        };
    }])

    //errorCtrl managed the display of error messages bubbled up from other controllers, directives, myappService
    .controller("errorCtrl", ["$scope", "myappService", function ($scope, myappService) {
        //public properties that define the error message and if an error is present
        $scope.error = "";
        $scope.activeError = false;

        //function to dismiss an active error
        $scope.dismissError = function () {
            $scope.activeError = false;
        };

        //broadcast event to catch an error and display it in the error section
        $scope.$on("error", function (evt, val) {
            //set the error message and mark activeError to true
            $scope.error = val;
            $scope.activeError = true;

            //stop any waiting indicators (including scroll refreshes)
            myappService.wait(false);
            $scope.$broadcast("scroll.refreshComplete");

            //manually apply given the way this might bubble up async
            $scope.$apply();
        });
    }]);
})();