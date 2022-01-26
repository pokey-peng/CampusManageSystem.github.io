var now,
  date,
  time,
  timeRange,
  dateRange,
  timeRangeLabel,
  dateRangeLabel,
  osmresult,
  osmBuildingRe;
function changeDate() {
  var Y = now.getFullYear(),
    M = now.getMonth(),
    D = now.getDate(),
    h = now.getHours(),
    m = 0;

  timeRangeLabel.innerText = pad(h) + ":" + pad(m);
  dateRangeLabel.innerText = Y + "-" + pad(M + 1) + "-" + pad(D);

  if (osmBuildingRe !== undefined) {
    osmBuildingRe.date(new Date(Y, M, D, h, m));
  }

}

function onTimeChange() {
  now.setHours(this.value);
  now.setMinutes(0);
  changeDate();
}

function onDateChange() {
  now.setMonth(0);
  now.setDate(this.value);
  changeDate();
}

function pad(v) {
  return (v < 10 ? "0" : "") + v;
}
function setBuildings() {
  campusGeoJson.clearLayers();
  Object.keys(osmAllLayers).forEach((key) => {
    let geojson = osmAllLayers[key];
    if (!$.isEmptyObject(geojson)) {
      if (key === "gis_osm_buildings_a_free_1") {
        osmBuildingRe = new OSMBuildings(map)
          .date(new Date(2017, 5, 15, 17, 30))
          .set(geojson);
        overlayers.children.push({
          label: "new style",
          selectAllCheckbox: true,
          children: [{ label: "OSM 3D Buildings", layer: osmBuildingRe }]
        });
       switchComponent.setOverlayTree(overlayers);
        return;
      }
    }
  });

  timeRange = document.getElementById("time");
  dateRange = document.getElementById("date");
  timeRangeLabel = document.querySelector("*[for=time]");
  dateRangeLabel = document.querySelector("*[for=date]");
  now = new Date();
  changeDate();

  var Jan1 = new Date(now.getFullYear(), 0, 1);
  dateRange.value = Math.ceil((now - Jan1) / 86400000);

  timeRange.value = now.getHours();

  timeRange.addEventListener("change", onTimeChange);
  dateRange.addEventListener("change", onDateChange);
  timeRange.addEventListener("input", onTimeChange);
  dateRange.addEventListener("input", onDateChange);
}

//TODO 风格设置 地图样式 制图
function styleFunction(feature) {}
