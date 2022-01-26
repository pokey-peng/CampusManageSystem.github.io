var urllight =
  "http://localhost:8090/iserver/services/data-Campus/rest/data/datasources/Campus/datasets/StreetLights";
var urlnet =
  "http://localhost:8090/iserver/services/transportationAnalyst-Campus/rest/networkanalyst/RoadNetwork@Campus";
let n = 0;
var myChartlight = echarts.init(document.getElementById("light"));
var campusGeoJson = new L.FeatureGroup();
var osmBuildingsGeo;
var osmResultLayer = {};

var transport = {};
var osmLayers = {};
var place = {};
var natural = {};
var natural = {};
var landuse = {};
var pofw_a = {}; // 宗教景点
var water = {};
var traffic = {};
var pois = {};
var roads = {};
var pofw = {};
var natural_a = {};
var buildings = {};
var railways = {};
var places_a = {};
var transport_a = {};
var waterways = {};
var pois_a = {};
var traffic_a = {};
var osmGroupLayers = new L.FeatureGroup();
var osmAllLayers = {
  gis_osm_transport_free_1: transport,
  gis_osm_places_free_1: place,
  gis_osm_natural_free_1: natural,
  gis_osm_landuse_a_free_1: landuse,
  gis_osm_pofw_a_free_1: pofw_a, // 宗教景点
  gis_osm_water_a_free_1: water,
  gis_osm_traffic_free_1: traffic,
  gis_osm_pois_free_1: pois,
  gis_osm_roads_free_1: roads,
  gis_osm_pofw_free_1: pofw,
  gis_osm_natural_a_free_1: natural_a,
  gis_osm_buildings_a_free_1: buildings,
  gis_osm_railways_free_1: railways,
  gis_osm_places_a_free_1: places_a,
  gis_osm_transport_a_free_1: transport_a,
  gis_osm_waterways_free_1: waterways,
  gis_osm_traffic_a_free_1: traffic_a,
};
var getosmlayers = {};
var activeGeojson;
var activeName;
var code;
var actfeatures = {
    dictionary: [], //属性字段列表
    geometry: [], //几何对象列表
    properties: [], //属性记录列表
};

/**
 * 主模式切换
 */
$("#osm-buildings").css({ display: "none" });

$("#CampusExpoler").on('click', function () {
  $("#facSql").css({ display: "none" });
  $("#ligFix").css({ display: "none" });
  $("#rouPlan").css({ display: "none" });
  $("#osm-buildings").css({ display: "block" });
  isCampus = false;
  tableVue.isCampus = false;
  onPageLoad();
});
$("#superCampus").click(function () {
  $("#facSql").css({ display: "block" });
  $("#ligFix").css({ display: "block" });
  $("#rouPlan").css({ display: "block" });
  isCampus = true;
  tableVue.isCampus = true;
  onPageLoad();
});

/**
 * 头部下拉菜单
 */
$(".tooldiv").mouseenter(function () {
  $(this).next().show();
});
$("#theul li").mouseleave(function () {
  $(this).find(".right").hide();
});

/**
 * 侧边栏隐藏按钮
 */
$("#btn").click(function () {
  if (n == 1) {
    $("#test").animate({ "margin-left": "0px" }, 150);
    $("#map").animate({}, 1500);
    n = n - 1;
  } else {
    $("#test").animate({ "margin-left": "-300px" }, 150);
    $("#map").animate({ "margin-left": "50px" }, 250);
    n = n + 1;
  }
});

/**
 * 侧边栏选中提示块
 */
$("#xyljclick").click(function () {
  $("#xyljdiv").css({ display: "block" });
  $("#ldcxdiv").css({ display: "none" });
  $("#lddjdiv").css({ display: "none" });
  $("#ldcxxdiv").css({ display: "none" });
  $("#ldbxdiv").css({ display: "none" });
});
$("#ldcxclick").click(function () {
  $("#ldcxdiv").css({ display: "block" });
  $("#lddjdiv").css({ display: "none" });
  $("#xyljdiv").css({ display: "none" });
  $("#ldcxxdiv").css({ display: "none" });
  $("#ldbxdiv").css({ display: "none" });
});
$("#lddjclick").click(function () {
  $("#ldcxdiv").css({ display: "none" });
  $("#lddjdiv").css({ display: "block" });
  $("#xyljdiv").css({ display: "none" });
  $("#ldcxxdiv").css({ display: "none" });
  $("#ldbxdiv").css({ display: "none" });
});

$("#ldcxxclick").click(function () {
  $("#ldcxxdiv").css({ display: "block" });
  $("#lddjdiv").css({ display: "none" });
  $("#ldbxdiv").css({ display: "none" });
});

$("#ldbxclick").click(function () {
  $("#ldbxdiv").css({ display: "block" });
  $("#ldcxxdiv").css({ display: "none" });
  $("#lddjdiv").css({ display: "none" });
});
