/* jshint esversion: 6 */
"use strict";
import * as L from "dist/leaflet/include-leaflet.js";
import "js/node_modules/leaflet.marker.highlight/index.js";

let map;
let url = "http://localhost:8090/iserver/services/map-Campus/rest/maps/Campus";
let urlOSMap =
  "http://localhost:8090/iserver/services/map-OSM/rest/maps/humanitarian";
let urldata = "http://localhost:8090/iserver/services/data-Campus/rest/data";

export function onPageLoad() {
  map = L.map("map", {
    center: [32.11, 118.9],
    zoom: 6,
    crs: L.CRS.EPSG4326,
  });
  L.supermap.tiledMapLayer(urlOSMap).addTo(map);
  L.supermap.tiledMapLayer(url).addTo(map);
}

// 全图显示
export function Fullwidth() {
  let latlng = L.latLng(32.11, 118.9);
  map.setView(latlng, 14);
}

// 放大
export function enlarge() {
  map.zoomIn(2);
}

export function narrow() {
  map.zoomOut(2);
}

// 平移
export function translation() {
  map.panTo([32.11, 118.91]);
}

// 清除
export function clearr() {
  map.removeLayer();
}

// 距离量算
export function distance() {
  let handler = new L.Draw.Polyline(map);
  handler.enable();
  map.on(L.Draw.Event.CREATED, function (e) {
    let type = e.layerType,
      layer = e.layer;
    map.addLayer(layer);
    let distanceMeasureParam = new SuperMap.MeasureParameters(layer);
    L.supermap
      .measureService(url)
      .measureDistance(distanceMeasureParam, function (serviceResult) {
        let content = "距离为" + "：" + serviceResult.result.distance + "米";
        window.alert(content);
      });
  });
}

// 面积量算
export function measure() {
  let handler = new L.Draw.Polygon(map);
  handler.enable();
  map.on(L.Draw.Event.CREATED, function (e) {
    let type = e.layerType,
      layer = e.layer;
    map.addLayer(layer);
    let areaMeasureParam = new SuperMap.MeasureParameters(polygon);
    L.supermap
      .measureService(url)
      .measureArea(areaMeasureParam, function (serviceResult) {
        let content = "面积为:" + serviceResult.result.area + "平方米";
        alert(content);
      });
  });
}

// 右上角全局搜索
export function globalsearch() {
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
      let resultLayer = L.geoJSON(serviceResult.result.features).addTo(map);
    });
}

// 公共设施查询

export function globalsearch1() {}
