var quanjuobj;
var quanjulist=[];
var e=0;
var oo=L.geoJSON();
var YYY,XXX;
var startx,starty;
var endx,endy;
var myIconstart;
var route=L.geoJSON();
var routepng;
var layertest=[];
var myGrouptest=L.layerGroup();
var myGroupstart=L.layerGroup();
var myGroupend=L.layerGroup();
var kk,kkk;
$(function () { $("[data-toggle='tooltip']").tooltip(); });
$("#map").css("position","sticky");

 $('.tooldiv').mouseenter(function(){
      $(this).next().show();
  });
   $('#theul li').mouseleave(function(){
      $(this).find('.right').hide();
  });

     $('#btn').click(function(){
        if(n==1){
             $('#test').animate({'margin-left':'0px'},250);
              $('#map').animate({},2500);
                n=n-1;

        }else{
          $('#test').animate({'margin-left':'-300px'},250);
          $('#map').animate({'margin-left':'50px'},350);
          n=n+1;
        }     
            });

$('#ldcxclick').click(function(){
  $('#ldcxdiv').css({"display":"block"});
  $('#lddjdiv').css({"display":"none"});
});
$('#lddjclick').click(function(){
  $('#ldcxdiv').css({"display":"none"});
  $('#lddjdiv').css({"display":"block"});
})

$('#nhcxclick').click(function(){
  $('#nhcxdiv').css({"display":"block"});
  $('#nhtjdiv').css({"display":"none"});
  $('#cbzsdiv').css({"display":"none"});
});
$('#nhtjclick').click(function(){
  $('#nhcxdiv').css({"display":"none"});
  $('#nhtjdiv').css({"display":"block"});
  $('#cbzsdiv').css({"display":"none"});
});
$('#cbzsclick').click(function(){
  $('#nhcxdiv').css({"display":"none"});
  $('#nhtjdiv').css({"display":"none"});
  $('#cbzsdiv').css({"display":"block"});
});

$('#lhssclick').click(function(){
  $('#lhssdiv').css({"display":"block"});
  $('#lhtjdiv').css({"display":"none"});
  $('#lhwhdiv').css({"display":"none"});
});
$('#lhtjclick').click(function(){
  $('#lhssdiv').css({"display":"none"});
  $('#lhtjdiv').css({"display":"block"});
  $('#lhwhdiv').css({"display":"none"});
});
$('#lhwhclick').click(function(){
  $('#lhssdiv').css({"display":"none"});
  $('#lhtjdiv').css({"display":"none"});
  $('#lhwhdiv').css({"display":"block"});
});

$('#lxcxclick').click(function(){
  $('#lxcxdiv').css({"display":"block"});
  $('#xzlxdiv').css({"display":"none"});
  $('#bjlxdiv').css({"display":"none"});
  $('#sclxdiv').css({"display":"none"});
});
$('#xzlxclick').click(function(){
  $('#lxcxdiv').css({"display":"none"});
  $('#xzlxdiv').css({"display":"block"});
  $('#bjlxdiv').css({"display":"none"});
  $('#sclxdiv').css({"display":"none"});
});$('#bjlxclick').click(function(){
  $('#lxcxdiv').css({"display":"none"});
  $('#xzlxdiv').css({"display":"none"});
  $('#bjlxdiv').css({"display":"block"});
  $('#sclxdiv').css({"display":"none"});
});$('#sclxclick').click(function(){
  $('#lxcxdiv').css({"display":"none"});
  $('#xzlxdiv').css({"display":"none"});
  $('#bjlxdiv').css({"display":"none"});
  $('#sclxdiv').css({"display":"block"});
});

