var otk=[];
var biaolist=[];
var biaoobj=[];
var rankss=[];
var modal=[];
var ooo=L.geoJSON();
var resultLayerpop;
var f;
var z=0;
var listt = [];
var drawControl=null;
function newadd(){
  $("#bianji").removeClass("disabled");
  donot();
  var biao1=document.getElementById('biao');
  biao1.style.display='none';
	editableLayerss = new L.FeatureGroup();
  map.addLayer(editableLayerss);
	handler3 = new L.Draw.Polyline(map);
            handler3.enable();
}
function editt(){
  donot();
  var biao1=document.getElementById('biao');
  biao1.style.display='none';
  drawControl = new L.Control.Draw({
      position:"topleft",
              draw: false,
         edit: {
             featureGroup: editableLayerss
         }
     });
     map.addControl(drawControl);
}

function Submission(){
  $("#bianji").addClass("disabled");
    if(drawControl==null){
        
    }else{
      map.removeControl(drawControl);
    }
	var an=$('#attributename').val();
	var av=$('#attributevalue').val();
	var at=$('#attributetime').val();      
	ally.properties.Name=an;
	ally.properties.Type=av;
	ally.properties.Dsecription=at;
  if(an==""||av==""||at==""){
      alert('请填写更新信息再提交路线！');
  }else{
    var param = new SuperMap.EditFeaturesParameters({
                dataSourceName: "Campus",
                dataSetName: "BusLine",
                features: ally,
                editType: "add",
                returnContent: true
            });
              L.supermap.featureService(url2).editFeatures(param, function(result){
                console.log(result);
                alert('提交成功!');
                map.removeLayer(editableLayerss);
                  objid.push(result.result[0]);
              });
          $('#attributename').val('');
          $('#attributevalue').val('');
          $('#attributetime').val('');
  }
}

function shanchu(){
	$("#bianji").addClass("disabled");
  if(drawControl==null){
        
    }else{
      map.removeControl(drawControl);
    }
	var deleteParams = new SuperMap.EditFeaturesParameters({
                dataSourceName: "Campus",
                dataSetName: "BusLine",
                IDs: objid,
                editType: "delete"
            });
              L.supermap.featureService(url2).editFeatures(deleteParams, function(result){
                alert('删除成功!');
              });
              objid=[];
              map.removeLayer(editableLayerss);
}

function Queryroute(){
	if($('#jiaotong').val()==''){
    alert('请输入查询路线！');
	}else{
    donot();
   biaoobj=[];
   var biao=document.getElementById('biaodan');
   var biao1=document.getElementById('biao');
  biao1.style.display='block';
   var pood=document.createElement("TR");
            pood.style.height='10px';
            pood.style.lineHeight='10px';
                pood.innerHTML='<td style="font-size:15px;color:#698B22;">道路名称</td>'+'<td style="font-size:15px;color:#698B22;">时间表</td>'+'<td style="font-size:15px;color:#698B22;">道路类型</td>';
                biao.appendChild(pood);
		var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: {
                name: "BusLine@Campus",
                attributeFilter: "Name like '%" + $('#jiaotong').val().toString() + "%'"
            },
            datasetNames: ["Campus:BusLine"]
        });
        L.supermap
            .featureService(url2)
            .getFeaturesBySQL(sqlParam, function (serviceResult) {
                if(serviceResult.result.features.features.length==0){
                    alert('未查询到任何信息');
                }else{
                      newresultLayer = L.geoJSON(serviceResult.result.features).addTo(map);
                var r=serviceResult.result.features.features;
                for(i=0;i<r.length;i++){
                  biaolist.push(document.createElement("tr"));
                  biaoobj.push(r[i]);
biaolist[i].innerHTML='<td>'+r[i].properties.NAME+'</td>'+'<td>'+r[i].properties.DSECRIPTION+'</td>'+'<td>'+r[i].properties.TYPE+'</td>';
                      biaolist[i].setAttribute('b',r[i].id);
                     biaolist[i].setAttribute('data-toggle',"modal");
                     biaolist[i].setAttribute('data-target',"#myModal");
                     biaolist[i].onclick=function(){
                     f=$(this).index();
                     };
                     biao.appendChild(biaolist[i]);
                     $('#jiaotong').val('');
                }
                }
            });
	}
}

