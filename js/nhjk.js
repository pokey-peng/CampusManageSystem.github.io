var ranks=[];
var n=0;
var layergroup=[];
var newgroup;
var group=[];
var groupname=[];
var pointY=[];
var pointX=[];
var fieldname;
var theGroup;
var layercom=[];
var overgroup=[];
var overgroupname=[];
var overgrouptype=[];
var overgroup2=[];
var overgroupname2=[];
var overgrouptype2=[];
var pointType=[];
var resultLayerjob='null';
var target,year;
function buildquery(){
  var hh=$("#jianzhu").val()
  if(hh==''){
   alert('请输入需要查询的建筑名后再查询！')
  }else{
    $("#build").find("li").remove();
    var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: {
                name: "POIs@Campus",
                attributeFilter: "Name like '%" + $('#jianzhu').val().toString() + "%'"
            },
            datasetNames: ["Campus:POIs"],
            toIndex:1000
        });
        L.supermap
            .featureService(url2).getFeaturesBySQL(sqlParam, function (serviceResult) {
              if(serviceResult.result.features.features.length==0){
                    alert('未查询到任何信息');
                }else{
              var resultLayer = L.geoJSON(serviceResult.result.features);
              var y=resultLayer.toGeoJSON();
              var c=y.features[0];
             var build=document.getElementById("build");
             for(i=0;i<y.features.length;i++){
              var myIcon=L.icon({
                        iconUrl:'img/绿化养护系统.png',
                        iconSize:[40]
                        }); 
              var content100='<span class="glyphicon glyphicon-home" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px">  建筑名:</span>'+'<span style="font-size:15px;">'+y.features[i].properties.NAME+'</span>'+'<br>'+'<span class="glyphicon glyphicon-asterisk" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;">  建筑物类别:</span>'+'<span style="font-size:15px;">'+y.features[i].properties.TYPE+'</span>'+'<br>'+'<span class="glyphicon glyphicon-star" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;">  建筑物ID: </span>'+'<span style="font-size:15px;">'+y.features[i].properties.SMID+'</span>'+'<br>'+'<span class="glyphicon glyphicon-tint" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;"> 用水量: </span>'+'<span style="font-size:15px;">'+y.features[i].properties.VALUE_E_13+'</span>'+'<br>'+'<span class="glyphicon glyphicon-flash" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;"> 用电量: </span>'+'<span style="font-size:15px;">'+y.features[i].properties.VALUE_W_13+'</span>';
        var layer=L.marker([y.features[i].properties.SMY,y.features[i].properties.SMX],{icon:myIcon}).bindPopup(content100);
                   layergroup.push(layer);
                   ranks.push(document.createElement("LI"));
                   ranks[n].innerHTML='&nbsp;'+'&nbsp;'+'<span class="glyphicon glyphicon-home"></span>'+'&nbsp;'+'&nbsp;'+'<a href="#">'+y.features[i].properties.NAME+'</a>';
                   ranks[n].setAttribute('a',y.features[i].properties.SMY);
                   ranks[n].setAttribute('b',y.features[i].properties.SMX);
                   ranks[n].style.height='40px';
                   ranks[0].style.marginTop='10px';
                   ranks[n].style.lineHeight='40px';
                   build.appendChild(ranks[n]);
                   ranks[n].onclick=function(){
                var Y=this.getAttribute('a');
                var X=this.getAttribute('b');
                map.flyTo([Y,X],18);
              }
                 n=n+1;
             }
            newgroup=L.layerGroup(layergroup)
            map.addLayer(newgroup);
            map.setZoom(14);
          }
            });
  }
}

function Eliminate(){
  Fullwidth();
  $("#build").find("LI").remove();
    newgroup.clearLayers();
    n=0;
    ranks=[];
    layergroup=[];
    $("#jianzhu").val("");
}

