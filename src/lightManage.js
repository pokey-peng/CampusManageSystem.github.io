var j = 0;
var list = [];
var m = 0;
var layers = [];
var layers2 = [];
var layers3 = [];
var myGroup;
var myGrouppp;
var timer;
var arrayone = [];
var arraytwo = [];
var wq = ["30%", "100%"];
var p = 0;
function queryall() {
  $("#previous").find("button").addClass("disabled");
  layers2 = [];
  var lightE = document.getElementById("light");
  lightE.style.display = "block";
  var changePgE = document.getElementById("tttr");
  changePgE.style.display = "block";
  lightE.style.width = "0px";
  if (j == 0 && m == 0) {
    let innerHTMLStr;
    let qq = document.getElementById("myul");
    let qqq = document.getElementById("myull");
    let qqqq = document.getElementById("myulll");
    let qqqqq = document.getElementById("myullll");
    let sqlParam = new SuperMap.GetFeaturesBySQLParameters({
      queryParameter: {
        name: "StreetLights@Campus",
      },
      datasetNames: ["Campus:StreetLights"],
      toIndex: 1000,
    });
    L.supermap
      .featureService(urldata)
      .getFeaturesBySQL(sqlParam, function (serviceResult) {
        let r = serviceResult.result.features.features;
        for (i = 0; i < serviceResult.result.features.features.length; i++) {
          if (r[i].properties.ISBROKEN == "否") {
            var myIcon = L.icon({
              iconUrl: "../img/streetlight2.png",
              iconSize: [45],
              iconAnchor: [17, 20],
            });
            let content = "<span>" + r[i].properties.ROADNAME + "</span>";
            let point = L.point(20, 20);
            let popup = L.popup({ closeButton: true })
              .setLatLng([r[i].properties.SMY, r[i].properties.SMX])
              .setContent(content);
            let layer = L.marker([r[i].properties.SMY, r[i].properties.SMX], {
              icon: myIcon,
            }).bindPopup(popup);
            layers.push(layer);
          } else if (r[i].properties.ISBROKEN == "是") {
            let myIcon = L.icon({
              iconUrl: "../img/bsl.png",
              iconSize: [35],
              iconAnchor: [15.81, 51.4],
            });
            let content =
              '<span style="font-size:15px;font-weight:bold;">道路ID:</span>' +
              '<span style="font-size:15px;font-weight:bold;">' +
              r[i].properties.ID +
              "</span>" +
              "<br>" +
              '<span style="font-size:15px;font-weight:bold;">道路名:</span>' +
              '<span style="font-size:15px;font-weight:bold;">' +
              r[i].properties.ROADNAME +
              "</span>" +
              "<br>" +
              '<span style="font-size:15px;font-weight:bold;">修建日期:</span>' +
              '<span style="font-size:15px;font-weight:bold;">' +
              r[i].properties.P_DATE +
              "</span>" +
              "<br>" +
              '<span style="font-size:15px;font-weight:bold;">材质:</span>' +
              '<span style="font-size:15px;font-weight:bold;">' +
              r[i].properties.TYPE +
              "</span>" +
              "<br>" +
              '<span style="font-size:15px;font-weight:bold;">高度:</span>' +
              '<span style="font-size:15px;font-weight:bold;">' +
              r[i].properties.高度 +
              "</span>";
            var point = L.point(20, 20);
            var popup = L.popup({ closeButton: true, offset: L.point(0, -35) })
              .setLatLng([r[i].properties.SMY, r[i].properties.SMX])
              .setContent(content);
            var layer2 = L.marker([r[i].properties.SMY, r[i].properties.SMX], {
              highlight: "permanent",
              icon: myIcon,
            }).bindPopup(popup);
            layers2.push(layer2);
            if (r[i].properties.ROADNAME == "三江北路") {
              arrayone.push(r[i]);
            } else {
              arraytwo.push(r[i]);
            }
            list.push(document.createElement("ul"));
            list[m].innerHTML =
              '<li style="float:left;width:90%;">' +
              "&nbsp;" +
              "&nbsp;" +
              '<span class="glyphicon glyphicon-lamp" style="font-size:15px;"></span>' +
              "&nbsp;" +
              "&nbsp;" +
              '<span style="font-size:15px;font-weight:bold;color:#3c763d">' +
              "路灯ID: " +
              r[i].properties.SMID +
              "&nbsp;" +
              "&nbsp;" +
              "所在道路: " +
              r[i].properties.ROADNAME +
              "</span>" +
              "&nbsp;" +
              "&nbsp;" +
              "</li>";
            list[m].setAttribute("a", r[i].properties.SMY);
            list[m].setAttribute("b", r[i].properties.SMX);
            list[m].id = j;
            list[m].style.height = "40px";
            list[m].style.lineHeight = "37px";
            qq.appendChild(list[m]);
            var nba = $("#myul").children().size();
            var cba = $("#myull").children().size();
            var ccba = $("#myulll").children().size();
            if (nba == 5) {
              qqq.appendChild(list[m]);
            }
            if (cba == 4) {
              qqqq.appendChild(list[m]);
            }
            if (ccba == 4) {
              qqqqq.appendChild(list[m]);
            }
            cba = $("#myull").children().size();
            ccba = $("#myulll").children().size();
            if (nba == 5 && cba == 1) {
              $("#lia").removeClass("disabled");
            }
            if (nba == 4 && cba == 0) {
              $("#lia").addClass("disabled");
            }
            list[m].onclick = function () {
              var Y = this.getAttribute("a");
              var X = this.getAttribute("b");
              map.flyTo([Y, X], 18);
            };
            j = j + 1;
            m = m + 1;
          }
        }
        myGroup = L.layerGroup(layers2);
        map.addLayer(myGroup);
        var option1 = {
          title: {
            text: "统计图",
            padding: [
              20, // 上
              20, // 右
              15, // 下
              20, // 左
            ],
          },
          tooltip: {
            show: true, //显示提示框
          },
          legend: {
            data: ["路灯总量统计", "损坏的路灯"],
            itemWidth: 10,
            padding: [
              20, // 上
              20, // 右
              15, // 下
              20, // 左
            ],
          },
          xAxis: {
            data: ["紫金路", "三江北路"],
            max: 1,
          },
          animationDurationUpdate: 1200,
          axisLabel: {
            interval: 0,
            rotate: 40,
          },
          yAxis: {
            splitLine: { show: false },
          },
          series: [
            {
              name: "路灯总量统计",
              type: "bar",
              barWidth: 40,
              barGap: wq[p],
              data: [14, 13],
            },
            {
              name: "损坏的路灯",
              type: "bar",
              barWidth: 40,
              data: [arraytwo.length, arrayone.length],
            },
          ],
        };
        myChartlight.clear();
        myChartlight.setOption(option1);
        arrayone = [];
        arraytwo = [];
      });
    $("#tty").addClass("disabled");
  } else {
    alert("请先关闭再查询");
  }
  timer = setInterval(function () {
    myChartlight.setOption({
      series: [
        {
          barGap: wq[p],
        },
      ],
    });
    if (p == 0) {
      p = p + 1;
    } else {
      p = p - 1;
    }
  }, 2000);
  map.setView([32.117, 118.9075], 16);
}

$("#close").click(function () {
  var mmmm = document.getElementById("tttr");
  mmmm.style.display = "none";
  myChartlight.clear();
  var mm = document.getElementById("light");
  mm.style.display = "none";
  for (var h = 0; h < layers2.length; h++) {
    layers2[h].disablePermanentHighlight();
  }
  clearInterval(timer);
  $("#myul").find("ul").remove();
  $("#myull").find("ul").remove();
  $("#myulll").find("ul").remove();
  $("#myullll").find("ul").remove();
  $("#next").addClass("disabled");
  $("#previous").next().addClass("disabled");
  w1 = document.getElementById("myul");
  w2 = document.getElementById("myull");
  w3 = document.getElementById("myulll");
  w4 = document.getElementById("myullll");
  w1.style.display = "block";
  w2.style.display = "none";
  w3.style.display = "none";
  w4.style.display = "none";
  myGroup.clearLayers();
  Fullwidth();
  j = 0;
  m = 0;
  layers = [];
  layers2 = [];
  $("#tty").removeClass("disabled");
});