function Onebuttonquery(){
  donot();
  biaoobj=[];
  var biao=document.getElementById('biaodan');
  var biao1=document.getElementById('biao');
  biao1.style.display='block';

  var pood=document.createElement("TR");
            pood.style.height='30px';
            pood.style.lineHeight='30px';
                pood.innerHTML='<td style="font-size:15px;color:#698B22;">道路名称</td>'+'<td style="font-size:15px;color:#698B22;">时间表</td>'+'<td style="font-size:15px;color:#698B22;">道路类型</td>';
                biao.appendChild(pood);
	var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: {
                name: "BusLine@Campus"
            },
            datasetNames: ["Campus:BusLine"]
        });
        L.supermap
            .featureService(url2)
            .getFeaturesBySQL(sqlParam, function (serviceResult) {
                allresultLayer = L.geoJSON(serviceResult.result.features).addTo(map);
                var r=serviceResult.result.features.features;
                for(i=0;i<r.length;i++){
                  biaolist.push(document.createElement("TR"));
                  biaoobj.push(r[i]);
biaolist[i].innerHTML='<td>'+r[i].properties.NAME+'</td>'+'<td>'+r[i].properties.DSECRIPTION+'</td>'+'<td>'+r[i].properties.TYPE+'</td>';
                     biaolist[i].setAttribute('b',r[i].id);
                     biaolist[i].setAttribute('data-toggle',"modal");
                     biaolist[i].setAttribute('data-target',"#myModal");
                     biaolist[i].style.height='30px';
                     biaolist[i].style.lineHeight='30px';
                     biaolist[i].onclick=function(){
                     f=$(this).index();
                     };
                     biao.appendChild(biaolist[i]);
                }
            });  
}


function donot1(){
  Fullwidth();
  rankss=[];
  ooo.clearLayers();
  $("#thebuild").find("ul").remove();
  $("#jiaotong").val("");
}


function donot(){
  biaolist=[];
  modal=[];
  $("#biaodan tr").remove(); 
  var biao1=document.getElementById('biao');
  biao1.style.display='none';
   if(newresultLayer!='null'&&allresultLayer=='null'){
   	map.removeLayer(newresultLayer);
   	newresultLayer='null';
   }else if(newresultLayer!='null'&&allresultLayer!='null'){
      map.removeLayer(newresultLayer);
      map.removeLayer(allresultLayer);
      newresultLayer='null';
      allresultLayer='null';
   }else if(newresultLayer=='null'&&allresultLayer!='null'){
    map.removeLayer(allresultLayer);
    allresultLayer='null';
   }else{
  
   }
	
}

function edittest(){
  var an=$('#attributeroad').val();
  var ana=$('#attributeroadd').val();
  var anb=$('#attributeroaddd').val();
  if(an==''||ana==''||anb==''){
      alert('请填写完整更新信息！');
  }else{
  biaoobj[f].properties.NAME=an;
  biaoobj[f].properties.TYPE=ana;
  biaoobj[f].properties.DSECRIPTION=anb;
  var param = new SuperMap.EditFeaturesParameters({
                dataSourceName: "Campus",
                dataSetName: "BusLine",
                features: biaoobj[f],
                editType: "update"
            });
          L.supermap.featureService(url2).editFeatures(param, function(result){
                alert('更新成功,请关闭并重新查询！');
                $('#attributeroad').val('');
                $('#attributeroadd').val('');
                $('#attributeroaddd').val('');
              });
  }
}

