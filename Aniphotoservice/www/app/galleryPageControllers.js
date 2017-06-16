(function () {
    "use strict";

    angular.module("myapp.controllers")
        .controller("galleryPageCtrl", ["$scope", "$rootScope", "$ionicSideMenuDelegate", "dataStorage", "$state", "$ionicPlatform", "$timeout", function ($scope, $rootScope, $ionicSideMenuDelegate, dataStorage, $state, $ionicPlatform, $timeout) {
            $scope.idItems = parseInt(localStorage.getItem("id"))
            $scope.items = [];
            console.log($scope.items)
            $scope.galleryFunction = function () {
                $scope.items = [];
                var it = [];
                var I = 0;
                var count = 0;
                var removeJ = 0;
                for (var i = 0; i < dataStorage.imageArrayMultiple.length; i++) {
                            if (dataStorage.imageArrayMultiple[i] !== "") {
                                var item = {
                                    id: $scope.idItems + i,
                                    count: 1,
                                    src: dataStorage.imageArrayMultiple[i],
                                    type: {
                                        name: '10 / 15',
                                        value: 1
                                    },
                                    crop: {
                                        x: 0,
                                        y: 0,
                                        width: 0,
                                        height: 0,
                                        rotate: 0,
                                        scaleX: 1,
                                        scaleY: 1,
                                        zoomCrop: -10,
                                    }
                                }
                                count++;
                               
                                it.push(item)

                            }
                    
                }
                if (count > 0) {
                    $scope.items = it;
                }
                localStorage.setItem("picture", JSON.stringify($scope.items))
                $scope.$apply()
              /*
                
                for (var i = 0; i < dataStorage.imageArrayMultiple.length; i++) {
                   
                    if (dataStorage.imageArrayMultiple[i] !== "") {
                        
                        $scope.items.push({
                            id: $scope.idItems + i,
                            count: 1,
                            src: dataStorage.imageArrayMultiple[i],
                            type: {
                                name: '16 / 9',
                                value: 16 / 9

                            },
                            crop: {
                                x: 0,
                                y: 0,
                                width: 0,
                                height: 0,
                                rotate: 0,
                                scaleX: 1,
                                scaleY: 1,
                                zoomCrop: -10,
                            }
                        })
                    }
                    if (i == (dataStorage.imageArrayMultiple.length - 1)) {
                        console.log($scope.items)
                        $scope.idItems += i + 1
                        localStorage.setItem("id", $scope.idItems)
                    }
                }
            */
                dataStorage.imageArrayMultiple = []
               // dataStorage.picture = "";
            /*
                $scope.arrayItems = []
                for (var k = 0; k < $scope.items.length; k++) {
                    $scope.arrayItems.push($scope.items[k])
                }
                console.log($scope.arrayItems)
                localStorage.setItem("picture", JSON.stringify($scope.arrayItems))
                */
                console.log($scope.items)
                if (dataStorage.backInfoItemBool) {
                    console.log("mta")
                    $scope.items = dataStorage.backInfoItem
                    if ($scope.items.length > 0) {
                        $rootScope.rightButtonBar = true
                    }
                }
                console.log($scope.items)
                
            }
            $scope.galleryFunc = function () {
                /*for (var j = 0; j < dataStorage.imageArrayMultiple.length; j++) {
                    console.log(dataStorage.imageArrayMultiple[j])
                    $scope.items.push(dataStorage.imageArrayMultiple[j])
                }*/
                for (var i = 0; i < dataStorage.imageArrayMultiple.length; i++) {

                    if (dataStorage.imageArrayMultiple[0] !== "") {

                        $scope.items.push({
                            id: $scope.idItems + i,
                            count: 1,
                            src: dataStorage.imageArrayMultiple[i],
                            type: {
                                name: '10 / 15',
                                value: 1

                            },
                            crop: {
                                x: 0,
                                y: 0,
                                width: 0,
                                height: 0,
                                rotate: 0,
                                scaleX: 1,
                                scaleY: 1,
                                zoomCrop: -10,
                            }
                        })
                    }
                    if (i == (dataStorage.imageArrayMultiple.length - 1)) {
                        console.log($scope.items)
                        console.log(JSON.parse(localStorage.getItem("picture")))
                        $scope.idItems += i + 1
                        localStorage.setItem("id", $scope.idItems)
                    }
                }
                console.log($scope.items)
            }
            //methods-----------------------------------

            $scope.$on('$ionicView.enter', function () {
                if (dataStorage.imageArrayMultipleBool){
                    dataStorage.imageArrayMultiple = []
                }
                console.log("_!1")
                dataStorage.infoItems = []
                //console.log(dataStorage.imageArrayMultiple.length )
                $rootScope.bottomBarShow = true;
                $rootScope.leftButtonBar = false;
                $rootScope.rightButtonBar = false;
                $rootScope.activBool1 = true;
                $rootScope.activBool2 = false;
                $rootScope.activBool3 = false;
                $rootScope.activBool4 = false;
                $rootScope.loadingShow = false;
                $scope.openMenu = function () {
                    $ionicSideMenuDelegate.toggleLeft();
                }
               // console.log(dataStorage.imageArrayMultiple.length)
                if (dataStorage.imageArrayMultiple.length > 0) {
                    $rootScope.rightButtonBar = true;
                }
                $rootScope.rightButtonFunction = function () {
                    $rootScope.rightButtonBar = true;
                }
                $rootScope.rightButtonFunc = function () {
                    if ($rootScope.rightButtonBar) {
                        console.log("open info")
                        console.log($rootScope.activBool2)
                        if (!$rootScope.activBool2) {
                            console.log($scope.items)
                            //  $scope.infoItems = [];
                            dataStorage.infoItems = $scope.items
                            /*for (var j = 0; j < $scope.infoItems.length; j++) {
                                for (var k = 0; k < $scope.infoItems[j].length; k++) {
                                    dataStorage.infoItems.push($scope.infoItems[j][k])
                                }
                            }*/
                            console.log(dataStorage.infoItems);
                            dataStorage.backInfoItemBool = false;
                            location.href = "#/app/infoPayment";
                        }
                    }
                }
                $scope.$apply();
                $scope.galleryFunction()
                $scope.images = [];
                if (parseInt(localStorage.getItem("fblogin")) == 0) {
                    $scope.fbGalleryLogin = true;
                } else {
                    $scope.fbGalleryLogin = false;
                }
                $scope.alboms = [];
                $scope.photoAlboms = [];
                $scope.photoInterim = [];
                $scope.arrayOpacity = [];
                console.log($scope.items)
                console.log("aaa")
            })
            
            
            $scope.selImages = function () {
                $scope.images = []
                dataStorage.imageArrayMultiple = []
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
                        //$scope.items = dataStorage.imageArrayMultiple;
                        
                        $rootScope.rightButtonBar = true;
                        $rootScope.rightButtonFunction()
                        $scope.galleryFunc();
                        //console.log($scope.images)
                        $scope.$apply()
                    }, function (error) {
                        console.log('Error: ' + error);
                    }
                );

            };
            $scope.facebook = function () {
                facebookConnectPlugin.login(["email", "public_profile", "user_photos"],
                    function (response) {
                        console.log(response)
                        $scope.fbGalleryLogin = false;
                        localStorage.setItem("fblogin", 1)
                        $scope.$apply();
                    },
                    function (error) {
                        console.log(error)
                    });
            }
            $scope.photoFb = function () {
                $rootScope.loadingShow = true
                $scope.isDisabled = true;
                $scope.photoInterim = [];
                $scope.photoAlboms = [];
                $scope.alboms = []
                $scope.photoAlbomShow = false;
                $scope.albomShow = true;
                console.log("photo albom")
                facebookConnectPlugin.api("me?fields=albums{name,picture{url},id}", ["user_photos"],
                    function (result) {
                        $rootScope.disableButtonShow = false;
                        console.log(result);
                        for (var i = 0; i < result.albums.data.length; i++) {
                            $scope.alboms.push({ 'src': result.albums.data[i].picture.data.url, 'name': result.albums.data[i].name, 'id': result.albums.data[i].id});
                        }
                        console.log($scope.alboms)
                        $scope.fbPopup = true;
                        $rootScope.loadingShow = false;
                        $scope.$apply();
                    },
                    function (error) {
                        console.log(error);
                    });
            }
            $scope.albomOpen = function (id) {
                $rootScope.loadingShow = true;
                console.log(id)
                facebookConnectPlugin.api(id + "?fields=photos.limit(15){images},name", ["user_photos"],
                    function (result) {
                        
                        console.log(result);
                        $scope.albomShow = false;
                        for (var i = 0; i < result.photos.data.length; i++) {
                            $scope.photoAlboms.push({ 'src': result.photos.data[i].images[0].source, 'id': result.photos.data[i].id ,'selected':false});
                        }
                        console.log($scope.photoAlboms)
                        $scope.photoAlbomShow = true;
                        $timeout(function () { $rootScope.loadingShow = false; }, 1000);
                        
                        $scope.$apply();
                    },
                    function (error) {
                        console.log(error);
                    });
            }
            $scope.photoOpen = function (item) {
                
                var url = item.src;
                var indexof = $scope.photoInterim.indexOf(url);
                console.log(indexof)
                if (indexof == -1) {
                    $scope.photoInterim.push(url);
                    item.selected = true;
                } else {
                    item.selected = false;
                    $scope.photoInterim.splice(indexof, 1);
                }
                console.log($scope.photoInterim.length)
                if ($scope.photoInterim.length > 0) {
                    $scope.isDisabled = false;
                } else {
                    $scope.isDisabled = true;
                }
                console.log($scope.photoInterim)
            }
            $scope.doneFb = function () {
                $scope.images = []
                dataStorage.imageArrayMultiple = []
                for (var i = 0; i < $scope.photoInterim.length; i++) {
                    $scope.images.push($scope.photoInterim[i]);
                }
                console.log($scope.images)
                dataStorage.imageArrayMultiple = $scope.images;
                $scope.items = []
                $scope.fbPopup = false;
                $rootScope.disableButtonShow = true;
                $scope.galleryFunction();
                //$scope.$apply();
            }
            $scope.cancelFb = function () {
                console.log("cancel")
                $scope.photoAlboms = [];
                $scope.photoFb();

            }
            $scope.itemsFunc = function () {
                //$scope.items = [];
             //   console.log(JSON.parse(localStorage.getItem("picture")))
              //  $scope.items = JSON.parse(localStorage.getItem("picture"))
                console.log($scope.items)
            }
            $scope.popupPhoto = function (s) {
                $scope.chooseSource = false;
                console.log(s);
                navigator.camera.getPicture(function (imageUri) {
                    $scope.pic = imageUri;
                    dataStorage.picture = $scope.pic;
                    $scope.items = []
                    $scope.galleryFunction();
                    $scope.$apply()
                    //$state.reload()

                }, null, {
                        quality: 50,
                        destinationType: navigator.camera.DestinationType.FILE_URI,
                        encodingType: Camera.EncodingType.PNG,
                        correctOrientation: true,
                        sourceType: s
                    });
            }

            $scope.addImage = function () {
                $scope.chooseSource = true;
            }
            $scope.closePopup = function () {
                $scope.chooseSource = false;
            }
            $scope.closePopupFb = function () {
                $scope.photoInterim = [];
                $scope.photoAlboms = [];
                $scope.alboms = []
                $rootScope.disableButtonShow = true;
                $scope.fbPopup = false;
            }
        }])
})();