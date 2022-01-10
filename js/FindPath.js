var quanjuobj;
var quanjulist = [];
var e = 0;
var oo = L.geoJSON();
var YYY, XXX;
var startx, starty;
var endx, endy;
var myIconstart;
var route = L.geoJSON();
var arr;
var listt = [];
var routepng;
var layertest = [];
var myGrouptest = L.layerGroup();
var myGroupstart = L.layerGroup();
var myGroupend = L.layerGroup();
var kk, kkk;
var carName = [];
var bn = 0;


// input框监听事件
function gaibian() {
    bn = 0;
    carName = [];
    // 先做一个查询
    var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
        queryParameter: {
            name: "POIs@Campus"
        },
        datasetNames: ["Campus:POIs"],
        toIndex: 1000
    });
    L.supermap.featureService(url2).getFeaturesBySQL(sqlParam,
    function(serviceResult) {
        var f = serviceResult.result.features.features;
        console.log(f);
        for (var h = 0; h < f.length; h++) {
            carName.push(f[h].properties.NAME);
        }
        $('#xialai').css({
            'display': 'block'
        });
        var kkk = $('#dropdownMenu1').val().toString();
        if (kkk == '') {
            arr = [];
            $(".dropdown-menu").find("li").remove();
            $('#xialai').css({
                'display': 'none'
            });
        } else {
            //字符串方法indexOf
            var len = carName.length;
            var arr = [];
            for (var i = 0; i < len; i++) {
                //如果字符串中不包含目标字符会返回-1
                if (carName[i].indexOf(kkk) >= 0) {
                    arr.push(carName[i]);
                }
            }
            console.log(arr);
            $(".dropdown-menu").find("li").remove();
            for (var t = 0; t < arr.length; t++) {
                listt.push(document.createElement("li"));
                listt[t].innerHTML = '<a>' + arr[t] + '</a>';
                listt[t].setAttribute('name', arr[t]);
                listt[t].onclick = function() {
                    var YYY = this.getAttribute('name');
                    $('#dropdownMenu1').val(YYY);
                    $('#xialai').css({
                        'display': 'none'
                    });
                }
                var qqq = document.getElementById('xialai');
                qqq.appendChild(listt[t]);
            }
        }
    });
}

// input框监听事件
function gaibian2() {
    bn = 0;
    carName = [];
    // 先做一个查询
    var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
        queryParameter: {
            name: "POIs@Campus"
        },
        datasetNames: ["Campus:POIs"],
        toIndex: 1000
    });
    L.supermap.featureService(url2).getFeaturesBySQL(sqlParam,
    function(serviceResult) {
        var f = serviceResult.result.features.features;
        for (var h = 0; h < f.length; h++) {
            carName.push(f[h].properties.NAME);
        }
        $('#xialai2').css({
            'display': 'block'
        });
        var kkk = $('#dropdownMenu2').val().toString();
        if (kkk == '') {
            arr = [];
            $(".dropdown-menu").find("li").remove();
            $('#xialai2').css({
                'display': 'none'
            });
        } else {
            //字符串方法indexOf
            var len = carName.length;
            var arr = [];
            for (var i = 0; i < len; i++) {
                //如果字符串中不包含目标字符会返回-1
                if (carName[i].indexOf(kkk) >= 0) {
                    arr.push(carName[i]);
                }
            }
            $(".dropdown-menu").find("li").remove();
            for (var t = 0; t < arr.length; t++) {
                listt.push(document.createElement("li"));
                listt[t].innerHTML = '<a>' + arr[t] + '</a>';
                listt[t].setAttribute('name', arr[t]);
                listt[t].onclick = function() {
                    var YYY = this.getAttribute('name');
                    $('#dropdownMenu2').val(YYY);
                    $('#xialai2').css({
                        'display': 'none'
                    });
                }
                var qqq = document.getElementById('xialai2');
                qqq.appendChild(listt[t]);
            }
        }
    });
}