function search(){
  donot();
      if($('#daolu').val()==''){
    alert('请输入查询路线！');
  }else{
    var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: {
                name: "BusLine@Campus",
                attributeFilter: "Name like '%" + $('#daolu').val().toString() + "%'"
            },
            datasetNames: ["Campus:BusLine"]
        });
        L.supermap
            .featureService(url2)
            .getFeaturesBySQL(sqlParam, function (serviceResult) {
               console.log(serviceResult);
                resultLayerpop = L.geoJSON(serviceResult.result.features).addTo(map).bindPopup(serviceResult.result.features.features[0].properties.NAME).openPopup();
                otk.push(serviceResult.result.features.features[0].id);
            });
  }
}

function cute(){
  donot();
  var biao1=document.getElementById('biao');
  biao1.style.display='none';
     var deparam = new SuperMap.EditFeaturesParameters({
                dataSourceName: "Campus",
                dataSetName: "BusLine",
                IDs: otk,
                editType: "delete"
            });

          L.supermap.featureService(url2).editFeatures(deparam, function(result){
                alert('删除成功!');
                map.removeLayer(resultLayerpop);
                otk=[];
                $("#daolu").val(" ");
              });
}

function Queryroute1(){
    if($('#jiaotong').val()==''){
    alert('请输入查询路线！');
  }else{
  Fullwidth();
  rankss=[];
  modal=[];
  ooo.clearLayers();
  $("#thebuild").find("ul").remove();
    biaoobj=[];
    var sqlParam1 = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: {
                name: "BusLine@Campus",
                attributeFilter: "Name like '%" + $('#jiaotong').val().toString() + "%'"
            },
            datasetNames: ["Campus:BusLine"],
            toIndex:1000
        });
        L.supermap
            .featureService(url2)
            .getFeaturesBySQL(sqlParam1, function (serviceResult) {
              console.log(serviceResult);
               if(serviceResult.result.features.features.length==0){
                    alert('未查询到任何信息');
                }else{
                  var build=document.getElementById("thebuild");
               var r=serviceResult.result.features.features;
                for(i=0;i<r.length;i++){
                  biaoobj.push(r[i]);
                  rankss.push(document.createElement("ul"));
                   modal.push(document.createElement("tbody"));
                modal[i].innerHTML='<tr><td class="success">'+r[i].properties.NAME+'</td>'+'<td class="success">'+r[i].properties.DSECRIPTION+'</td>'+'<td class="success">'+r[i].properties.TYPE+'</td>'+'<td class="success">'+r[i].properties.ID+'</td></tr>';
                rankss[i].innerHTML='<li style="float:left;width:65%;">'+'&nbsp;'+'&nbsp;'+'<span class="glyphicon glyphicon-share-alt"></span>'+'&nbsp;'+'&nbsp;'+'<a href="#">'+r[i].properties.NAME+'</a>'+'&nbsp;'+'&nbsp;'+'</li><div style="float:right"><button style="float:left;line-height:25px;" class="btn btn-default" data-toggle="modal" data-target="#myModal">'+'<span class="glyphicon glyphicon-edit"></span>'+'</button>'+'&nbsp;'+'<button style="float:right;line-height:25px;margin-left:3px;" class="btn btn-default supermap" data-toggle="modal" data-target="#myModal2" onclick="addd('+i+')" id="'+i+'">'+'<span class="glyphicon glyphicon-exclamation-sign"></span>'+'</button></div>';
                     rankss[i].style.height='40px';
                     rankss[0].style.marginTop='10px';
                     rankss[i].style.lineHeight='40px';
                     rankss[i].onclick=function(){
                      f=$(this).index()-3;
                     ooo.clearLayers();
                       ooo.addData(r[f]);
                        map.addLayer(ooo);   
                     };
                     build.appendChild(rankss[i]);
                      $("#shuoming").addClass("table");
                $("#shuoming").addClass("table-bordered");
                }
                }
            });
  }
  //这里else结束
}

