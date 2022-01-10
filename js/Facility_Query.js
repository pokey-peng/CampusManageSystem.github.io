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
$(function() {
    $("[data-toggle='tooltip']").tooltip();
});

// 控制左边菜单栏滑入滑出
$('#btn').click(function() {
    if (n == 1) {
        $('#test').animate({
            'margin-left': '0px'
        },
        250);
        $('#map').animate({},
        2500);
        n = n - 1;

    } else {
        $('#test').animate({
            'margin-left': '-300px'
        },
        250);
        $('#map').animate({
            'margin-left': '50px'
        },
        350);
        n = n + 1;
    }
});

// 绿色小块显隐
$('#ldcxclick').click(function() {
    $('#ldcxdiv').css({
        "display": "block"
    });
    $('#lddjdiv').css({
        "display": "none"
    });
    $('#ldcxxdiv').css({
        "display": "none"
    });
    $('#ldbxdiv').css({
        "display": "none"
    });
    $('#xyljdiv').css({
        "display": "none"
    });
});
$('#lddjclick').click(function() {
    $('#ldcxdiv').css({
        "display": "none"
    });
    $('#lddjdiv').css({
        "display": "block"
    });
    $('#ldcxxdiv').css({
        "display": "none"
    });
    $('#ldbxdiv').css({
        "display": "none"
    });
    $('#xyljdiv').css({
        "display": "none"
    });
});
$('#ldcxxclick').click(function() {
    $('#ldcxdiv').css({
        "display": "none"
    });
    $('#lddjdiv').css({
        "display": "none"
    });
    $('#ldcxxdiv').css({
        "display": "block"
    });
    $('#ldbxdiv').css({
        "display": "none"
    });
    $('#xyljdiv').css({
        "display": "none"
    });
});
$('#ldbxclick').click(function() {
    $('#ldcxdiv').css({
        "display": "none"
    });
    $('#lddjdiv').css({
        "display": "none"
    });
    $('#ldcxxdiv').css({
        "display": "none"
    });
    $('#ldbxdiv').css({
        "display": "block"
    });
    $('#xyljdiv').css({
        "display": "none"
    });
});
$('#xyljclick').click(function() {
    $('#ldcxdiv').css({
        "display": "none"
    });
    $('#lddjdiv').css({
        "display": "none"
    });
    $('#ldcxxdiv').css({
        "display": "none"
    });
    $('#ldbxdiv').css({
        "display": "none"
    });
    $('#xyljdiv').css({
        "display": "block"
    });
});

$('#nhcxclick').click(function() {
    $('#nhcxdiv').css({
        "display": "block"
    });
    $('#nhtjdiv').css({
        "display": "none"
    });
    $('#cbzsdiv').css({
        "display": "none"
    });
});
$('#nhtjclick').click(function() {
    $('#nhcxdiv').css({
        "display": "none"
    });
    $('#nhtjdiv').css({
        "display": "block"
    });
    $('#cbzsdiv').css({
        "display": "none"
    });
});
$('#cbzsclick').click(function() {
    $('#nhcxdiv').css({
        "display": "none"
    });
    $('#nhtjdiv').css({
        "display": "none"
    });
    $('#cbzsdiv').css({
        "display": "block"
    });
});

$('#lhssclick').click(function() {
    $('#lhssdiv').css({
        "display": "block"
    });
    $('#lhtjdiv').css({
        "display": "none"
    });
    $('#lhwhdiv').css({
        "display": "none"
    });
});
$('#lhtjclick').click(function() {
    $('#lhssdiv').css({
        "display": "none"
    });
    $('#lhtjdiv').css({
        "display": "block"
    });
    $('#lhwhdiv').css({
        "display": "none"
    });
});
$('#lhwhclick').click(function() {
    $('#lhssdiv').css({
        "display": "none"
    });
    $('#lhtjdiv').css({
        "display": "none"
    });
    $('#lhwhdiv').css({
        "display": "block"
    });
});

