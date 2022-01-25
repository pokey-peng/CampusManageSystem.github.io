var editor;
editor = CodeMirror.fromTextArea(document.getElementById("code-e"), {
  mode: "javascript",
  lineNumbers: true, //显示行号
  theme: "dracula",
  lineWrapping: true, //代码折叠
  foldGutter: true,
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  matchBrackets: true, //括号匹配
});
editor.setSize("100%", "90%");
editor.on("change", function (editorIns, changeObj) {
  extractProperties(activeGeojson);
});

Vue.component("table-attribute", {
  data: function () {
    return {
      actfeatures,
    };
  },
  template: `
  <div id="attr-table" v-if="featuresmy.dictionary.length">
  <table class="table table-bordered">
    <thead style="width: 97%;">
      <tr>
        <th v-for="(value,index) in featuresmy.dictionary" :key=index>{{value}}</th>
      </tr>
    </thead>
    <tbody style="overflow-y: scroll;">
      <tr v-for="(property,id) in featuresmy.properties" :key=id>

        <td v-for="(value,index) in featuresmy.dictionary" :key="index">{{property[value]}}</td>
      </tr>
    </tbody>
  </table>
  </div>
  `,
  computed: {
    featuresmy: function () {
      let ft = JSON.parse(JSON.stringify(this.actfeatures));
      ft.dictionary.pop();
      return ft;
    },
  },
  methods: {},
});

var tableVue = new Vue({
  el: "#profile",
  data: { isCampus },
});

function resetState() {
  // if (osmBuildingRe !== undefined) {
  //   osmBuildingRe.
  // }
  rootVueapp.$children[0].getosmlayers = {};
  Object.keys(osmResultLayer).forEach(function (key) {
    if (map !== undefined && osmResultLayer[key] !== undefined) {
      //switchComponent.removeLayer(osmResultLayer[key]);
      osmResultLayer[key].remove();
    }
  });
  switchComponent.setOverlayTree({});
  osmResultLayer = {};
}
function generateOverlayTree(osmlist) {
  let group = {
    label: "Campus Layers Group",
    selectAllCheckbox: "Un/select all",
    children: [
      {
        label: "ori data",
        selectAllCheckbox: true,
        children: [],
      },
    ],
  };
  Object.keys(osmlist).forEach(function (key) {
    group.children[0].children.push({ label: key, layer: osmlist[key] });
  });
  return group;
}

function loadOsmLayer() {
  campusGeoJson.clearLayers();
  Object.keys(osmAllLayers).forEach((key) => {
    let geojson = osmAllLayers[key];
    if (!$.isEmptyObject(geojson)) {
      let name = key.match(/osm_(\S*)_free/)[1];
      if (key !== "gis_osm_buildings_a_free_1") {
        osmResultLayer[name] = L.geoJSON(geojson, {
          onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.name);
          },
          style: function (feature) {
            return { color: "red" };
          },
        });
      }
      //switchComponent.addOverlay(osmResultLayer[name], name);
    }
  });
  overlayers = generateOverlayTree(osmResultLayer);
  switchComponent.setOverlayTree(overlayers);
}

function downloadOsmData() {
  let downGeoJson = {
    type: "FeatureCollection",
    features: [],
  };
  Object.keys(osmAllLayers).forEach((key) => {
    let geojson = osmAllLayers[key];
    if (!$.isEmptyObject(geojson)) {
      geojson.features.forEach((feature) => {
        downGeoJson.features.push(feature);
      });
      //switchComponent.addOverlay(osmResultLayer[name], name);
    }
  });
  let codedown = js_beautify(JSON.stringify(downGeoJson));
  const a = document.createElement("a");
  a.href =
    "data:application/json;charset=utf-8,\ufeff" +
    encodeURIComponent(codedown);
  if (areaName === undefined) {
    areaName = "NoName";
  }
  a.download = areaName;
  a.click();

}