function Onebuttonquery1(){
  donot1();
  biaoobj=[];
  modal=[];
   var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: {
                name: "BusLine@Campus"
            },
            datasetNames: ["Campus:BusLine"]
        });
        L.supermap
            .featureService(url2)
            .getFeaturesBySQL(sqlParam, function (serviceResult) {
              var build=document.getElementById("thebuild");
              var r=serviceResult.result.features.features;
              console.log(r);
              for(var i=0;i<r.length;i++){
                modal.push(document.createElement("tbody"));
                modal[i].innerHTML='<tr><td class="success">'+r[i].properties.NAME+'</td>'+'<td class="success">'+r[i].properties.DSECRIPTION+'</td>'+'<td class="success">'+r[i].properties.TYPE+'</td>'+'<td class="success">'+r[i].properties.ID+'</td></tr>';
                biaoobj.push(r[i]);
                rankss.push(document.createElement("ul"));
                rankss[i].innerHTML='<li style="float:left;width:65%;">'+'&nbsp;'+'&nbsp;'+'<span class="glyphicon glyphicon-share-alt"></span>'+'&nbsp;'+'&nbsp;'+'<a href="#">'+r[i].properties.NAME+'</a>'+'&nbsp;'+'&nbsp;'+'</li><div style="float:right"><button style="float:left;line-height:25px;" class="btn btn-default" data-toggle="modal" data-target="#myModal">'+'<span class="glyphicon glyphicon-edit"></span>'+'</button>'+'&nbsp;'+'<button style="float:right;line-height:25px;margin-left:3px;" class="btn btn-default supermap" data-toggle="modal" data-target="#myModal2" onclick="addd('+i+')" id="'+i+'">'+'<span class="glyphicon glyphicon-exclamation-sign"></span>'+'</button></div>';
                rankss[i].style.height='40px';
                rankss[0].style.marginTop='10px';
                rankss[i].style.lineHeight='40px';
                rankss[i].onclick=function(){
                      f=$(this).index()-3;
                     ooo.clearLayers();
                     ooo.addData(r[f]);
                     map.addLayer(ooo);   
                     };
                build.appendChild(rankss[i]);
                $("#shuoming").addClass("table");
                $("#shuoming").addClass("table-bordered");
              }
            });
}

function addd(e){
   var motai=document.getElementById("shuoming");
   $("#shuoming").find("tbody").eq(1).remove();
       motai.appendChild(modal[e]);
}

// input框监听事件
function gaibian() {
    bn = 0;
    carName = [];
    // 先做一个查询
    var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
        queryParameter: {
            name: "POIs@Campus"
        },
        datasetNames: ["Campus:POIs"],
        toIndex: 1000
    });
    L.supermap.featureService(url2).getFeaturesBySQL(sqlParam,
    function(serviceResult) {
        var f = serviceResult.result.features.features;
        console.log(f);
        for (var h = 0; h < f.length; h++) {
            carName.push(f[h].properties.NAME);
        }
        $('#xialai').css({
            'display': 'block'
        });
        var kkk = $('#dropdownMenu1').val().toString();
        if (kkk == '') {
            arr = [];
            $(".dropdown-menu").find("li").remove();
            $('#xialai').css({
                'display': 'none'
            });
        } else {
            //字符串方法indexOf
            var len = carName.length;
            var arr = [];
            for (var i = 0; i < len; i++) {
                //如果字符串中不包含目标字符会返回-1
                if (carName[i].indexOf(kkk) >= 0) {
                    arr.push(carName[i]);
                }
            }
            console.log(arr);
            $(".dropdown-menu").find("li").remove();
            for (var t = 0; t < arr.length; t++) {
                listt.push(document.createElement("li"));
                listt[t].innerHTML = '<a>' + arr[t] + '</a>';
                listt[t].setAttribute('name', arr[t]);
                listt[t].onclick = function() {
                    var YYY = this.getAttribute('name');
                    $('#dropdownMenu1').val(YYY);
                    $('#xialai').css({
                        'display': 'none'
                    });
                }
                var qqq = document.getElementById('xialai');
                qqq.appendChild(listt[t]);
            }
        }
    });
}