function Statistics(){
  myChartlight.off("click");
  var mm=document.getElementById('light');
  mm.style.display='block';
  myChartlight.clear();
   year=$("#selMonth").find("option:selected").text()-2000;
   target=$("#selEng").find("option:selected").text();
   if(target == "用水"){
       fieldname="Value_W"+"_"+ year;
   }else{
   	   fieldname="Value_E"+"_"+ year;
   }
	var sqlParamm = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: {
                name: "POIs@Campus",
                fields:[fieldname,'Name']
            },
            datasetNames: ["Campus:POIs"],
            toIndex:1000
        });
        L.supermap
            .featureService(url2)
            .getFeaturesBySQL(sqlParamm, function (serviceResult) {
            	var m=serviceResult.result.features;
               var resultLayerr = L.geoJSON(serviceResult.result.features);
               var y=resultLayerr.toGeoJSON();
           for(var t=0;t<y.features.length;t++){
         var u=m.features[t].properties[fieldname];
                 if(u==''){
                 	continue;
                 }else{
                 	group.push(u);
                 	groupname.push(y.features[t].properties.Name);
                 }
           }
            var option = {
            title: {
                text: '统计图',
            padding: [
                    20,  // 上
                    20, // 右
                    15,  // 下
                    20, // 左
                            ]
            },
            tooltip: {},
            legend: {
                data:['各建筑能耗使用统计'],
                itemWidth:10,
            padding: [
                    20,  // 上
                    20, // 右
                    15,  // 下
                    20, // 左
                            ]
            },
            xAxis: {
                data: groupname,
                max:37
            },
            yAxis: {

            },
            axisLabel:{
            	interval:0,
                rotate:40  
            },
            series: [{
                name: '各建筑能耗使用统计',
                type: 'bar',
                itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#83bff6'},
                            {offset: 0.5, color: '#188df0'},
                            {offset: 1, color: '#188df0'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#2378f7'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            },
                data: group

            }]
        };
 myChartlight.setOption(option);
 myChartlight.on("click", eConsole);
 group=[];
groupname=[];
            });
}


