(function () {
    angular.module('okeefeSite.controllers')
        .controller('ventureSheetController',
            function (favoritesService, $scope, $rootScope, $timeout, entitiesService, defaultFactory,
                      $auth, $uibModal, $routeParams, searchApiService, okeefeApiService, SITE_URL, emprendimiento) {
                $scope.siteUrl = SITE_URL;
                $scope.resultFav = false;
                $scope.favCount = 0;
                $scope.pdfFile = '';
                $scope.limitProp = 7;
                $scope.psContactForm = {secret: 'sitiOkeefe', dato: '', error: false};
                $scope.psForm = function ($event) {
                    $event.preventDefault();
                    if (!$scope.psContactForm.nombre || !$scope.psContactForm.apellido || !$scope.psContactForm.email || !$scope.psContactForm.telefono || !$scope.psContactForm.celular || !$scope.psContactForm.comentarios) {
                        $scope.psContactForm.error = true;
                        return false;
                    }
                    $scope.psContactForm.comentarios = "Propiedad (" + $routeParams.id + ") - " + $scope.psContactForm.comentarios;
                    okeefeApiService.API.send($scope.psContactForm).then(function (response) {
                        entitiesService.showAlert($scope, 'Gracias por enviar.', 'success', 3000);
                        $scope.psContactForm = {secret: 'sitiOkeefe', dato: '', error: false};
                    }, function errorCallback(response) {
                        entitiesService.showAlert($scope, 'Error al enviar el mensaje. Intenta de nuevo mas tarde.', 'danger', 3000);
                        console.log("error :", response);
                    });
                };

                $scope.verTodas = function (show) {
                    $scope.limitProp = 7;
                    if(show){
                        $scope.limitProp = $scope.property.properties.length;
                    }
                };

                $scope.pdf = function () {
                    $scope.property.pdfRoute = 'venture';
                    okeefeApiService.API.getPDF($scope.property).then(function (response) {
                        $scope.pdfFile = response;
                    }, function errorCallback(response) {
                    });
                };

                $scope.getTipoOperacion = function (val) {
                    return entitiesService.getTipoOperacion(val);
                };

                $scope.downloadPDF = function () {
                    window.open($scope.pdfFile);
                };
                $scope.init = function () {
                    $scope.isLogged = $auth.isAuthenticated();
                    $scope.map = {
                        center: {},
                        control: {},
                        markers: []
                    };
                    $scope.getData(emprendimiento);
                    entitiesService.popover();
                    $scope.tab = 'f';
                };

                if ($scope.isLogged) {
                    favoritesService.count()
                        .then(function (data) {
                            $scope.favCount = data;

                        });
                }

                function setPropChar(data) {
                    angular.forEach(data.properties, function (value, key) {
                        value.operacion = $scope.getTipoOperacion(value.id_tipo_prop);
                        value.cantidad_ambientes = value.propiedad_caracteristicas.filter(function (d) {
                            return d.id_carac == 208
                        });
                        value.amenities = value.propiedad_caracteristicas.filter(function (d) {
                            return d.id_carac == 20
                        });
                        value.moneda = value.propiedad_caracteristicas.filter(function (d) {
                            return d.id_carac == 165
                        });
                        value.valor = value.propiedad_caracteristicas.filter(function (d) {
                            return d.id_carac == 161
                        });
                        value.estado = value.propiedad_caracteristicas.filter(function (d) {
                            return d.id_carac == 42
                        });
                        value.desc = value.propiedad_caracteristicas.filter(function (d) {
                            return d.id_carac == 255
                        });
                        value.fichaweb = value.propiedad_caracteristicas.filter(function (d) {
                            return d.id_carac == 257
                        });
                        value.sup_total = value.propiedad_caracteristicas.filter(function (d) {
                            return d.id_carac == 198
                        });
                        value.descripcionweb = value.propiedad_caracteristicas.filter(function (d) {
                            return d.id_carac == 255
                        });
                    });
                    //console.log($scope.property);
                }

                function setChar(data) {
                    $scope.property.terminaciones = data.filter(function (d) {
                        return d.id_carac == 73
                    });
                    $scope.property.amenities = data.filter(function (d) {
                        return d.id_carac == 71
                    });
                    $scope.property.fotos = data.filter(function (d) {
                        return d.id_carac == 75
                    });
                    $scope.property.fotos[0].contenidoAct = JSON.parse($scope.property.fotos[0].contenidoAct);
                    $scope.property.amenities[0].contenidoAct = JSON.parse($scope.property.amenities[0].contenidoAct);
                    $scope.property.terminaciones[0].contenidoAct = JSON.parse($scope.property.terminaciones[0].contenidoAct);
                    $scope.property.fotos[0].images = [];
                    var htmlObject = $($scope.property.fotos[0].contenido);
                    angular.forEach(htmlObject, function(value, key) {
                        var htmlObjectInner = $(value.innerHTML);
                        if(htmlObjectInner[0] && htmlObjectInner[0].tagName == 'IMG'){
                            angular.forEach(htmlObjectInner[0].attributes, function(valueIn, keyIn) {
                                if(valueIn.name == 'src'){
                                    $scope.property.fotos[0].images.push(valueIn.nodeValue);
                                    //console.log(valueIn.nodeValue);
                                }
                            });
                        }
                    });
                    //console.log($scope.property.fotos[0].images);

                }

                function setMap(data) {
                    if (data && data.goglat && data.goglong && (data.ubicacion || data.comentario)) {
                        $scope.map.center = {latitude: data.goglat, longitude: data.goglong};
                        var title = (data.ubicacion) ? data.ubicacion : data.comentario;
                        $scope.map.markers.push(
                            {
                                id: data.id_emp,
                                coords: {latitude: data.goglat, longitude: data.goglong},
                                options: {
                                    title: title
                                }
                            })
                    }
                }

                $scope.getParam = function () {
                    //console.log($routeParams);
                    $scope.param = $routeParams.id;
                };

                function setData(response) {
                    $scope.property = response.data;
                    if($scope.property){
                        setMap($scope.property);
                        setPropChar($scope.property);
                        setChar($scope.property.caracteristicas);
                        $scope.pdf();
                        /*$timeout(function () {
                            entitiesService.wowSlider();
                        }, 0);*/
                    }
                    if ($scope.isLogged) {
                        favoritesService.getAll(function (data) {
                            return data;
                        })
                            .then(function (data) {
                                var isFav = data.some(function (el) {
                                    return el.id_prop == $scope.property.id_prop;
                                });
                                $scope.resultFav = isFav;
                            })
                            .then(function () {
                                $scope.loadingProperties = false;
                            });
                    } else {
                        $scope.resultFav = false;
                        $scope.loadingProperties = false;
                    }

                }

                $scope.getData = function (emprendimiento) {
                    $scope.getParam();
                    if (emprendimiento) {
                        //console.log(emprendimiento);
                        setData(emprendimiento);
                    } else {
                        searchApiService.searchApi.readById($scope.param, true)
                            .then(function (response) {
                                setData(response);
                            })
                    }
                };

                $scope.control = {};

                $scope.refreshMap = function () {
                    entitiesService.refreshMap($scope);
                };

                $scope.moveArrow = function (key) {
                    $scope.tab = key;
                    var pos = 1;
                    if (key == 'f') {
                        entitiesService.moveArrow('venture', pos);
                        return null;
                    }
                    if ($scope.property.video) {
                        pos++;
                    }
                    if (key == 'v') {
                        entitiesService.moveArrow('venture', pos);
                        return null;
                    }
                    if ($scope.property.master) {
                        pos++;
                    }
                    if (key == 'mt') {
                        entitiesService.moveArrow('venture', pos);
                        return null;
                    }
                    if ($scope.map.markers.length) {
                        pos++;
                    }
                    if (key == 'm') {
                        entitiesService.moveArrow('venture', pos);
                        return null;
                    }
                    if ($scope.property.resumen) {
                        pos++;
                    }
                    if (key == 'c') {
                        entitiesService.moveArrow('venture', pos);
                        return null;
                    }
                    if ($scope.property.properties.length) {
                        pos++;
                    }
                    if (key == 'u') {
                        entitiesService.moveArrow('venture', pos);
                        return null;
                    }
                };
                $scope.doFav = function (id) {
                    if ($scope.isLogged) {
                        $scope.resultFav = !$scope.resultFav;

                        var button = angular.element(".prop-" + id);

                        if (button.hasClass('btn-gris-claro-2')) {
                            button.removeClass('btn-gris-claro-2');
                            button.addClass('btn-gris-claro');
                            button.html(
                                '<span class="fa-stack">'
                                + '<i class="fa fa-circle fa-stack-2x"></i>'
                                + '<i class="fa fa-trash fa-stack-1x fa-inverse"></i>'
                                + '</span> Quitar </a>'
                            );
                        } else {
                            button.removeClass('btn-gris-claro');
                            button.addClass('btn-gris-claro-2');
                            button.html(
                                '<span class="fa-stack">'
                                + '<i class="fa fa-circle fa-stack-2x"></i>'
                                + '<i class="fa fa-heart fa-stack-1x fa-inverse"></i>'
                                + '</span> Favorito </a>')
                        }

                        favoritesService.setFavorite(id)
                            .then(function () {

                                favoritesService.count()
                                    .then(function (data) {
                                        $scope.favCount = data;
                                    });
                            });
                    } else {
                        var modal = $uibModal.open({
                            templateUrl: 'templates/modals/login.html',
                            controller: 'loginController',
                            size: 'lg'
                        });
                    }
                };

                if ($scope.isLogged) {
                    favoritesService.count()
                        .then(function (data) {
                            $scope.favCount = data;
                        });
                }

                $scope.editFav = function () {
                    $scope.modal = $uibModal.open({
                        templateUrl: 'templates/modals/account.html',
                        controller: 'accountController',
                        size: 'xl',
                        resolve: {
                            tab: function () {
                                return 'fav';
                            }
                        }
                    });

                    $scope.modal.result.catch(function () {
                        favoritesService.count()
                            .then(function (data) {
                                $scope.favCount = data;
                            });
                    });
                };

                $scope.trustAsHtml = function (html) {
                    return entitiesService.trustHtml(html);
                };


                $scope.init();

            })
})();

