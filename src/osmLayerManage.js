// document.getElementById("layerNamesCon").innerHTML =
//   "<layer-list></layer-list>";
let areaText = document.getElementById("code-e");
function extractProperties(_geojson) {
  actfeatures.dictionary = [];
  actfeatures.geometry = [];
  actfeatures.properties = [];
  if (_geojson != null) {
    if (_geojson.type === "FeatureCollection") {
      actfeatures.dictionary.push("sid");
      for (let i = 0; i < _geojson.features.length; i++) {
        const feature = _geojson.features[i];
        actfeatures.geometry.push(feature.geometry);
        if (feature.properties === undefined) {
          feature.properties = {};
        }
        if (feature.properties["sid"] === undefined) {
          feature.properties["sid"] = i;
        }
        actfeatures.properties.push(feature.properties);
        const keys = Object.getOwnPropertyNames(feature.properties);
        keys.forEach((key) => {
          if (actfeatures.dictionary.indexOf(key) == -1) {
            actfeatures.dictionary.push(key);
          }
        });
      }
    }
  }
}
Vue.component("layer-list", {
  data: function () {
    return {
      loadLayer,
      getosmlayers,
    };
  },

  template: `
  <div class="layer-manage" v-if="loadLayer && getosmlayers">
    <ul id="layerlist-container">
      <li class="layer-li" v-for='(value, index) in getosmlayers' :key="index" style="margin-left: -1px;height: auto;">
        <a @click.prevent="setCode(value)" class="layer-name" href="#">
          <span class="layer-text">{{index}}</span>
        </a>
      </li>
    </ul>
  </div>
  `,
  mounted() {
    var vm = this;
    bus.$on("renderlist", (data) => {
      vm.loadLayer = data;
    });
  },
  methods: {
    setCode(value) {
      code = JSON.stringify(value);
      activeGeojson = JSON.parse(code);
      editor.setValue(js_beautify(code));
    },
  },
});
var rootVueapp = new Vue({
  el: "#f-list",
  data: {},
});

let countShow = 0;
function showTablePanel() {
  if (countShow === 0) {
    $("#show-panel").removeClass("animate__animated animate__fadeOutRight");
    //$("#show-panel").addClass("animate__animated animate__fadeInRight");
    countShow++;
  } else {
    //$("#show-panel").removeClass("animate__animated animate__fadeInRight");
    $("#show-panel").addClass("animate__animated animate__fadeOutRight");
    countShow = 0;
  }
}
