var j=0;
var list=[];
var m=0;
var layers=[];
var layers2=[];
var layers3=[];
var  myGroup;
var myGrouppp;
var timer;
var arrayone=[];
var arraytwo=[];
var wq=['30%','100%'];
var p=0;

// 损坏路灯查询
function queryall(){
  $("#previous").find("button").addClass("disabled");
  layers2=[];
  var mmmm=document.getElementById('tttr');
  mmmm.style.display='block';
  if(j==0&&m==0){
  var innerHTMLStr;
  var qq=document.getElementById("myul");
  var qqq=document.getElementById("myull");
  var qqqq=document.getElementById("myulll");
  var qqqqq=document.getElementById("myullll");
  var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: {
                name: "StreetLights@Campus"
            },
            datasetNames: ["Campus:StreetLights"],
            toIndex:1000
        });
    // sql查询
        L.supermap
            .featureService(url2)
            .getFeaturesBySQL(sqlParam, function (serviceResult) {
                var r=serviceResult.result.features.features;
                for(i=0;i<serviceResult.result.features.features.length;i++){
                       if(r[i].properties.ISBROKEN=='否'){
                        var myIcon=L.icon({
                        iconUrl:'img/streetlight2.png',
                        iconSize:[45],
                        iconAnchor:[17,20]
                        });  
                      var content='<span>'+r[i].properties.ROADNAME+'</span>';
                      var point = L.point(20, 20);
                      var popup=L.popup({closeButton:true}).setLatLng([r[i].properties.SMY,r[i].properties.SMX]).setContent(content);
                      var layer=L.marker([r[i].properties.SMY,r[i].properties.SMX],{icon:myIcon}).bindPopup(popup);
                      layers.push(layer);
                       }else if(r[i].properties.ISBROKEN=='是'){
                        var myIcon=L.icon({
                        iconUrl:'img/bsl.png',
                        iconSize:[35],
                        iconAnchor:[15.81,51.4]
                        });
                        var content='<span style="font-size:15px;font-weight:bold;">道路ID:</span>'+'<span style="font-size:15px;font-weight:bold;">'+r[i].properties.ID+'</span>'+'<br>'+'<span style="font-size:15px;font-weight:bold;">道路名:</span>'+'<span style="font-size:15px;font-weight:bold;">'+r[i].properties.ROADNAME+'</span>'+'<br>'+'<span style="font-size:15px;font-weight:bold;">修建日期:</span>'+'<span style="font-size:15px;font-weight:bold;">'+r[i].properties.P_DATE+'</span>'+'<br>'+'<span style="font-size:15px;font-weight:bold;">材质:</span>'+'<span style="font-size:15px;font-weight:bold;">'+r[i].properties.TYPE+'</span>'+'<br>'+'<span style="font-size:15px;font-weight:bold;">高度:</span>'+'<span style="font-size:15px;font-weight:bold;">'+r[i].properties.高度+'</span>';
                        var point = L.point(20, 20);
                        var popup=L.popup({closeButton:true,offset:L.point(0, -35)}).setLatLng([r[i].properties.SMY,r[i].properties.SMX]).setContent(content);
                        var layer2=L.marker([r[i].properties.SMY,r[i].properties.SMX],{highlight: "permanent",icon:myIcon}).bindPopup(popup);
                        layers2.push(layer2);
                     if(r[i].properties.ROADNAME=='三江北路'){
                        arrayone.push(r[i]);
                       }else{
                        arraytwo.push(r[i]);
                       }
                     list.push(document.createElement("ul"));
                     list[m].innerHTML='<li style="float:left;width:90%;">'+'&nbsp;'+'&nbsp;'+'<span class="glyphicon glyphicon-lamp" style="font-size:15px;"></span>'+'&nbsp;'+'&nbsp;'+'<span style="font-size:15px;font-weight:bold;color:#3c763d">'+'路灯ID: '+r[i].properties.SMID+'&nbsp;'+'&nbsp;'+'所在道路: '+r[i].properties.ROADNAME+'</span>'+'&nbsp;'+'&nbsp;'+'</li>';
                     list[m].setAttribute('a',r[i].properties.SMY);
                     list[m].setAttribute('b',r[i].properties.SMX);
                     list[m].id=j;
                     list[m].style.height='40px';
                     list[m].style.lineHeight='37px';
                     qq.appendChild(list[m]);
                    var nba=$('#myul').children().size();
                    var cba=$('#myull').children().size();
                    var ccba=$('#myulll').children().size();
                    if(nba==5){
                      qqq.appendChild(list[m]);
                    } 
                    if(cba==4){
                      qqqq.appendChild(list[m]);
                    }
                    if(ccba==4){
                      qqqqq.appendChild(list[m]);
                    }
                   var cba=$('#myull').children().size();
                    var ccba=$('#myulll').children().size();
                   if(nba==5&&cba==1){
                       $("#lia").removeClass("disabled");
                   }
                   if(nba==4&&cba==0){
                        $("#lia").addClass("disabled");
                   }

                  list[m].onclick=function(){
                var Y=this.getAttribute('a');
                var X=this.getAttribute('b');
                map.flyTo([Y,X],18);
              }
                       j=j+1;
                       m=m+1;
                       }
                }
          myGroup=L.layerGroup(layers2);
             map.addLayer(myGroup);
    arrayone=[];
    arraytwo=[];
            });