$('#ldgl').click(function(){
  $('#ld').css({"display":"block"});
   $('#nh').css({"display":"none"});
   $('#xc').css({"display":"none"});
   $('#lh').css({"display":"none"});
   $('#bd').css({"display":"none"});
 });
 $('#nhjk').click(function(){
  $('#nh').css({"display":"block"});
   $('#ld').css({"display":"none"});
   $('#xc').css({"display":"none"});
   $('#lh').css({"display":"none"});
   $('#bd').css({"display":"none"});
 });
 $('#xcgl').click(function(){
  $('#xc').css({"display":"block"});
   $('#ld').css({"display":"none"});
   $('#nh').css({"display":"none"});
   $('#lh').css({"display":"none"});
   $('#bd').css({"display":"none"});
 });
$('#lhzt').click(function(){
  $('#lh').css({"display":"block"});
   $('#ld').css({"display":"none"});
   $('#nh').css({"display":"none"});
   $('#xc').css({"display":"none"});
   $('#bd').css({"display":"none"});
 });


function completed(e){
        editableLayers.addLayer(e.layer);
        var param1=new SuperMap.MeasureParameters(e.layer);
        ally=e.layer.toGeoJSON();
         if(handler1!='null'){
              L.supermap.measureService(url).measureArea(param1,function(result){
          alert(result.result.area+"平方米");
          editableLayers.removeLayer(e.layer);
        });
              handler1='null';
         }

         if(handler2!='null'){
              L.supermap.measureService(url).measureDistance(param1,function(result){
          alert(result.result.distance+"米");
          editableLayers.removeLayer(e.layer);       
        });
               handler2='null';
         }
         if(handler3!='null'){
          editableLayerss.addLayer(e.layer);
              handler3='null';
         }
}

function next(){
w1=document.getElementById('myul');
w2=document.getElementById('myull');
w3=document.getElementById('myulll');
w4=document.getElementById('myullll');
 c1=$('#myul').children().size();
 c2=$('#myull').children().size();
 c3=$('#myulll').children().size();
 c4=$('#myullll').children().size();
 // 通过点击下一页，判断每一页的样式
if(w1.style.display=='block'&&w2.style.display=='none'&&w3.style.display=='none'&&w4.style.display=='none'&&c1==4&&c2>0){
  w1.style.display='none';
  w2.style.display='block';
  w3.style.display='none';
  w4.style.display='none';
  $('#lib').removeClass("disabled");
}else if(w1.style.display=='none'&&w2.style.display=='block'&&w3.style.display=='none'&&w4.style.display=='none'&&c2==4&&c3>0){
  w1.style.display='none';
  w2.style.display='none';
  w3.style.display='block';
  w4.style.display='none';
}else if(w1.style.display=='none'&&w2.style.display=='none'&&w3.style.display=='block'&&w4.style.display=='none'&&c3<=4&&c4>0){
  w1.style.display='none';
  w2.style.display='none';
  w3.style.display='none';
  w4.style.display='block';
  $("#lia").addClass("disabled");
}
// 设置之后，当页是否需要设置disabled
if(w1.style.display=='none'&&w2.style.display=='block'&&w3.style.display=='none'&&w4.style.display=='none'&&c2<=4&&c3==0){
   $("#lia").addClass("disabled");
}
if(w1.style.display=='none'&&w2.style.display=='none'&&w3.style.display=='block'&&w4.style.display=='none'&&c3<=4&&c4==0){
  $("#lia").addClass("disabled");
}
}

function previous(){
 if(w1.style.display=='none'&&w2.style.display=='block'&&w3.style.display=='none'&&w4.style.display=='none'){
  w1.style.display='block';
  w2.style.display='none';
  w3.style.display='none';
  w4.style.display='none';
  $('#lib').addClass("disabled");
  $(function () { $("[data-toggle='tooltip']").tooltip(); });
  $("#lia").removeClass("disabled");
 }else if(w1.style.display=='none'&&w2.style.display=='none'&&w3.style.display=='block'&&w4.style.display=='none'){
   w1.style.display='none';
  w2.style.display='block';
  w3.style.display='none';
  w4.style.display='none';
  $("#lia").removeClass("disabled");
 }else if(w1.style.display=='none'&&w2.style.display=='none'&&w3.style.display=='none'&&w4.style.display=='block'){
    w1.style.display='none';
  w2.style.display='none';
  w3.style.display='block';
  w4.style.display='none';
  $("#lia").removeClass("disabled");
 }
}

