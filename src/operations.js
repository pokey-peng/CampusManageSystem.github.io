/* jshint esversion: 6 */
/*import "../js/node_modules/leaflet.marker.highlight/index.js"; */

var map;
//var url = "http://localhost:8090/iserver/services/map-Campus/rest/maps/Campus";
var url = "http://192.168.101.73:8090/iserver/services/map-Campus/rest/maps/Campus";
var urlOSMap =
  "http://localhost:8090/iserver/services/map-OSM/rest/maps/normal";
var urlTDTImage =
  "http://localhost:8090/iserver/services/map-tianditu/rest/maps/%E5%BD%B1%E5%83%8F%E5%BA%95%E5%9B%BE_%E5%A2%A8%E5%8D%A1%E6%89%98";
var urlTDTVector =
  "http://localhost:8090/iserver/services/map-tianditu/rest/maps/%E7%9F%A2%E9%87%8F%E5%BA%95%E5%9B%BE_%E5%A2%A8%E5%8D%A1%E6%89%98";
var urldata = "http://localhost:8090/iserver/services/data-Campus/rest/data";
var urlOsmChinaData =
  "http://localhost:8090/iserver/services/data-shapefile-chinashp/rest/data";
var urlGrayMap =
  "http://localhost:8090/iserver/services/map-world/rest/maps/%E4%B8%96%E7%95%8C%E5%9C%B0%E5%9B%BE_Gray";
var editableLayers = new L.FeatureGroup();
var searchResultLayer;
var isCampus = true;
var switchComponent;
var OverLayerMap = {};
var overlayers = {};
var areaName;
function onPageLoad() {
  if (isCampus) {
    if (map !== undefined) {
      map.remove();
    }
    map = L.map("map", {
      center: [32.11, 118.9],
      maxZoom: 18,
      minZoom: 1,
      zoom: 15,
      crs: L.CRS.EPSG4326,
    });
    L.supermap.tiledMapLayer(url).addTo(map);
    map.addLayer(editableLayers);
  } else {
    if (map !== undefined) {
      map.remove();
    }
    var VectorLayer = L.supermap.tiledMapLayer(urlOSMap, { noWrap: true });
    var ImageLayer = L.supermap.tiledMapLayer(urlTDTImage, { noWrap: true });
    var VectorTDT = L.supermap.tiledMapLayer(urlTDTVector, { noWrap: true });
    map = L.map("map", {
      center: [0, 0],
      maxZoom: 18,
      minZoom: 2,
      zoom: 2,
      preferCanvas: true,
      // layers: VectorLayer,
    });

    let baseMaps = {
      label: "BaseMap",
      children: [
        {
          label: "OSM",
          children: [{ label: "Vector", layer: VectorLayer }],
        },
        {
          label: "TDT",
          children: [
            { label: "Image", layer: ImageLayer },
            { label: "TDTvector", layer: VectorTDT },
          ],
        },
      ],
    };

    //switchComponent = L.control.orderlayers(baseMaps,{},{position: "topleft"}).addTo(map);
    map.addLayer(campusGeoJson);
    // var osmGeocoder = new L.Control.OSMGeocoder();
    // map.addControl(osmGeocoder);
    changeAttributes();
    switchComponent = L.control.layers
      .tree(baseMaps, {}, { position: "topleft" })
      .addTo(map);
  }
}

// 全图显示
function Fullwidth() {
  let latlng = L.latLng(32.11, 118.9);
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
  if (searchResultLayer !== undefined) {
    map.removeLayer(searchResultLayer);
    searchResultLayer.remove();
  }
  oo.clearLayers();
  layertest = [];
  route.clearLayers();
  map.removeLayer(myGrouptest);
  map.removeLayer(myGroupstart);
  myGroupend.clearLayers();
  myGroupstart.clearLayers();
  map.removeLayer(myGroupp);
}

// 距离量算
function distance() {
  let handler = new L.Draw.Polyline(map);
  handler.enable();
  map.on(L.Draw.Event.CREATED, function (e) {
    editableLayers.addLayer(e.layer);
    let distanceMeasureParam = new SuperMap.MeasureParameters(e.layer);
    L.supermap
      .measureService(url)
      .measureDistance(distanceMeasureParam, function (serviceResult) {
        let content = "距离为" + "：" + serviceResult.result.distance + "米";
        window.alert(content);
        editableLayers.removeLayer(e.layer);
      });
  });
}

// 面积量算
function measure() {
  let handler = new L.Draw.Polygon(map);
  handler.enable();
  map.on(L.Draw.Event.CREATED, function (e) {
    editableLayers.addLayer(e.layer);
    let areaMeasureParam = new SuperMap.MeasureParameters(e.layer);
    L.supermap
      .measureService(url)
      .measureArea(areaMeasureParam, function (serviceResult) {
        let content = "面积为:" + serviceResult.result.area + "平方米";
        window.alert(content);
        editableLayers.removeLayer(e.layer);
      });
  });
}

// 右上角全局搜索
function globalsearch() {
  let k = $("#quanju").val().toString();
  if (k === "") {
    window.alert("请输入信息后再做查询！");
    return;
  }
  let sqlParam = new SuperMap.GetFeaturesBySQLParameters({
    queryParameter: {
      name: "POIs@Campus",
      attributeFilter: "Name like '%" + k + "%'",
    },
    datasetNames: ["Campus:POIs"],
  });
  L.supermap
    .featureService(urldata)
    .getFeaturesBySQL(sqlParam, function (serviceResult) {
      searchResultLayer = L.geoJSON(serviceResult.result.features).addTo(map);
    });
}

// 公共设施查询

function globalsearch1() {}