$("#tty").addClass("disabled");
  }else{
    alert('请先关闭再查询');
  } 
  map.setView([32.117,118.9075],16);
}


$("#close").click(function(){
  var mmmm=document.getElementById('tttr');
  mmmm.style.display='none';
  for(var h=0;h<layers2.length;h++){
      layers2[h].disablePermanentHighlight();
  }
    $("#myul").find("ul").remove();
    $("#myull").find("ul").remove();
    $("#myulll").find("ul").remove();
    $("#myullll").find("ul").remove();
    $("#next").addClass("disabled");
$("#previous").next().addClass("disabled");
    w1 = document.getElementById('myul');
    w2 = document.getElementById('myull');
    w3 = document.getElementById('myulll');
    w4 = document.getElementById('myullll');
        w1.style.display = 'block';
        w2.style.display = 'none';
        w3.style.display = 'none';
        w4.style.display = 'none';
    myGroup.clearLayers();
    Fullwidth();
    j=0;
    m=0;
    layers=[];
    layers2=[];
    $("#tty").removeClass("disabled");
  })

  
// 路灯维修
 function queryid(){
  // 判断是否需要去除高亮
 if(layers3.length!==0){
  layers3[0].disablePermanentHighlight();
        layers3=[];
        myGrouppp.clearLayers();
               id();
              }else{
            id();
            }
}