function globalsearch(){
oo.clearLayers();
   var kkk=$('#quanju').val().toString();
  if(kkk==''){
   alert('请输入信息后再做查询！');
  }else{
  $('#lh').css({"display":"none"});
   $('#ld').css({"display":"none"});
   $('#nh').css({"display":"none"});
   $('#xc').css({"display":"none"});
   $('#bd').css({"display":"block"});
   if(kkk=='建筑物'){
       $("#biaodan tr").remove(); 
       $('#quanju').val('');
    quanjuobj=[];
     quanjulist=[];
  var biao=document.getElementById('biaodan');
  var biao1=document.getElementById('biao');
  biao1.style.display='block';
  var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: {
                name: "POIs@Campus"
            },
            datasetNames: ["Campus:POIs"],
            toIndex:1000
        });
        L.supermap
            .featureService(url2)
            .getFeaturesBySQL(sqlParam, function (serviceResult) {
                var r=serviceResult.result.features.features;
                var pod=document.createElement("TR");
                pod.innerHTML='<td style="font-size:15px;color:#698B22;">名称</td>'+'<td style="font-size:15px;color:#698B22;">ID号</td>'+'<td style="font-size:15px;color:#698B22;">所属类型</td>'+'<td><center><span class="glyphicon glyphicon-flag" style="font-size:30px;color:#698B22;"></span></center></td>';
                biao.appendChild(pod);
                for(i=0;i<r.length;i++){
                  quanjulist.push(document.createElement("TR"));
                  quanjuobj.push(r[i]);
                     quanjulist[i].innerHTML='<td>'+r[i].properties.NAME+'</td>'+'<td>'+r[i].properties.SMID+'</td>'+'<td>'+r[i].properties.TYPE+'</td>'+'<td>'+'<button id="5566" class="btn btn-default" onclick="Startingpoint('+r[i].properties.SMX+','+r[i].properties.SMY+','+"'"+r[i].properties.NAME+"'"+')">从这出发</button>'+'<button class="btn btn-default" onclick="Endingpoint('+r[i].properties.SMX+','+r[i].properties.SMY+','+"'"+r[i].properties.NAME+"'"+')">到这里去</button>'+'</td>';
                     quanjulist[i].style.height='30px';
                     quanjulist[i].style.lineHeight='30px';
                     quanjulist[i].setAttribute('name',r[i].properties.NAME);
                     quanjulist[i].setAttribute('x',r[i].properties.SMX);
                     quanjulist[i].id=e;
                     biao.appendChild(quanjulist[i]);
                     e=e+1;
                }
            });
   }else if(kkk=='校车路线'){
    layertest=[];
  route.clearLayers();
  map.removeLayer(myGrouptest);
  map.removeLayer(myGroupstart);
  myGroupend.clearLayers();
   myGroupstart.clearLayers();
    $("#biaodan tr").remove();
    $('#quanju').val(''); 
          quanjuobj=[];
          quanjulist=[];
          $("#biaodan tr").remove();
  var biao=document.getElementById('biaodan');
  var biao1=document.getElementById('biao');
  biao1.style.display='block';
var pood=document.createElement("TR");
            pood.style.height='10px';
            pood.style.lineHeight='10px';
                pood.innerHTML='<td style="font-size:15px;color:#698B22;">路线名称</td>'+'<td style="font-size:15px;color:#698B22;">时间表</td>'+'<td style="font-size:15px;color:#698B22;">路线类型</td>';
                biao.appendChild(pood);
  var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: {
                name: "BusLine@Campus"
            },
            datasetNames: ["Campus:BusLine"],
            toIndex:1000
        });
        L.supermap
            .featureService(url2)
            .getFeaturesBySQL(sqlParam, function (serviceResult) {
                var r=serviceResult.result.features.features;
                for(i=0;i<r.length;i++){
                  quanjulist.push(document.createElement("TR"));
                  quanjuobj.push(r[i]);
quanjulist[i].innerHTML='<td>'+r[i].properties.NAME+'</td>'+'<td>'+r[i].properties.DSECRIPTION+'</td>'+'<td>'+r[i].properties.TYPE+'</td>';
                     quanjulist[i].style.height='30px';
                     quanjulist[i].style.lineHeight='30px';
                     quanjulist[i].onclick=function(){
                      f=$(this).index()-1;
                     oo.clearLayers();
                       oo.addData(r[f]);
                        map.addLayer(oo);   
                     };
                     biao.appendChild(quanjulist[i]);
                }
            });
   }else{
$("#biaodan tr").remove(); 
$('#quanju').val('');
                  quanjuobj=[];
                  quanjulist=[];
                  var biao=document.getElementById('biaodan');
                  var biao1=document.getElementById('biao');
                  biao1.style.display='block';
            var pood=document.createElement("TR");
                pood.innerHTML='<td style="font-size:15px;color:#698B22;">名称</td>'+'<td style="font-size:15px;color:#698B22;">类型</td>'+'<td style="font-size:15px;color:#698B22;">所属区域</td>'+'<td><center><span class="glyphicon glyphicon-flag" style="font-size:30px;color:#698B22;"></span></center></td>';
                biao.appendChild(pood);
      var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: {
                name: "POIs@Campus",
                attributeFilter: "Name like '%" + kkk + "%'"
            },
            datasetNames: ["Campus:POIs"],
            toIndex:1000
        });
        L.supermap
            .featureService(url2)
            .getFeaturesBySQL(sqlParam, function (serviceResult) {
              var f=serviceResult.result.features.features;
              for(i=0;i<f.length;i++){
                if(f[i].geometry.type=='Point'){
                     var tabpoint=document.createElement("TR");
                     tabpoint.innerHTML='<td>'+f[i].properties.NAME+'</td>'+'<td>建筑物</td>'+'<td>'+f[i].properties.TYPE+'</td>'+'<td>'+'<button id="5566" class="btn btn-default" onclick="Startingpoint('+f[i].properties.SMX+','+f[i].properties.SMY+','+"'"+f[i].properties.NAME+"'"+')">从这出发</button>'+'<button class="btn btn-default" onclick="Endingpoint('+f[i].properties.SMX+','+f[i].properties.SMY+','+"'"+f[i].properties.NAME+"'"+')">到这里去</button>'+'</td>';
                     tabpoint.style.height='30px';
                     tabpoint.style.lineHeight='30px';
                     biao.appendChild(tabpoint);
                }else if(f[i].geometry.type=='MultiPolygon'){
                     var tabpoy=document.createElement("TR");
                     tabpoy.innerHTML='<td>'+f[i].properties.NAME+'</td>'+'<td>建筑区域</td>'+'<td>'+f[i].properties.TYPE+'</td>';
                     tabpoy.style.height='30px';
                     tabpoy.style.lineHeight='30px';
                     tabpoy.onclick=function(){
                      var name=$(this).find('td').eq(0).text();
                      z=$(this).index()-1;
                      oo.clearLayers();
                     var content='<p>'+name+'</p>';
                       oo.addData(f[z]).bindPopup(content).openPopup();
                        map.addLayer(oo);      
                     };
                     biao.appendChild(tabpoy);
                }else if(f[i].geometry.type=='LineString'){
                  var tabrow=document.createElement("TR");
                     tabrow.innerHTML='<td>'+f[i].properties.NAME+'</td>'+'<td>路线</td>'+'<td>'+f[i].properties.TYPE+'</td>';
                     tabrow.style.height='30px';
                     tabrow.style.lineHeight='30px';
                     tabrow.onclick=function(){
                      var name=$(this).find('td').eq(0).text();
                      z=$(this).index()-1;
                      oo.clearLayers();
                     var content='<p>'+name+'</p>';
                       oo.addData(f[z]).bindPopup(content).openPopup();
                        map.addLayer(oo);      
                     };
                     biao.appendChild(tabrow);
                }
              }
            });
   }
   }
}