// 这是一个键盘监听
$("#dropdownMenu1").keydown(function(e) {
    switch (e.keyCode) {
    case 40:
        var g = $(".dropdown-menu").find("li").length;
        if (bn < g) {
            $(".dropdown-menu").find("li").removeClass('active');
            $(".dropdown-menu").find("li").eq(bn).addClass('active');
            bn = bn + 1;
        }
        break;

    case 38:
        if (bn > 1) {
            $(".dropdown-menu").find("li").removeClass('active');
            $(".dropdown-menu").find("li").eq(bn - 2).addClass('active');
            bn = bn - 1;
        }
        break;
    case 13:
        var YYY = $('.dropdown-menu').find(".active").attr('name');
        if(YYY==undefined){
           $('#xialai').css({
            'display': 'none'
        });
        }else{
            $('#dropdownMenu1').val(YYY);
        $('#xialai').css({
            'display': 'none'
        });
        }
        $('.dropdown-menu').find(".active").removeClass('active');
        bn = 0;
        break;
    default:
        break;
    }
});
$("#dropdownMenu2").keydown(function(e) {
    switch (e.keyCode) {
    case 40:
        var g = $(".dropdown-menu").find("li").length;
        if (bn < g) {
            $(".dropdown-menu").find("li").removeClass('active');
            $(".dropdown-menu").find("li").eq(bn).addClass('active');
            bn = bn + 1;
        }
        break;
    case 38:
        if (bn > 1) {
            $(".dropdown-menu").find("li").removeClass('active');
            $(".dropdown-menu").find("li").eq(bn - 2).addClass('active');
            bn = bn - 1;
        }
        break;
    case 13:
        var YYY = $('.dropdown-menu').find(".active").attr('name');
        if(YYY===undefined){
 $('#xialai2').css({
            'display': 'none'
        });
        }else{
           $('#dropdownMenu2').val(YYY);
        $('#xialai2').css({
            'display': 'none'
        });
        }
        $('.dropdown-menu').find(".active").removeClass('active');
        bn = 0;
        break;
    default:
        break;
    }
});
// 清除
function clearlist() {
    var biao = document.getElementById('biaodan');
    var biao1 = document.getElementById('biao');
    $("#biaodan tr").remove();
    biao1.style.display = 'none';
}

// 清除结果
function donthave() {
    $('#dropdownMenu1').val('');
    $('#dropdownMenu2').val('');
    clearlist();
    clearr();
}

