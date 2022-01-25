async function findBoundaryByName(inputName) {
  let name = encodeURIComponent(inputName);
  let result;
  await axios
    .get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${name}&polygon_geojson=1&countrycodes=cn`
    )
    .then(function (response) {
      if (response.status === 200) {
        result = response.data
          .filter((row) => row.osm_type === "relation" || "way")
          .map((row) => ({
            name: row.display_name,
            type: row.type,
            areaId: row.osm_id + 36e8,
            geojson: row.geojson,
          }));
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  return result;
}

function getFeatureOverlay(geojson) {
  Object.keys(osmAllLayers).forEach(function (key) {
    osmAllLayers[key] = {};
  });
  Object.keys(osmAllLayers).forEach(function (key) {
    getOneOver(geojson, key, osmAllLayers[key]);
  });
}

function getOneOver(geojson, dataname, osmresult) {
  //设置任意几何范围查询参数
  let geometryParam = new SuperMap.GetFeaturesByGeometryParameters({
    datasetNames: [dataname + ":" + dataname],
    geometry: geojson,
    spatialQueryMode: "INTERSECT", // 相交空间查询模式
    toIndex: 10000,
  });
  // 创建任意几何范围查询实例
  L.supermap
    .featureService(urlOsmChinaData)
    .getFeaturesByGeometry(geometryParam, function (serviceResult) {
      if (serviceResult.result.featureCount > 0) {
        osmAllLayers[dataname] = serviceResult.result.features;
        Vue.set(
          rootVueapp.$children[0].getosmlayers,
          dataname.match(/osm_(\S*)_free/)[1],
          serviceResult.result.features
        );
        console.log(dataname.match(/osm_(\S*)_free/)[1]);
      }

      // 获取服务器返回的结果
      // osmresult = L.geoJSON(serviceResult.result.features, {
      //   onEachFeature: function (feature, layer) {
      //     layer.bindPopup(feature.properties.name);
      //     console.log(feature.properties.name);
      //   },
      //   style: function (feature) {
      //     return { color: "red" };
      //   },
      // }).addTo(map);
    });
}