function Startingpoint(e,r,k){
 $("#qidian").val(k);
  map.closePopup();
  oo.clearLayers();
  layertest=[];
  route.clearLayers();
  map.removeLayer(myGrouptest);
  map.removeLayer(myGroupstart);
   myGroupstart.clearLayers();
   myIconstart=L.icon({
                        iconUrl:'img/start.png',
                        iconSize:[25,25]
                        });
  var layerstart=L.marker([r, e],{icon:myIconstart});
  myGroupstart.addLayer(layerstart);
  map.addLayer(myGroupstart);
  startx=e;
  starty=r;
  alert('设置成功，请设置路线终点');
  $('#analysis').addClass('disabled');
   var findPathService = L.supermap.networkAnalystService(url4);
            //创建最佳路径分析参数实例
            var resultSetting = new SuperMap.TransportationAnalystResultSetting({
                returnEdgeFeatures: true,
                returnEdgeGeometry: true,
                returnEdgeIDs: true,
                returnNodeFeatures: true,
                returnNodeGeometry: true,
                returnNodeIDs: true,
                returnPathGuides: true,
                returnRoutes: true
            });
            var analystParameter = new SuperMap.TransportationAnalystParameter({
                resultSetting: resultSetting
            });
            var findPathParameter = new SuperMap.FindPathParameters({
                isAnalyzeById: false,
                nodes: [L.point(startx,starty), L.point(endx,endy)],
                parameter: analystParameter
            });
            var myIcon = L.icon({
                iconUrl: "img/walk.png",
                iconSize: [20, 20]
            });
             //进行查找
            findPathService.findPath(findPathParameter, function (serviceResult) {
                var result = serviceResult.result;
                console.log(result);
                if(result.pathList.length==0){
                  alert('未检索到路线，请尝试其他方案');
                }else{
                     result.pathList.map(function (result) {
                    route.addData(result.route);
                    map.addLayer(route);
                    routepng=L.geoJSON(result.pathGuideItems, {
                        pointToLayer: function (geoPoints, latlng) {
                            var q=L.marker(latlng, { icon: myIcon });
                            layertest.push(q);
                            myGrouptest=L.layerGroup(layertest);
                            map.addLayer(myGrouptest);
                        },
                        filter: function (geoJsonFeature) {
                            if (geoJsonFeature.geometry && geoJsonFeature.geometry.type === 'Point') {
                                return true;
                            }
                            return false;
                        }
                    });
                    map.addLayer(routepng);
                })
                } 
            });
}
function Endingpoint(s,d,m){
  $("#zhongdian").val(m);
 oo.clearLayers();
  layertest=[];
  route.clearLayers();
  map.removeLayer(myGrouptest);
  map.removeLayer(myGroupend);
  myGroupend.clearLayers();
  var myIconend=L.icon({
                        iconUrl:'img/end.png',
                        iconSize:[25,25]
                        });
  var layerend=L.marker([d, s],{icon:myIconend});
  myGroupend.addLayer(layerend);
  map.addLayer(myGroupend);
  endx=s;
  endy=d;
  alert('设置成功，请点击分析获取路线');
  //创建最佳路径分析服务实例
            var findPathService = L.supermap.networkAnalystService(url4);
            //创建最佳路径分析参数实例
            var resultSetting = new SuperMap.TransportationAnalystResultSetting({
                returnEdgeFeatures: true,
                returnEdgeGeometry: true,
                returnEdgeIDs: true,
                returnNodeFeatures: true,
                returnNodeGeometry: true,
                returnNodeIDs: true,
                returnPathGuides: true,
                returnRoutes: true
            });
            var analystParameter = new SuperMap.TransportationAnalystParameter({
                resultSetting: resultSetting
            });
            var findPathParameter = new SuperMap.FindPathParameters({
                isAnalyzeById: false,
                nodes: [L.point(startx,starty), L.point(endx,endy)],
                parameter: analystParameter
            });
            var myIcon = L.icon({
                iconUrl: "img/walk.png",
                iconSize: [20, 20]
            });
             //进行查找
            findPathService.findPath(findPathParameter, function (serviceResult) {
                var result = serviceResult.result;
                console.log(result);
                if(result.pathList.length==0){
                  alert('未检索到路线，请尝试其他方案');
                }else{
                     result.pathList.map(function (result) {
                    route.addData(result.route);
                    map.addLayer(route);
                    routepng=L.geoJSON(result.pathGuideItems, {
                        pointToLayer: function (geoPoints, latlng) {
                            var q=L.marker(latlng, { icon: myIcon });
                            layertest.push(q);
                            myGrouptest=L.layerGroup(layertest);
                            map.addLayer(myGrouptest);
                        },
                        filter: function (geoJsonFeature) {
                            if (geoJsonFeature.geometry && geoJsonFeature.geometry.type === 'Point') {
                                return true;
                            }
                            return false;
                        }
                    });
                    map.addLayer(routepng);
                })
                }
            });
}