$('#lxcxclick').click(function() {
    $('#lxcxdiv').css({
        "display": "block"
    });
    $('#xzlxdiv').css({
        "display": "none"
    });
    $('#bjlxdiv').css({
        "display": "none"
    });
    $('#sclxdiv').css({
        "display": "none"
    });
});
$('#xzlxclick').click(function() {
    $('#lxcxdiv').css({
        "display": "none"
    });
    $('#xzlxdiv').css({
        "display": "block"
    });
    $('#bjlxdiv').css({
        "display": "none"
    });
    $('#sclxdiv').css({
        "display": "none"
    });
});
$('#bjlxclick').click(function() {
    $('#lxcxdiv').css({
        "display": "none"
    });
    $('#xzlxdiv').css({
        "display": "none"
    });
    $('#bjlxdiv').css({
        "display": "block"
    });
    $('#sclxdiv').css({
        "display": "none"
    });
});
$('#sclxclick').click(function() {
    $('#lxcxdiv').css({
        "display": "none"
    });
    $('#xzlxdiv').css({
        "display": "none"
    });
    $('#bjlxdiv').css({
        "display": "none"
    });
    $('#sclxdiv').css({
        "display": "block"
    });
});

$('#ldgl').click(function() {
    $('#ld').css({
        "display": "block"
    });
    $('#nh').css({
        "display": "none"
    });
    $('#xc').css({
        "display": "none"
    });
    $('#lh').css({
        "display": "none"
    });
    $('#bd').css({
        "display": "none"
    });
});

// 量算
function completed(e) {
    editableLayers.addLayer(e.layer);
    var param1 = new SuperMap.MeasureParameters(e.layer);
    ally = e.layer.toGeoJSON();
    if (handler1 != 'null') {
        L.supermap.measureService(url).measureArea(param1,
        function(result) {
            alert(result.result.area + "平方米");
            editableLayers.removeLayer(e.layer);
        });
        handler1 = 'null';
    }
    if (handler2 != 'null') {
        L.supermap.measureService(url).measureDistance(param1,
        function(result) {
            alert(result.result.distance + "米");
            editableLayers.removeLayer(e.layer);
        });
        handler2 = 'null';
    }
    if (handler3 != 'null') {
        editableLayerss.addLayer(e.layer);
        handler3 = 'null';
    }
}

function next() {
    w1 = document.getElementById('myul');
    w2 = document.getElementById('myull');
    w3 = document.getElementById('myulll');
    w4 = document.getElementById('myullll');
    c1 = $('#myul').children().size();
    c2 = $('#myull').children().size();
    c3 = $('#myulll').children().size();
    c4 = $('#myullll').children().size();
    // 通过点击下一页，判断每一页的样式
    if (w1.style.display == 'block' && w2.style.display == 'none' && w3.style.display == 'none' && w4.style.display == 'none' && c1 == 4 && c2 > 0) {
        w1.style.display = 'none';
        w2.style.display = 'block';
        w3.style.display = 'none';
        w4.style.display = 'none';
        $('#lib').removeClass("disabled");
    } else if (w1.style.display == 'none' && w2.style.display == 'block' && w3.style.display == 'none' && w4.style.display == 'none' && c2 == 4 && c3 > 0) {
        w1.style.display = 'none';
        w2.style.display = 'none';
        w3.style.display = 'block';
        w4.style.display = 'none';
    } else if (w1.style.display == 'none' && w2.style.display == 'none' && w3.style.display == 'block' && w4.style.display == 'none' && c3 <= 4 && c4 > 0) {
        w1.style.display = 'none';
        w2.style.display = 'none';
        w3.style.display = 'none';
        w4.style.display = 'block';
        $("#lia").addClass("disabled");
    }
    // 设置之后，当页是否需要设置disabled
    if (w1.style.display == 'none' && w2.style.display == 'block' && w3.style.display == 'none' && w4.style.display == 'none' && c2 <= 4 && c3 == 0) {
        $("#lia").addClass("disabled");
    }
    if (w1.style.display == 'none' && w2.style.display == 'none' && w3.style.display == 'block' && w4.style.display == 'none' && c3 <= 4 && c4 == 0) {
        $("#lia").addClass("disabled");
    }

}

function previous() {
    if (w1.style.display == 'none' && w2.style.display == 'block' && w3.style.display == 'none' && w4.style.display == 'none') {
        w1.style.display = 'block';
        w2.style.display = 'none';
        w3.style.display = 'none';
        w4.style.display = 'none';
        $('#lib').addClass("disabled");
        $(function() {
            $("[data-toggle='tooltip']").tooltip();
        });
        $("#lia").removeClass("disabled");
    } else if (w1.style.display == 'none' && w2.style.display == 'none' && w3.style.display == 'block' && w4.style.display == 'none') {
        w1.style.display = 'none';
        w2.style.display = 'block';
        w3.style.display = 'none';
        w4.style.display = 'none';
        $("#lia").removeClass("disabled");
    } else if (w1.style.display == 'none' && w2.style.display == 'none' && w3.style.display == 'none' && w4.style.display == 'block') {
        w1.style.display = 'none';
        w2.style.display = 'none';
        w3.style.display = 'block';
        w4.style.display = 'none';
        $("#lia").removeClass("disabled");
    }
}

