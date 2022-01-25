var vm;
var loadLayer = false;
function initFindPlace() {
  let searchContainer = document.getElementById("search-container");
  searchContainer.innerHTML = "<find-place v-if='!placeFound'></find-place>";
}
Vue.component("find-place", {
  data: function () {
    const enteredInput = "";
    let hasValidArea = false;
    return {
      enteredInput,
      loading: false,
      suggestionsLoaded: false,
      hideInput: false,
      suggestions: [],
    };
  },
  template: [
    "<div>",
    "<form v-on:submit.prevent='onSubmit' class='input-group' style='width: 220px;margin-top: 15.8px;'>",
    "<input id='query-input' class='form-control' v-model='enteredInput' type='text' placeholder='校园名称' ref='input' />",
    "<div style='width: 40px;height: 34px;position: absolute;z-index: 1000000;margin-left: 180px;border-radius:25px;'>",
    "<button type='submit' class='search-submit' href='#' @click.prevent='onSubmit'></button>",
    "</div>",
    "</form>",
    "<div class='results' v-if='loading'>",
    "<div v-if='suggestionsLoaded && suggestions.length' class='suggestions shadow'>",
    "<ul id='search-ul'>",
    "<li v-for='(suggestion, index) in suggestions' :key='index' style='margin-left: -1px;height: auto'>",
    "<a @click.prevent='pickSuggestion(suggestion)' class='suggestion' href='#'>",
    "<span>{{ suggestion.name }} <small>({{ suggestion.type }})</small>",
    "</span></a></li></ul></div></div></div>",
  ].join(""),
  watch: {
    enteredInput() {
      // As soon as they change it, we need not to download:
      this.showWarning = false;
      this.hideInput = false;
    },
  },
  methods: {
    onSubmit() {
      this.suggestions = [];
      this.loading = true;
      findBoundaryByName(this.enteredInput).then(data => {
        console.log(JSON.parse(JSON.stringify(data)));
        this.suggestionsLoaded = true;
        this.suggestions = data;
      });
    },
    pickSuggestion(suggestion) {
      resetState();
      this.loading = false;
      campusGeoJson.clearLayers();
      let geoLayer = suggestion.geojson;
      areaName = suggestion.name;
      let layer = L.geoJSON(geoLayer);
      campusGeoJson.addLayer(layer);
      map.flyToBounds(layer.getBounds());
      getFeatureOverlay(layer);
      loadLayer = true;
      bus.$emit('renderlist',true);
    },
  },
});
function createSearchVue() {
  vm = new Vue({
    el: "#search-container",
    data: {
      placeFound: false,
    },
  });
}