// 获取路线
function gethave() {
    Fullwidth();
    oo.clearLayers();
    layertest = [];
    route.clearLayers();
    map.removeLayer(myGrouptest);
    map.removeLayer(myGroupstart);
    map.removeLayer(myGroupend);
    myGroupend.clearLayers();
    myGroupstart.clearLayers();
    var kl = $("#dropdownMenu1").val();
    var km = $("#dropdownMenu2").val();
    var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
        queryParameter: {
            name: "POIs@Campus",
            attributeFilter: "POIs.Name in (" + "'" + kl + "'" + "," + "'" + km + "'" + ")"
        },
        datasetNames: ["Campus:POIs"],
        toIndex: 1000
    });
    L.supermap.featureService(url2).getFeaturesBySQL(sqlParam,
    function(serviceResult) {
        console.log(serviceResult);
        var f = serviceResult.result.features.features;
        var gg=f[0].properties.NAME;
        console.log(gg.indexOf(kl));
        // alert(gg.indexOf(kl)); -1是错的
         if(gg.indexOf(kl)==0){
                    if (serviceResult.result.features.features.length < 2) {
            alert('信息模糊，请输入详细信息');
        } else {
            var startx = f[0].properties.SMX;
            var starty = f[0].properties.SMY;
            var endx = f[1].properties.SMX;
            var endy = f[1].properties.SMY;
            var myIconend = L.icon({
                iconUrl: 'img/start.png',
                iconSize: [30, 30]
            });
            var layerend20 = L.marker([starty, startx], {
                icon: myIconend
            });
            var myIconend = L.icon({
                iconUrl: 'img/end.png',
                iconSize: [30, 30]
            });
            var layerend22 = L.marker([endy, endx], {
                icon: myIconend
            });
            var findPathService = L.supermap.networkAnalystService(url4);
            //创建最佳路径分析参数实例
            var resultSetting = new SuperMap.TransportationAnalystResultSetting({
                returnEdgeFeatures: true,
                returnEdgeGeometry: true,
                returnEdgeIDs: true,
                returnNodeFeatures: true,
                returnNodeGeometry: true,
                returnNodeIDs: true,
                returnPathGuides: true,
                returnRoutes: true
            });
            var analystParameter = new SuperMap.TransportationAnalystParameter({
                resultSetting: resultSetting
            });
            var findPathParameter = new SuperMap.FindPathParameters({
                isAnalyzeById: false,
                nodes: [L.point(startx, starty), L.point(endx, endy)],
                parameter: analystParameter
            });
            var myIcon = L.icon({
                iconUrl: "img/walk.png",
                iconSize: [20, 20]
            });
            //进行查找
            findPathService.findPath(findPathParameter,
            function(serviceResult) {
                var result = serviceResult.result;
                if (result.pathList.length == 0) {
                    alert('未检索到路线，请尝试其他方案');
                } else {
                    result.pathList.map(function(result) {
                        route.addData(result.route);
                        map.addLayer(route);
                        routepng = L.geoJSON(result.pathGuideItems, {
                            pointToLayer: function(geoPoints, latlng) {
                                var q = L.marker(latlng, {
                                    icon: myIcon
                                });
                                layertest.push(q);
                                myGrouptest = L.layerGroup(layertest);
                                map.addLayer(myGrouptest);
                            },
                            filter: function(geoJsonFeature) {
                                if (geoJsonFeature.geometry && geoJsonFeature.geometry.type === 'Point') {
                                    return true;
                                }
                                return false;
                            }
                        });
                        map.addLayer(routepng);
                        myGroupend.addLayer(layerend20);
            myGroupend.addLayer(layerend22);
            map.addLayer(myGroupend);
                    })
                }
            });
        }
         }else{
        if (serviceResult.result.features.features.length < 2) {
            alert('信息模糊，请输入详细信息');
        } else {
            var startx = f[1].properties.SMX;
            var starty = f[1].properties.SMY;
            var endx = f[0].properties.SMX;
            var endy = f[0].properties.SMY;
            var myIconend = L.icon({
                iconUrl: 'img/start.png',
                iconSize: [30, 30]
            });
            var layerend20 = L.marker([starty, startx], {
                icon: myIconend
            });
            var myIconend = L.icon({
                iconUrl: 'img/end.png',
                iconSize: [30, 30]
            });
            var layerend22 = L.marker([endy, endx], {
                icon: myIconend
            });
            var findPathService = L.supermap.networkAnalystService(url4);
            //创建最佳路径分析参数实例
            var resultSetting = new SuperMap.TransportationAnalystResultSetting({
                returnEdgeFeatures: true,
                returnEdgeGeometry: true,
                returnEdgeIDs: true,
                returnNodeFeatures: true,
                returnNodeGeometry: true,
                returnNodeIDs: true,
                returnPathGuides: true,
                returnRoutes: true
            });
            var analystParameter = new SuperMap.TransportationAnalystParameter({
                resultSetting: resultSetting
            });
            var findPathParameter = new SuperMap.FindPathParameters({
                isAnalyzeById: false,
                nodes: [L.point(startx, starty), L.point(endx, endy)],
                parameter: analystParameter
            });
            var myIcon = L.icon({
                iconUrl: "img/walk.png",
                iconSize: [20, 20]
            });
            //进行查找
            findPathService.findPath(findPathParameter,
            function(serviceResult) {
                var result = serviceResult.result;
                if (result.pathList.length == 0) {
                    alert('未检索到路线，请尝试其他方案');
                } else {
                    result.pathList.map(function(result) {
                        route.addData(result.route);
                        map.addLayer(route);
                        routepng = L.geoJSON(result.pathGuideItems, {
                            pointToLayer: function(geoPoints, latlng) {
                                var q = L.marker(latlng, {
                                    icon: myIcon
                                });
                                layertest.push(q);
                                myGrouptest = L.layerGroup(layertest);
                                map.addLayer(myGrouptest);
                            },
                            filter: function(geoJsonFeature) {
                                if (geoJsonFeature.geometry && geoJsonFeature.geometry.type === 'Point') {
                                    return true;
                                }
                                return false;
                            }
                        });
                        map.addLayer(routepng);
                        myGroupend.addLayer(layerend20);
            myGroupend.addLayer(layerend22);
            map.addLayer(myGroupend);
                    })
                }
            });
        }
    }
    });
}