// id查询
function id(){
  var tt=document.getElementById("mytable");
    $("#mytable").find("ul").remove();
    $("#mytable").find("LI").remove();
   var idsParam = new SuperMap.GetFeaturesByIDsParameters({
            datasetNames: ["Campus:StreetLights"],
            IDs: [$('#bianhao').val()]
        });
   // ID查询
        L.supermap
            .featureService(url2)
            .getFeaturesByIDs(idsParam, function (serviceResult) {
              var r=serviceResult.result.features.features;
              var table=document.createElement("ul");
              // 根据查询结果插入不同的ul元素
               if(r[0].properties.ISBROKEN=='是'){
                table.innerHTML='<li>路灯ID：'+r[0].properties.ID +'</li>'+'<li>是否损坏：'+r[0].properties.ISBROKEN +'</li>'+'<li>所在道路：'+r[0].properties.ROADNAME +'</li>'+'<li>路灯高度：'+r[0].properties.高度 +'</li>'+'<li>修建日期：'+r[0].properties.P_DATE+'</li>'+'<center><button onclick="Guarantee()" class="btn btn-success">修复</button><button onclick="guanbi()" class="btn btn-default" style="margin-left:5px;">关闭</button></center>';
              }else{
                table.innerHTML='<li>路灯ID：'+r[0].properties.ID +'</li>'+'<li>是否损坏：'+r[0].properties.ISBROKEN +'</li>'+'<li>所在道路：'+r[0].properties.ROADNAME +'</li>'+'<li>路灯高度：'+r[0].properties.高度 +'</li>'+'<li>修建日期：'+r[0].properties.P_DATE+'</li>'+'<center><button onclick="repair()" class="btn btn-success">报修</button><button onclick="guanbi()" class="btn btn-default" style="margin-left:5px;">关闭</button></center>';
              }
                     table.setAttribute('a',r[0].properties.SMY);
                     table.setAttribute('b',r[0].properties.SMX);
                     tt.appendChild(table);
                     // 添加marker
               if(r[0].properties.ISBROKEN=='否'){
                  var myIcon=L.icon({
                        iconUrl:'img/streetlight2.png',
                        iconSize:[60],
                        iconAnchor:[23.2,68.672]
                        });
                  var layer3=L.marker([r[0].properties.SMY,r[0].properties.SMX],{highlight: "permanent",icon:myIcon});
                layers3.push(layer3);
                myGrouppp=L.layerGroup(layers3);
                map.addLayer(myGrouppp);
                map.flyTo([r[0].properties.SMY,r[0].properties.SMX],18);
               }else{
                  var myIcon=L.icon({
                        iconUrl:'img/bsl.png',
                        iconSize:[35],
                        iconAnchor:[17.6,51.4]
                        });
                  var layer3=L.marker([r[0].properties.SMY,r[0].properties.SMX],{highlight: "permanent",icon:myIcon});
                  layers3.push(layer3);
                myGrouppp=L.layerGroup(layers3);
                map.addLayer(myGrouppp);
                map.flyTo([r[0].properties.SMY,r[0].properties.SMX],18);
               }
            });
}








// 修复
function Guarantee(){
var idsParam = new SuperMap.GetFeaturesByIDsParameters({
            IDs: [$('#bianhao').val()],
            datasetNames: ["Campus:StreetLights"]
        });
        L.supermap.featureService(url2).getFeaturesByIDs(idsParam, function (serviceResult) {
            var  resultLayer = L.geoJSON(serviceResult.result.features);
            var y=resultLayer.toGeoJSON();
            var c=y.features[0];
            c.properties={ISBROKEN: '否'};
            var param = new SuperMap.EditFeaturesParameters({
                dataSourceName: "Campus",
                dataSetName: "StreetLights",
                features: c,
                editType: "update"
            });
          L.supermap.featureService(url2).editFeatures(param, function(result){
                alert('修复成功!');
                $("#mytable").find("ul").remove();
                $('#bianhao').val('');
                layers3[0].disablePermanentHighlight();
                layers3=[];
                myGrouppp.clearLayers();
                Fullwidth();
              });
            });
}

// 报修
function repair(){
  var idsParam = new SuperMap.GetFeaturesByIDsParameters({
            IDs: [$('#bianhao').val()],
            datasetNames: ["Campus:StreetLights"]
        });
        L.supermap.featureService(url2).getFeaturesByIDs(idsParam, function (serviceResult) {
           var  resultLayer = L.geoJSON(serviceResult.result.features);
            var y=resultLayer.toGeoJSON();
              var c=y.features[0];
              c.properties={ISBROKEN: '是'};
              var param = new SuperMap.EditFeaturesParameters({
                dataSourceName: "Campus",
                dataSetName: "StreetLights",
                features: c,
                editType: "update"
            });
          L.supermap.featureService(url2).editFeatures(param, function(result){
                alert('报修成功!');
                $("#mytable").find("ul").remove();
                $('#bianhao').val('');
                layers3[0].disablePermanentHighlight();
                layers3=[];
                myGrouppp.clearLayers();
                Fullwidth();
              });
            });
}

// 关闭按钮的方法
function guanbi(){
  layers3[0].disablePermanentHighlight();
                layers3=[];
                myGrouppp.clearLayers();
                var tt=document.getElementById("mytable");
                $("#mytable").find("ul").remove();
                $("#mytable").find("LI").remove();
                $('#bianhao').val('');
}