// 右上角全局搜索
function globalsearch() {
    oo.closePopup();
    oo.clearLayers();
    var biao1 = document.getElementById('biao');
            biao1.style.display = 'block';
    var kkk = $('#quanju').val().toString();
    if (kkk == '') {
        alert('请输入信息后再做查询！');
    } else {
        $("#collapseOne").addClass('in');
        $("#collapseOne").attr("aria-expanded", "true");
        if (kkk == '建筑物') {
            $("#biaodan tr").remove();
            $('#quanju').val('');
            quanjuobj = [];
            quanjulist = [];
            var biao = document.getElementById('biaodan');
            var biao1 = document.getElementById('biao');
            biao1.style.display = 'block';
            var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
                queryParameter: {
                    name: "POIs@Campus"
                },
                datasetNames: ["Campus:POIs"],
                toIndex: 1000
            });
            L.supermap.featureService(url2).getFeaturesBySQL(sqlParam,
            function(serviceResult) {
                var r = serviceResult.result.features.features;
                var pod = document.createElement("TR");
                pod.innerHTML = '<td style="font-size:15px;color:#698B22;width:100px;">名称</td>' + '<td style="font-size:15px;color:#698B22;">ID号</td>' + '<td style="font-size:15px;color:#698B22;">所属类型</td>';
                biao.appendChild(pod);
                for (i = 0; i < r.length; i++) {
                    quanjulist.push(document.createElement("TR"));
                    quanjuobj.push(r[i]);
                    quanjulist[i].innerHTML = '<td>' + r[i].properties.NAME + '</td>' + '<td>' + r[i].properties.SMID + '</td>' + '<td>' + r[i].properties.TYPE + '</td>';
                    quanjulist[i].style.height = '30px';
                    quanjulist[i].style.lineHeight = '30px';
                    quanjulist[i].setAttribute('name', r[i].properties.NAME);
                    quanjulist[i].setAttribute('x', r[i].properties.SMX);
                    quanjulist[i].id = e;
                    quanjulist[i].onclick = function() {
                        oo.closePopup();
                        oo.clearLayers();
                        var name = $(this).find('td').eq(0).text();
                        YYY = this.getAttribute('y');
                        XXX = this.getAttribute('x');
                        f = $(this).index();
                        var content = '<p>' + name + '</p>';
                        oo.addData(r[f]).bindPopup(content).openPopup();
                        map.addLayer(oo);
                    };
                    biao.appendChild(quanjulist[i]);
                    e = e + 1;
                }
            });
        } else if (kkk == '校车路线') {
            layertest = [];
            route.clearLayers();
            map.removeLayer(myGrouptest);
            map.removeLayer(myGroupstart);
            myGroupend.clearLayers();
            myGroupstart.clearLayers();
            $("#biaodan tr").remove();
            $('#quanju').val('');
            quanjuobj = [];
            quanjulist = [];
            $("#biaodan tr").remove();
            var biao = document.getElementById('biaodan');
            var biao1 = document.getElementById('biao');
            biao1.style.display = 'block';
            var pood = document.createElement("TR");
            pood.innerHTML = '<td style="font-size:15px;color:#698B22;">路线名称</td>' + '<td style="font-size:15px;color:#698B22;">时间表</td>' + '<td style="font-size:15px;color:#698B22;">路线类型</td>';
            biao.appendChild(pood);
            var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
                queryParameter: {
                    name: "BusLine@Campus"
                },
                datasetNames: ["Campus:BusLine"],
                toIndex: 1000
            });
            L.supermap.featureService(url2).getFeaturesBySQL(sqlParam,
            function(serviceResult) {
                var r = serviceResult.result.features.features;
                for (i = 0; i < r.length; i++) {
                    quanjulist.push(document.createElement("TR"));
                    quanjuobj.push(r[i]);
                    quanjulist[i].innerHTML = '<td>' + r[i].properties.NAME + '</td>' + '<td>' + r[i].properties.DSECRIPTION + '</td>' + '<td>' + r[i].properties.TYPE + '</td>';
                    quanjulist[i].style.height = '30px';
                    quanjulist[i].style.lineHeight = '30px';
                    quanjulist[i].onclick = function() {
                        f = $(this).index() - 1;
                        oo.clearLayers();
                        oo.addData(r[f]);
                        map.addLayer(oo);
                    };
                    biao.appendChild(quanjulist[i]);
                }
            });
        } else {
            $("#biaodan tr").remove();
            $('#quanju').val('');
            quanjuobj = [];
            quanjulist = [];
            var biao = document.getElementById('biaodan');
            var biao1 = document.getElementById('biao');
            biao1.style.display = 'block';
            var pood = document.createElement("TR");
            pood.innerHTML = '<td style="font-size:15px;color:#698B22;width:100px;">名称</td>' + '<td style="font-size:15px;color:#698B22;">类型</td>' + '<td style="font-size:15px;color:#698B22;">所属区域</td>';
            biao.appendChild(pood);
            var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
                queryParameter: {
                    name: "POIs@Campus",
                    attributeFilter: "Name like '%" + kkk + "%'"
                },
                datasetNames: ["Campus:POIs"],
                toIndex: 1000
            });
            L.supermap.featureService(url2).getFeaturesBySQL(sqlParam,
            function(serviceResult) {
                var f = serviceResult.result.features.features;
                for (i = 0; i < f.length; i++) {
                    if (f[i].geometry.type == 'Point') {
                        var tabpoint = document.createElement("TR");
                        tabpoint.innerHTML = '<td>' + f[i].properties.NAME + '</td>' + '<td>建筑物</td>' + '<td>' + f[i].properties.TYPE + '</td>';
                        tabpoint.style.height = '30px';
                        tabpoint.style.lineHeight = '30px';
                        tabpoint.onclick = function() {
                            var name = $(this).find('td').eq(0).text();
                            z = $(this).index() - 1;
                            oo.clearLayers();
                            var content = '<p>' + name + '</p>';
                            oo.addData(f[z]).bindPopup(content).openPopup();
                            map.addLayer(oo);
                        };
                            biao.appendChild(tabpoint);
                    } else if (f[i].geometry.type == 'MultiPolygon') {
                        var tabpoy = document.createElement("TR");
                        tabpoy.innerHTML = '<td>' + f[i].properties.NAME + '</td>' + '<td>建筑区域</td>' + '<td>' + f[i].properties.TYPE + '</td>';
                        tabpoy.style.height = '30px';
                        tabpoy.style.lineHeight = '30px';
                        tabpoy.onclick = function() {
                            var name = $(this).find('td').eq(0).text();
                            z = $(this).index() - 1;
                            oo.clearLayers();
                            var content = '<p>' + name + '</p>';
                            oo.addData(f[z]).bindPopup(content).openPopup();
                            map.addLayer(oo);
                        };
                            biao.appendChild(tabpoy);
                    } else if (f[i].geometry.type == 'LineString') {
                        var tabrow = document.createElement("TR");
                        tabrow.innerHTML = '<td>' + f[i].properties.NAME + '</td>' + '<td>路线</td>' + '<td>' + f[i].properties.TYPE + '</td>';
                        tabrow.style.height = '30px';
                        tabrow.style.lineHeight = '30px';
                        tabrow.onclick = function() {
                            var name = $(this).find('td').eq(0).text();
                            z = $(this).index() - 1;
                            oo.clearLayers();
                            var content = '<p>' + name + '</p>';
                            oo.addData(f[z]).bindPopup(content).openPopup();
                            map.addLayer(oo);
                        };
                            biao.appendChild(tabrow);
                    }
                }
            });
        }
    }
}