function eConsole(param) {
        switch (param.dataIndex) {
            default:
            if(theGroup==null){
                var l=param.dataIndex;
            var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: {
                name: "POIs@Campus"
            },
            datasetNames: ["Campus:POIs"],
            toIndex:1000
        });
        L.supermap.featureService(url2).getFeaturesBySQL(sqlParam, function (serviceResult) {
               var resultLayerrq = L.geoJSON(serviceResult.result.features);
               var rq=resultLayerrq.toGeoJSON();

              console.log(rq.features);
              for(f=0;f<rq.features.length;f++){
                pointY.push(rq.features[f].properties.SMY);
                pointX.push(rq.features[f].properties.SMX);

              }
              var myIcon=L.icon({
                        iconUrl:'img/绿化养护系统.png',
                        iconSize:[38.95]
                        });
           if(target == "用电"&&year == 13){
           var uuu='<span class="glyphicon glyphicon-home" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px">  建筑名:</span>'+'<span style="font-size:15px;">'+rq.features[l].properties.NAME+'</span>'+'<br>'+'<span class="glyphicon glyphicon-asterisk" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;">  建筑物类别:</span>'+'<span style="font-size:15px;">'+rq.features[l].properties.TYPE+'</span>'+'<br>'+'<span class="glyphicon glyphicon-star" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;">  建筑物ID: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.SMID+'</span>'+'<br>'+'<span class="glyphicon glyphicon-tint" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;"> 用水量: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.VALUE_E_13+'</span>'+'<br>'+'<span class="glyphicon glyphicon-flash" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;"> 用电量: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.VALUE_W_13+'</span>';
           }else if(target == "用电"&&year == 14){
            var uuu='<span class="glyphicon glyphicon-home" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px">  建筑名:</span>'+'<span style="font-size:15px;">'+rq.features[l].properties.NAME+'</span>'+'<br>'+'<span class="glyphicon glyphicon-asterisk" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;">  建筑物类别:</span>'+'<span style="font-size:15px;">'+rq.features[l].properties.TYPE+'</span>'+'<br>'+'<span class="glyphicon glyphicon-star" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;">  建筑物ID: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.SMID+'</span>'+'<br>'+'<span class="glyphicon glyphicon-tint" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;"> 用水量: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.VALUE_E_14+'</span>'+'<br>'+'<span class="glyphicon glyphicon-flash" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;"> 用电量: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.VALUE_W_14+'</span>';
           }else if(target == "用电"&&year == 15){
            var uuu='<span class="glyphicon glyphicon-home" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px">  建筑名:</span>'+'<span style="font-size:15px;">'+rq.features[l].properties.NAME+'</span>'+'<br>'+'<span class="glyphicon glyphicon-asterisk" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;">  建筑物类别:</span>'+'<span style="font-size:15px;">'+rq.features[l].properties.TYPE+'</span>'+'<br>'+'<span class="glyphicon glyphicon-star" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;">  建筑物ID: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.SMID+'</span>'+'<br>'+'<span class="glyphicon glyphicon-tint" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;"> 用水量: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.VALUE_E_15+'</span>'+'<br>'+'<span class="glyphicon glyphicon-flash" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;"> 用电量: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.VALUE_W_15+'</span>';
           }else if(target == "用水"&&year == 13){
              var uuu='<span class="glyphicon glyphicon-home" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px">  建筑名:</span>'+'<span style="font-size:15px;">'+rq.features[l].properties.NAME+'</span>'+'<br>'+'<span class="glyphicon glyphicon-asterisk" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;">  建筑物类别:</span>'+'<span style="font-size:15px;">'+rq.features[l].properties.TYPE+'</span>'+'<br>'+'<span class="glyphicon glyphicon-star" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;">  建筑物ID: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.SMID+'</span>'+'<br>'+'<span class="glyphicon glyphicon-tint" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;"> 用水量: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.VALUE_E_13+'</span>'+'<br>'+'<span class="glyphicon glyphicon-flash" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;"> 用电量: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.VALUE_W_13+'</span>';
           }else if(target == "用水"&&year == 14){
            var uuu='<span class="glyphicon glyphicon-home" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px">  建筑名:</span>'+'<span style="font-size:15px;">'+rq.features[l].properties.NAME+'</span>'+'<br>'+'<span class="glyphicon glyphicon-asterisk" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;">  建筑物类别:</span>'+'<span style="font-size:15px;">'+rq.features[l].properties.TYPE+'</span>'+'<br>'+'<span class="glyphicon glyphicon-star" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;">  建筑物ID: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.SMID+'</span>'+'<br>'+'<span class="glyphicon glyphicon-tint" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;"> 用水量: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.VALUE_E_14+'</span>'+'<br>'+'<span class="glyphicon glyphicon-flash" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;"> 用电量: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.VALUE_W_14+'</span>';
           }else if(target == "用水"&&year == 15){
           var uuu='<span class="glyphicon glyphicon-home" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px">  建筑名:</span>'+'<span style="font-size:15px;">'+rq.features[l].properties.NAME+'</span>'+'<br>'+'<span class="glyphicon glyphicon-asterisk" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;">  建筑物类别:</span>'+'<span style="font-size:15px;">'+rq.features[l].properties.TYPE+'</span>'+'<br>'+'<span class="glyphicon glyphicon-star" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;">  建筑物ID: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.SMID+'</span>'+'<br>'+'<span class="glyphicon glyphicon-tint" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;"> 用水量: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.VALUE_E_15+'</span>'+'<br>'+'<span class="glyphicon glyphicon-flash" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;"> 用电量: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.VALUE_W_15+'</span>';
           }
           var layerz=L.marker([rq.features[l].properties.SMY,rq.features[l].properties.SMX],{icon:myIcon}).bindPopup(uuu);
           map.flyTo([rq.features[l].properties.SMY,rq.features[l].properties.SMX],18);
            layercom.push(layerz);
             theGroup=L.layerGroup(layercom);
             map.addLayer(theGroup);
             layercom=[];
            });
            $("#clearpoint").removeClass("disabled");
               break;
            }else{
                 theGroup.clearLayers();
                 var l=param.dataIndex;
            var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: {
                name: "POIs@Campus"
            },
            datasetNames: ["Campus:POIs"],
            toIndex:1000
        });
        L.supermap.featureService(url2).getFeaturesBySQL(sqlParam, function (serviceResult) {
               var resultLayerrq = L.geoJSON(serviceResult.result.features);
               var rq=resultLayerrq.toGeoJSON();
              for(f=0;f<rq.features.length;f++){
                pointY.push(rq.features[f].properties.SMY);
                pointX.push(rq.features[f].properties.SMX);
              }
              var myIcon=L.icon({
                        iconUrl:'img/绿化养护系统.png',
                        iconSize:[38.95]
                        });
              if(target == "用电"&&year == 13){
           var uuu='<span class="glyphicon glyphicon-home" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px">  建筑名:</span>'+'<span style="font-size:15px;">'+rq.features[l].properties.NAME+'</span>'+'<br>'+'<span class="glyphicon glyphicon-asterisk" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;">  建筑物类别:</span>'+'<span style="font-size:15px;">'+rq.features[l].properties.TYPE+'</span>'+'<br>'+'<span class="glyphicon glyphicon-star" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;">  建筑物ID: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.SMID+'</span>'+'<br>'+'<span class="glyphicon glyphicon-tint" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;"> 用水量: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.VALUE_E_13+'</span>'+'<br>'+'<span class="glyphicon glyphicon-flash" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;"> 用电量: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.VALUE_W_13+'</span>';
           }else if(target == "用电"&&year == 14){
            var uuu='<span class="glyphicon glyphicon-home" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px">  建筑名:</span>'+'<span style="font-size:15px;">'+rq.features[l].properties.NAME+'</span>'+'<br>'+'<span class="glyphicon glyphicon-asterisk" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;">  建筑物类别:</span>'+'<span style="font-size:15px;">'+rq.features[l].properties.TYPE+'</span>'+'<br>'+'<span class="glyphicon glyphicon-star" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;">  建筑物ID: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.SMID+'</span>'+'<br>'+'<span class="glyphicon glyphicon-tint" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;"> 用水量: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.VALUE_E_14+'</span>'+'<br>'+'<span class="glyphicon glyphicon-flash" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;"> 用电量: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.VALUE_W_14+'</span>';
           }else if(target == "用电"&&year == 15){
            var uuu='<span class="glyphicon glyphicon-home" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px">  建筑名:</span>'+'<span style="font-size:15px;">'+rq.features[l].properties.NAME+'</span>'+'<br>'+'<span class="glyphicon glyphicon-asterisk" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;">  建筑物类别:</span>'+'<span style="font-size:15px;">'+rq.features[l].properties.TYPE+'</span>'+'<br>'+'<span class="glyphicon glyphicon-star" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;">  建筑物ID: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.SMID+'</span>'+'<br>'+'<span class="glyphicon glyphicon-tint" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;"> 用水量: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.VALUE_E_15+'</span>'+'<br>'+'<span class="glyphicon glyphicon-flash" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;"> 用电量: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.VALUE_W_15+'</span>';
           }else if(target == "用水"&&year == 13){
              var uuu='<span class="glyphicon glyphicon-home" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px">  建筑名:</span>'+'<span style="font-size:15px;">'+rq.features[l].properties.NAME+'</span>'+'<br>'+'<span class="glyphicon glyphicon-asterisk" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;">  建筑物类别:</span>'+'<span style="font-size:15px;">'+rq.features[l].properties.TYPE+'</span>'+'<br>'+'<span class="glyphicon glyphicon-star" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;">  建筑物ID: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.SMID+'</span>'+'<br>'+'<span class="glyphicon glyphicon-tint" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;"> 用水量: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.VALUE_E_13+'</span>'+'<br>'+'<span class="glyphicon glyphicon-flash" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;"> 用电量: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.VALUE_W_13+'</span>';
           }else if(target == "用水"&&year == 14){
            var uuu='<span class="glyphicon glyphicon-home" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px">  建筑名:</span>'+'<span style="font-size:15px;">'+rq.features[l].properties.NAME+'</span>'+'<br>'+'<span class="glyphicon glyphicon-asterisk" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;">  建筑物类别:</span>'+'<span style="font-size:15px;">'+rq.features[l].properties.TYPE+'</span>'+'<br>'+'<span class="glyphicon glyphicon-star" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;">  建筑物ID: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.SMID+'</span>'+'<br>'+'<span class="glyphicon glyphicon-tint" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;"> 用水量: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.VALUE_E_14+'</span>'+'<br>'+'<span class="glyphicon glyphicon-flash" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;"> 用电量: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.VALUE_W_14+'</span>';
           }else if(target == "用水"&&year == 15){
           var uuu='<span class="glyphicon glyphicon-home" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px">  建筑名:</span>'+'<span style="font-size:15px;">'+rq.features[l].properties.NAME+'</span>'+'<br>'+'<span class="glyphicon glyphicon-asterisk" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;">  建筑物类别:</span>'+'<span style="font-size:15px;">'+rq.features[l].properties.TYPE+'</span>'+'<br>'+'<span class="glyphicon glyphicon-star" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;">  建筑物ID: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.SMID+'</span>'+'<br>'+'<span class="glyphicon glyphicon-tint" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;"> 用水量: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.VALUE_E_15+'</span>'+'<br>'+'<span class="glyphicon glyphicon-flash" style="font-size:15px;">'+'</span>'+'<span style="font-size:15px;"> 用电量: </span>'+'<span style="font-size:15px;">'+rq.features[l].properties.VALUE_W_15+'</span>';
           }
           var layerz=L.marker([rq.features[l].properties.SMY,rq.features[l].properties.SMX],{icon:myIcon}).bindPopup(uuu);
           map.flyTo([rq.features[l].properties.SMY,rq.features[l].properties.SMX],18);
           layercom.push(layerz);
           theGroup=L.layerGroup(layercom);
            map.addLayer(theGroup);
            layercom=[];
            });
             break;
            }
        }
    }