function clearlist(){
  myChartlight.off("click");
  var mm=document.getElementById('light');
  mm.style.display='none';
  var biao=document.getElementById('biaodan');
  var biao1=document.getElementById('biao');
  $("#biaodan tr").remove();
  biao1.style.display='none';
}

function clearlist2() {
    var biao = document.getElementById('biaodan');
    var biao1 = document.getElementById('biao');
    $("#biaodan tr").remove();
    biao1.style.display = 'none';
}

// 清除结果                              
function donthave(){
   $('#dropdownMenu1').val('');
    $('#dropdownMenu2').val('');
  $("#qidian").val('');
  $("#zhongdian").val('');
  clearlist2();
   clearr();
}

function gethave(){
  oo.clearLayers();
  layertest=[];
  route.clearLayers();
  map.removeLayer(myGrouptest);
  map.removeLayer(myGroupstart);
  map.removeLayer(myGroupend);
  myGroupend.clearLayers();
  myGroupstart.clearLayers();
  var kl = $("#dropdownMenu1").val();
  var km = $("#dropdownMenu2").val();
  var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
        queryParameter: {
            name: "POIs@Campus",
            attributeFilter: "POIs.Name in (" + "'" + kl + "'" + "," + "'" + km + "'" + ")"
        },
        datasetNames: ["Campus:POIs"],
        toIndex: 1000
    });
    L.supermap.featureService(url2).getFeaturesBySQL(sqlParam,
    function(serviceResult) {
        var f = serviceResult.result.features.features;
        var gg=f[0].properties.NAME;
         if(gg.indexOf(kl)==0){
                if (serviceResult.result.features.features.length < 2) {
            alert('信息模糊，请输入详细信息');
        } else {
            var startx = f[0].properties.SMX;
            var starty = f[0].properties.SMY;
            var endx = f[1].properties.SMX;
            var endy = f[1].properties.SMY;
            var myIconend = L.icon({
                iconUrl: 'img/start.png',
                iconSize: [30, 30]
            });
            var layerend20 = L.marker([starty, startx], {
                icon: myIconend
            });
            var myIconend = L.icon({
                iconUrl: 'img/end.png',
                iconSize: [30, 30]
            });
            var layerend22 = L.marker([endy, endx], {
                icon: myIconend
            });
            var findPathService = L.supermap.networkAnalystService(url4);
            //创建最佳路径分析参数实例
            var resultSetting = new SuperMap.TransportationAnalystResultSetting({
                returnEdgeFeatures: true,
                returnEdgeGeometry: true,
                returnEdgeIDs: true,
                returnNodeFeatures: true,
                returnNodeGeometry: true,
                returnNodeIDs: true,
                returnPathGuides: true,
                returnRoutes: true
            });
            var analystParameter = new SuperMap.TransportationAnalystParameter({
                resultSetting: resultSetting
            });
            var findPathParameter = new SuperMap.FindPathParameters({
                isAnalyzeById: false,
                nodes: [L.point(startx, starty), L.point(endx, endy)],
                parameter: analystParameter
            });
            var myIcon = L.icon({
                iconUrl: "img/walk.png",
                iconSize: [20, 20]
            });
            //进行查找
            findPathService.findPath(findPathParameter,
            function(serviceResult) {
                var result = serviceResult.result;
                if (result.pathList.length == 0) {
                    alert('未检索到路线，请尝试其他方案');
                } else {
                    result.pathList.map(function(result) {
                        route.addData(result.route);
                        map.addLayer(route);
                        routepng = L.geoJSON(result.pathGuideItems, {
                            pointToLayer: function(geoPoints, latlng) {
                                var q = L.marker(latlng, {
                                    icon: myIcon
                                });
                                layertest.push(q);
                                myGrouptest = L.layerGroup(layertest);
                                map.addLayer(myGrouptest);
                            },
                            filter: function(geoJsonFeature) {
                                if (geoJsonFeature.geometry && geoJsonFeature.geometry.type === 'Point') {
                                    return true;
                                }
                                return false;
                            }
                        });
                        map.addLayer(routepng);
                        myGroupend.addLayer(layerend20);
            myGroupend.addLayer(layerend22);
            map.addLayer(myGroupend);
                    })
                }
            });
        }
         }else{
        if (serviceResult.result.features.features.length < 2) {
            alert('信息模糊，请输入详细信息');
        } else {
            var startx = f[1].properties.SMX;
            var starty = f[1].properties.SMY;
            var endx = f[0].properties.SMX;
            var endy = f[0].properties.SMY;
            var myIconend = L.icon({
                iconUrl: 'img/start.png',
                iconSize: [30, 30]
            });
            var layerend20 = L.marker([starty, startx], {
                icon: myIconend
            });
            var myIconend = L.icon({
                iconUrl: 'img/end.png',
                iconSize: [30, 30]
            });
            var layerend22 = L.marker([endy, endx], {
                icon: myIconend
            });
            var findPathService = L.supermap.networkAnalystService(url4);
            //创建最佳路径分析参数实例
            var resultSetting = new SuperMap.TransportationAnalystResultSetting({
                returnEdgeFeatures: true,
                returnEdgeGeometry: true,
                returnEdgeIDs: true,
                returnNodeFeatures: true,
                returnNodeGeometry: true,
                returnNodeIDs: true,
                returnPathGuides: true,
                returnRoutes: true
            });
            var analystParameter = new SuperMap.TransportationAnalystParameter({
                resultSetting: resultSetting
            });
            var findPathParameter = new SuperMap.FindPathParameters({
                isAnalyzeById: false,
                nodes: [L.point(startx, starty), L.point(endx, endy)],
                parameter: analystParameter
            });
            var myIcon = L.icon({
                iconUrl: "img/walk.png",
                iconSize: [20, 20]
            });
            //进行查找
            findPathService.findPath(findPathParameter,
            function(serviceResult) {
                var result = serviceResult.result;
                if (result.pathList.length == 0) {
                    alert('未检索到路线，请尝试其他方案');
                } else {
                    result.pathList.map(function(result) {
                        route.addData(result.route);
                        map.addLayer(route);
                        routepng = L.geoJSON(result.pathGuideItems, {
                            pointToLayer: function(geoPoints, latlng) {
                                var q = L.marker(latlng, {
                                    icon: myIcon
                                });
                                layertest.push(q);
                                myGrouptest = L.layerGroup(layertest);
                                map.addLayer(myGrouptest);
                            },
                            filter: function(geoJsonFeature) {
                                if (geoJsonFeature.geometry && geoJsonFeature.geometry.type === 'Point') {
                                    return true;
                                }
                                return false;
                            }
                        });
                        map.addLayer(routepng);
                        myGroupend.addLayer(layerend20);
            myGroupend.addLayer(layerend22);
            map.addLayer(myGroupend);
                    })
                }
            });
        }
    }
    });
}