// 公共设置查询
function globalsearch1() {
    oo.closePopup();
    oo.clearLayers();
    var kkk = $('#jianzhu').val().toString();
    if (kkk == '') {
        alert('请输入信息后再做查询！');
    } else {
        if (kkk == '建筑物') {
            $("#biaodan tr").remove();
            $('#jianzhu').val('');
            quanjuobj = [];
            quanjulist = [];
            var biao = document.getElementById('biaodan');
            var biao1 = document.getElementById('biao');
            biao1.style.display = 'block';
            var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
                queryParameter: {
                    name: "POIs@Campus"
                },
                datasetNames: ["Campus:POIs"],
                toIndex: 1000
            });
            L.supermap.featureService(url2).getFeaturesBySQL(sqlParam,
            function(serviceResult) {
                var r = serviceResult.result.features.features;
                var pod = document.createElement("TR");
                pod.innerHTML = '<td style="font-size:15px;color:#698B22;width:100px;">名称</td>' + '<td style="font-size:15px;color:#698B22;">ID号</td>' + '<td style="font-size:15px;color:#698B22;">所属类型</td>';
                biao.appendChild(pod);
                for (i = 0; i < r.length; i++) {
                    quanjulist.push(document.createElement("TR"));
                    quanjuobj.push(r[i]);
                    quanjulist[i].innerHTML = '<td>' + r[i].properties.NAME + '</td>' + '<td>' + r[i].properties.SMID + '</td>' + '<td>' + r[i].properties.TYPE + '</td>';
                    quanjulist[i].style.height = '30px';
                    quanjulist[i].style.lineHeight = '30px';
                    quanjulist[i].setAttribute('name', r[i].properties.NAME);
                    quanjulist[i].setAttribute('x', r[i].properties.SMX);
                    quanjulist[i].id = e;
                    quanjulist[i].onclick = function() {
                        oo.clearLayers();
                        var name = $(this).find('td').eq(0).text();
                        f = $(this).index();
                        var content = '<p>' + name + '</p>';
                        oo.addData(r[f]).bindPopup(content).openPopup();
                        map.addLayer(oo);
                    };
                    biao.appendChild(quanjulist[i]);
                    e = e + 1;
                }
            });
        } else if (kkk == '校车路线') {
            layertest = [];
            route.clearLayers();
            map.removeLayer(myGrouptest);
            map.removeLayer(myGroupstart);
            myGroupend.clearLayers();
            myGroupstart.clearLayers();
            $("#biaodan tr").remove();
            $('#jianzhu').val('');
            quanjuobj = [];
            quanjulist = [];
            $("#biaodan tr").remove();
            var biao = document.getElementById('biaodan');
            var biao1 = document.getElementById('biao');
            biao1.style.display = 'block';
            var pood = document.createElement("TR");
            pood.innerHTML = '<td style="font-size:15px;color:#698B22;">路线名称</td>' + '<td style="font-size:15px;color:#698B22;">时间表</td>' + '<td style="font-size:15px;color:#698B22;">路线类型</td>';
            biao.appendChild(pood);
            var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
                queryParameter: {
                    name: "BusLine@Campus"
                },
                datasetNames: ["Campus:BusLine"],
                toIndex: 1000
            });
            L.supermap.featureService(url2).getFeaturesBySQL(sqlParam,
            function(serviceResult) {
                var r = serviceResult.result.features.features;
                for (i = 0; i < r.length; i++) {
                    quanjulist.push(document.createElement("TR"));
                    quanjuobj.push(r[i]);
                    quanjulist[i].innerHTML = '<td>' + r[i].properties.NAME + '</td>' + '<td>' + r[i].properties.DSECRIPTION + '</td>' + '<td>' + r[i].properties.TYPE + '</td>';
                    quanjulist[i].style.height = '30px';
                    quanjulist[i].style.lineHeight = '30px';
                    quanjulist[i].onclick = function() {
                        f = $(this).index() - 1;
                        oo.clearLayers();
                        oo.addData(r[f]);
                        map.addLayer(oo);
                    };
                    biao.appendChild(quanjulist[i]);
                }
            });
        } else {
            $("#biaodan tr").remove();
            $('#jianzhu').val('');
            quanjuobj = [];
            quanjulist = [];
            var biao = document.getElementById('biaodan');
            var biao1 = document.getElementById('biao');
            biao1.style.display = 'block';
            var pood = document.createElement("TR");
            pood.innerHTML = '<td style="font-size:15px;color:#698B22;width:100px;">名称</td>' + '<td style="font-size:15px;color:#698B22;">类型</td>' + '<td style="font-size:15px;color:#698B22;">所属区域</td>';
            biao.appendChild(pood);
            var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
                queryParameter: {
                    name: "POIs@Campus",
                    attributeFilter: "Name like '%" + kkk + "%'"
                },
                datasetNames: ["Campus:POIs"],
                toIndex: 1000
            });
            L.supermap.featureService(url2).getFeaturesBySQL(sqlParam,
            function(serviceResult) {
                var f = serviceResult.result.features.features;
                for (i = 0; i < f.length; i++) {
                    if (f[i].geometry.type == 'Point') {
                        var tabpoint = document.createElement("TR");
                        tabpoint.innerHTML = '<td>' + f[i].properties.NAME + '</td>' + '<td>建筑物</td>' + '<td>' + f[i].properties.TYPE + '</td>';
                        tabpoint.style.height = '30px';
                        tabpoint.style.lineHeight = '30px';
                        tabpoint.onclick = function() {
                            var name = $(this).find('td').eq(0).text();
                            z = $(this).index() - 1;
                            oo.clearLayers();
                            var content = '<p>' + name + '</p>';
                            oo.addData(f[z]).bindPopup(content).openPopup();
                            map.addLayer(oo);
                        };
                        biao.appendChild(tabpoint);
                    } else if (f[i].geometry.type == 'MultiPolygon') {
                        var tabpoy = document.createElement("TR");
                        tabpoy.innerHTML = '<td>' + f[i].properties.NAME + '</td>' + '<td>建筑区域</td>' + '<td>' + f[i].properties.TYPE + '</td>';
                        tabpoy.style.height = '30px';
                        tabpoy.style.lineHeight = '30px';
                        tabpoy.onclick = function() {
                            var name = $(this).find('td').eq(0).text();
                            z = $(this).index() - 1;
                            oo.clearLayers();
                            var content = '<p>' + name + '</p>';
                            oo.addData(f[z]).bindPopup(content).openPopup();
                            map.addLayer(oo);
                        };
                        biao.appendChild(tabpoy);
                    } else if (f[i].geometry.type == 'LineString') {
                        var tabrow = document.createElement("TR");
                        tabrow.innerHTML = '<td>' + f[i].properties.NAME + '</td>' + '<td>路线</td>' + '<td>' + f[i].properties.TYPE + '</td>';
                        tabrow.style.height = '30px';
                        tabrow.style.lineHeight = '30px';
                        tabrow.onclick = function() {
                            var name = $(this).find('td').eq(0).text();
                            z = $(this).index() - 1;
                            oo.clearLayers();
                            var content = '<p>' + name + '</p>';
                            oo.addData(f[z]).bindPopup(content).openPopup();
                            map.addLayer(oo);
                        };
                        biao.appendChild(tabrow);
                    }
                }
            });
        }
    }
}