function overproof(){
  myChartlight.off("click");
  var mm=document.getElementById('light');
  mm.style.display='block';
  myChartlight.clear();
  year=$("#selectY").find("option:selected").text()-2000;
    target=$("#selectT").find("option:selected").text();
   if(target == "用水"){
       fieldname="Value_W"+"_"+ year;
   }else{
       fieldname="Value_E"+"_"+ year;
   }
   var sqlParamm = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: {
                name: "POIs@Campus",
                fields:[fieldname,'Name','Type']
            },
            datasetNames: ["Campus:POIs"],
            toIndex:1000
        });
   L.supermap
            .featureService(url2)
            .getFeaturesBySQL(sqlParamm, function (serviceResult) {
              var m=serviceResult.result.features;
               var resultLayerr = L.geoJSON(serviceResult.result.features);
               var y=resultLayerr.toGeoJSON();
           for(var t=0;t<y.features.length;t++){
         var u=m.features[t].properties[fieldname];
              if(u==' '){
                  continue;
                 }else if(u>=20000){
                  overgroup.push(u);
                  overgroupname.push(y.features[t].properties.Name);
                  overgrouptype.push(y.features[t].properties.Type);
                  console.log(overgroup);
                 }else if(u>=5000&&u<=10000){
                    overgroup2.push(u);
                  overgroupname2.push(y.features[t].properties.Name);
                  overgrouptype2.push(y.features[t].properties.Type);
                  console.log(overgroup2);
                 }
           }
        if(target == "用水"){
      var overgroupnamee=overgroupname2;
      var overgroupp=overgroup2;
      var max=12000;
        }else{
          var overgroupnamee=overgroupname;
      var overgroupp=overgroup;
      var max=30000;
        }
         var option = {
            title: {
                text: '统计图',
            padding: [
                  20,  // 上
                  20, // 右
                  15,  // 下
                  20, // 左
                            ]
            },
            tooltip: {},
            legend: {
                data:['能耗超标建筑统计'],
                itemWidth:10,
                padding: [
                  20,  // 上
                  20, // 右
                  15,  // 下
                  20, // 左
                            ]
            },
            xAxis: {
                data: overgroupnamee,
                max:overgroupnamee.length-1
            },
            yAxis: {
                  max:max
            },
            axisLabel:{
              interval:0,
                rotate:40  
            },
            series: [{
                name: '能耗超标建筑统计',
                type: 'bar',
                data: overgroupp,
              itemStyle: {   
                //通常情况下：
                normal:{  
　　　　　　　　　　　　//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: function (params){
                        var colorList = ['#EED5B7','#EED2EE','#EECFA1','#EECBAD','#EEC900','#EEC591','#EEB4B4','#EEB422','#EEAEEE','#EEAD0E','#EEA9B8 ','#EEA2AD','#EE9A49'
                        ,'#EE9A00','#EE9572','#EE82EE','#EE8262','#EE7AE9','#EE799F','#EE7942','#EE7621','#EE7600','#EE6AA7','#EE6A50','#EE6363','#EE5C42','#EE4000','#EE3B3B'
                        ,'#EE3A8C','#EE30A7','#EE2C2C','#EE1289','#EE00EE','#EE0000','#BF3EFF','#DC143C','#DAA520','#DB7093','#CD6090','#CD3700'];
                        return colorList[params.dataIndex];
                    }
                  }
                }
            }]
        };
 myChartlight.setOption(option);
 myChartlight.on("click", locational);
 overgroup=[];
overgroupname=[];
overgrouptype=[];
overgroup2=[];
overgroupname2=[];
overgrouptype2=[];
            });
}


