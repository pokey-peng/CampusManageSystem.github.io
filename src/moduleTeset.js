/*jshint esversion: 6*/

import * as L from "leaflet";
import "@supermap/iclient-leaflet";

let map;
let url = "http://localhost:8090/iserver/services/map-Campus/rest/maps/Campus";
let urlOSMap =
  "http://localhost:8090/iserver/services/map-OSM/rest/maps/humanitarian";
let urldata = "http://localhost:8090/iserver/services/data-Campus/rest/data";

export function onPageLoad() {
  map = L.map("map", {
    center: [32.11, 118.9],
    zoom: 15,
    crs: L.CRS.EPSG4326,
  });
  L.supermap.tiledMapLayer(urlOSMap).addTo(map);
  L.supermap.tiledMapLayer(url).addTo(map);
}