// 公共设施查询清除按钮
function cleardataa(){
    oo.closePopup();
    oo.clearLayers();
    $("#biaodan tr").remove();
    $('#jianzhu').val('');
    quanjuobj = [];
    quanjulist = [];
    var biao = document.getElementById('biaodan');
    var biao1 = document.getElementById('biao');
    biao1.style.display = 'none';
}

var n=0;
var w1,w2,w3,w4,c1,c2,c3,c4;
var handler1='null';
var handler2='null';
var handler3='null';
var objid=[];
var ally;
var newresultLayer='null';
var allresultLayer='null';
var editableLayerss;
var map, url ="http://localhost:8090/iserver/services/map-Campus/rest/maps/Campus";
var url2="http://localhost:8090/iserver/services/data-Campus/rest/data";
var url3="http://localhost:8090/iserver/services/data-Campus/rest/data/datasources/Campus/datasets/StreetLights";
var url4="http://localhost:8090/iserver/services/transportationAnalyst-Campus/rest/networkanalyst/RoadNetwork@Campus";
// 创建地图窗口
    map = L.map('map', {
        crs: L.CRS.EPSG4326,
        center: [ 32.1101, 118.902],
        minZoom: 14,
        maxZoom: 18,
        zoom: 15
    });
// 添加地图
    L.supermap.tiledMapLayer(url).addTo(map);
// 创建图层组
    var editableLayers = new L.FeatureGroup();
    map.addLayer(editableLayers);
    $("#map").css("position","sticky");
// 监听绘制
    map.on(L.Draw.Event.CREATED,completed);

    // 右边的按钮组
function Fullwidth(){
    var latlng = L.latLng(32.1101, 118.905);
    map.setView([32.1101, 118.905],14);
}
function enlarge(){
    map.zoomIn();
}
function narrow(){
    map.zoomOut();
}
function measure(){
    handler1 = new L.Draw.Polygon(map);
    handler1.enable();          
}
function distance(){
    handler2 = new L.Draw.Polyline(map);
    handler2.enable();
}   
function translation(){
    map.panTo( [32.11,118.91] );
}
function clearr(){
    oo.closePopup();
    oo.clearLayers();
    layertest=[];
    route.clearLayers();
    map.removeLayer(myGrouptest);
    map.removeLayer(myGroupstart);
    myGroupend.clearLayers();
    myGroupstart.clearLayers();
}