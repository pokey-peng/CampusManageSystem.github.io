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
    map = L.map('map', {
        crs: L.CRS.EPSG4326,
        center: [ 32.1101, 118.902],
        minZoom: 14,
        maxZoom: 18,
        zoom: 15
    });
    L.supermap.tiledMapLayer(url,{cacheEnabled:false,noWrap: true}).addTo(map);
    var editableLayers = new L.FeatureGroup();
    map.addLayer(editableLayers);
    $("#map").css("position","sticky");
 map.on(L.Draw.Event.CREATED,completed);
//echarts
var myChartlight = echarts.init(document.getElementById('light'));

// 右边按钮组的方法
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
    oo.clearLayers();
    layertest=[];
  route.clearLayers();
  map.removeLayer(myGrouptest);
  map.removeLayer(myGroupstart);
  myGroupend.clearLayers();
  myGroupstart.clearLayers();
  map.removeLayer(myGroupp);
     
}