// input框监听事件
function gaibian2() {
    bn = 0;
    carName = [];
    // 先做一个查询
    var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
        queryParameter: {
            name: "POIs@Campus"
        },
        datasetNames: ["Campus:POIs"],
        toIndex: 1000
    });
    L.supermap.featureService(url2).getFeaturesBySQL(sqlParam,
    function(serviceResult) {
        var f = serviceResult.result.features.features;
        for (var h = 0; h < f.length; h++) {
            carName.push(f[h].properties.NAME);
        }
        $('#xialai2').css({
            'display': 'block'
        });
        var kkk = $('#dropdownMenu2').val().toString();
        if (kkk == '') {
            arr = [];
            $(".dropdown-menu").find("li").remove();
            $('#xialai2').css({
                'display': 'none'
            });
        } else {
            //字符串方法indexOf
            var len = carName.length;
            var arr = [];
            for (var i = 0; i < len; i++) {
                //如果字符串中不包含目标字符会返回-1
                if (carName[i].indexOf(kkk) >= 0) {
                    arr.push(carName[i]);
                }
            }
            $(".dropdown-menu").find("li").remove();
            for (var t = 0; t < arr.length; t++) {
                listt.push(document.createElement("li"));
                listt[t].innerHTML = '<a>' + arr[t] + '</a>';
                listt[t].setAttribute('name', arr[t]);
                listt[t].onclick = function() {
                    var YYY = this.getAttribute('name');
                    $('#dropdownMenu2').val(YYY);
                    $('#xialai2').css({
                        'display': 'none'
                    });
                }
                var qqq = document.getElementById('xialai2');
                qqq.appendChild(listt[t]);
            }
        }
    });
}

// 这是一个键盘监听
$("#dropdownMenu1").keydown(function(e) {
    switch (e.keyCode) {
    case 40:
        var g = $(".dropdown-menu").find("li").length;
        if (bn < g) {
            $(".dropdown-menu").find("li").removeClass('active');
            $(".dropdown-menu").find("li").eq(bn).addClass('active');
            bn = bn + 1;
        }
        break;
    case 38:
        if (bn > 1) {
            $(".dropdown-menu").find("li").removeClass('active');
            $(".dropdown-menu").find("li").eq(bn - 2).addClass('active');
            bn = bn - 1;
        }
        break;
    case 13:
        var YYY = $('.dropdown-menu').find(".active").attr('name');
        if(YYY==undefined){
           $('#xialai').css({
            'display': 'none'
        });
        }else{
            $('#dropdownMenu1').val(YYY);
        $('#xialai').css({
            'display': 'none'
        });
        }
        $('.dropdown-menu').find(".active").removeClass('active');
        bn = 0;
        break;
    default:
        break;
    }
});
$("#dropdownMenu2").keydown(function(e) {
    switch (e.keyCode) {
    case 40:
        var g = $(".dropdown-menu").find("li").length;
        if (bn < g) {
            $(".dropdown-menu").find("li").removeClass('active');
            $(".dropdown-menu").find("li").eq(bn).addClass('active');
            bn = bn + 1;
        }
        break;
    case 38:
        if (bn > 1) {
            $(".dropdown-menu").find("li").removeClass('active');
            $(".dropdown-menu").find("li").eq(bn - 2).addClass('active');
            bn = bn - 1;
        }
        break;
    case 13:
        var YYY = $('.dropdown-menu').find(".active").attr('name');
        if(YYY===undefined){
        $('#xialai2').css({
            'display': 'none'
        });
        }else{
           $('#dropdownMenu2').val(YYY);
        $('#xialai2').css({
            'display': 'none'
        });
        }
        $('.dropdown-menu').find(".active").removeClass('active');
        bn = 0;
        break;
    default:
        break;
    }
});

