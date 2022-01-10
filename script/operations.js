/* jshint esversion: 6 */
//import 'dist/leaflet/include-leaflet.js';
//import 'js/node_modules/leaflet.marker.highlight/index.js';
var map;
var url = "http://localhost:8090/iserver/services/map-Campus/rest/maps/Campus";
var urldata = "http://localhost:8090/iserver/services/data-Campus/rest/data";
function onPageLoad() {
  map = L.map("map", {
    center: [32.11, 118.9],
    zoom: 15,
    crs: L.CRS.EPSG4326,
  });
  L.supermap.tiledMapLayer(url).addTo(map);
}

// 全图显示
function Fullwidth() {
  var latlng = L.latLng(32.11, 118.9);
  map.setView(latlng, 14);
}
// 放大
function enlarge() {
  map.zoomIn(2);
}
function narrow() {
  map.zoomOut(2);
}
// 平移
function translation() {
  map.panTo([32.11, 118.91]);
}
// 清除
function clearr() {
  map.removeLayer();
}
// 距离量算
function distance() {
  var handler = new L.Draw.Polyline(map);
  handler.enable();
  map.on(L.Draw.Event.CREATED, function (e) {
    var type = e.layerType,
      layer = e.layer;
    map.addLayer(layer);
    var distanceMeasureParam = new SuperMap.MeasureParameters(layer);
    L.supermap
      .measureService(url)
      .measureDistance(distanceMeasureParam, function (serviceResult) {
        var content = "距离为" + "：" + serviceResult.result.distance + "米";
        alert(content);
      });
  });
}
// 面积量算
function measure() {
  var handler = new L.Draw.Polygon(map);
  handler.enable();
  map.on(L.Draw.Event.CREATED, function (e) {
    var type = e.layerType,
      layer = e.layer;
    map.addLayer(layer);
    var areaMeasureParam = new SuperMap.MeasureParameters(polygon);
    L.supermap
      .measureService(url)
      .measureArea(areaMeasureParam, function (serviceResult) {
        var content = "面积为:" + serviceResult.result.area + "平方米";
        alert(content);
      });
  });
}

// 右上角全局搜索
function globalsearch() {
  var k = $("#quanju").val().toString();
  if(k == '') {
    alert("请输入信息后再做查询！");
    return;
  }
  var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
    queryParameter: {
      name: "POIs@Campus",
      attributeFilter: "Name like '%" + k + "%'",
    },
    datasetNames: ["Campus:POIs"],
  });
  L.supermap
    .featureService(urldata)
    .getFeaturesBySQL(sqlParam, function (serviceResult) {
      resultLayer = L.geoJSON(serviceResult.result.features).addTo(map);
    });
}

// 公共设施查询

function globalsearch1(){
  
}

