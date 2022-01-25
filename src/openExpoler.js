var openFileViewModel;
var messageBox;
var rootVue;

function initEditView() {
  openFileViewModel = L.supermap.components.openFileViewModel(map);
  messageBox = new SuperMap.Components.MessageBox();
  var infoView = L.control({ position: "topright" });
  infoView.onAdd = function () {
    var me = this;
    me._div = L.DomUtil.create("div", "component-openfile");
    me._div.id = "openFileContainer";
    //避免与"源码"控件重叠

    me._div.innerHTML =
      "<add_data v-bind:openFileViewModel='openFileViewModel' v-bind:messageBox='messageBox'></add_data>";
    handleMapEvent(me._div, me._map);
    return me._div;
  };
  infoView.addTo(map);
}

function handleMapEvent(div, map) {
  if (!div || !map) {
    return;
  }
  div.addEventListener("mouseover", function () {
    map.dragging.disable();
    map.scrollWheelZoom.disable();
    map.doubleClickZoom.disable();
  });
  div.addEventListener("mouseout", function () {
    map.dragging.enable();
    map.scrollWheelZoom.enable();
    map.doubleClickZoom.enable();
  });
}

var add_data = {
  props: ["openFileViewModel", "messageBox"],
  data: function () {
    return {

    };
  },
  template: [
    "<div class='file-select'>",
    "<label class='component-openfile__span--select' for='input_file'>",
    "<div class='supermapol-icons-upload'/>",
    "<span class='component-openfile__span'></span>",
    "</label>",
    "<input class='component-openfile__input' id='input_file' type='file'",
    "accept='.json,.geojson,.csv,.xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel'",
    "v-on:change='fileSelectfn(this, $event)'>",
    "</div>",
  ].join(""),
  methods: {
    fileSelectfn(self, e) {
      //绑定事件监听
      self.openFileViewModel.on("filesizeexceed", _messageListener.bind(self));
      self.openFileViewModel.on("errorfileformat", _messageListener.bind(self));
      self.openFileViewModel.on("openfilefailed", _messageListener.bind(self));
      self.openFileViewModel.on("readdatafail", _messageListener.bind(self));
      self.openFileViewModel.on("openfilesucceeded", function (e) {
        let layer = L.geoJSON(e.result).addTo(map);
        map.flyToBounds(layer.getBounds());
        switchComponent.addOverlay(layer, e.layerName);
      });

      function _messageListener(e) {
        this.messageBox.showView(e.message, e.messageType);
      }

      self.openFileViewModel.readFile(e);
    },
  },
};

// 创建根实例
function createVue() {
  rootVue = new Vue({
    el: "#openFileContainer",
    //el: "#app",
    data: {
      openFileViewModel: openFileViewModel,
      messageBox: messageBox,
    },
    components: {
      add_data: add_data,
    },
  });
}

function changeAttributes() {
  var inputE = document.getElementById("quanju");
  $("#right-btn").css({ display: "none" });
  if (document.getElementById("openFileContainer")) {
    $("#openFileContainer").css({ display: "block" });
  } else {
    initEditView();
    createVue();
  }
  $("#search-div").css({ display: "none" });
  if (document.querySelector("find-place")) {
    $("#search-div").css({ display: "none" });
  } else {
    initFindPlace();
    createSearchVue();
  }

  inputE.placeholder = "校园名称";
}