function locational(param){
  switch (param.dataIndex) {
            default:
            if(resultLayerjob=='null'){
              var l=param.dataIndex;
            var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: {
                name: "POIs@Campus",
                fields:['Name','Type']
            },
            datasetNames: ["Campus:POIs"],
            toIndex:1000
        });
        L.supermap.featureService(url2).getFeaturesBySQL(sqlParam, function (serviceResult) {
               var resultLayerrq = L.geoJSON(serviceResult.result.features);
               var rq=resultLayerrq.toGeoJSON();
              for(f=0;f<rq.features.length;f++){
                var u=rq.features[f].properties.Type
                pointType.push(u);
              }
            });
   var sqlParam1 = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: {
                name: "All_Region@Campus",
                attributeFilter: "Type='"+pointType[l]+"'"
            },
            datasetNames: ["Campus:All_Building"]
        });
        L.supermap
            .featureService(url2)
            .getFeaturesBySQL(sqlParam1, function (serviceResult) {
              if(serviceResult.result.features.features.length==0){
                    alert('无所属区域');
              }else{
              resultLayerjob = L.geoJSON(serviceResult.result.features).addTo(map).bindPopup('所属区域：'+pointType[l]+'').openPopup();
              }
            });
            }else{
              map.removeLayer(resultLayerjob);
              var l=param.dataIndex;
            var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: {
                name: "POIs@Campus",
                fields:['Name','Type']
            },
            datasetNames: ["Campus:POIs"],
            toIndex:1000
        });
        L.supermap.featureService(url2).getFeaturesBySQL(sqlParam, function (serviceResult) {
               var resultLayerrq = L.geoJSON(serviceResult.result.features);
               var rq=resultLayerrq.toGeoJSON();
              for(f=0;f<rq.features.length;f++){
                var u=rq.features[f].properties.Type
                pointType.push(u);
              }
            });
   var sqlParam1 = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: {
                name: "All_Region@Campus",
                attributeFilter: "Type='"+pointType[l]+"'"
            },
            datasetNames: ["Campus:All_Building"]
        });
        L.supermap
            .featureService(url2)
            .getFeaturesBySQL(sqlParam1, function (serviceResult) {
              if(serviceResult.result.features.features.length==0){
                    alert('无所属区域');
              }else{
          resultLayerjob = L.geoJSON(serviceResult.result.features).addTo(map).bindPopup('所属区域：'+pointType[l]+'').openPopup(); 
              }
            });
            }
               break;
        }
        $("#clearquery").removeClass("disabled");
}
      function clearquery(){
        myChartlight.clear();
     map.removeLayer(resultLayerjob);
     Fullwidth()
 }
     function clearpoint(){
      myChartlight.clear();
      theGroup.clearLayers();
      Fullwidth()
     }
