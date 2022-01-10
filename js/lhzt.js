var arraylayers=[];
var myGrouplayer;
var arraylayers1=[];
var myGrouplayer1;
var arraylayers2=[];
var myGrouplayer2;
var fieldnameJ;
var fieldnameK;
var fieldnameh;
var fieldnameg;
var yangshu=[];
var fengshu=[];
var liushu=[];
var guihuashu=[];
var anshu=[];
var wutong=[];
var rongshu=[];
var huaishu=[];
var yinxing=[];
var xiangzhangshu=[];
var l,b,vv,cc,kk,jj,pp,aa;
var pp=0;
var myGroupmm;
var five=[];
var six=[];
var seven=[];
var eight=[];
var ten=[];
var data14=[];
var data15=[];
var data16=[];
var trash14=[];
var trash15=[];
var trash16=[];
var dataall=[];
var tree14=[];
var tree15=[];
var tree16=[];
var laji14=[];
var laji15=[];
var laji16=[];
var layerss=[];
var wr=['radius','area'];
var weatherIcons = {
    'Sunny': 'img/laji.png'
};
$('#checkboxSuccess1').click(function(){
	if(this.checked == true){
     var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: {
                name: "Streetseats@Campus"
            },
            datasetNames: ["Campus:Streetseats"]
        });
        L.supermap
            .featureService(url2)
            .getFeaturesBySQL(sqlParam, function (serviceResult) {
                var r=serviceResult.result.features.features;
                for(i=0;i<serviceResult.result.features.features.length;i++){
                	var myIcon=L.icon({
                        iconUrl:'img/yi.png',
                        iconSize:[68.95]
                        });
                	var layer=L.marker([r[i].properties.SMY,r[i].properties.SMX],{icon:myIcon});
                     arraylayers.push(layer);
                }
             myGrouplayer=L.layerGroup(arraylayers);
             map.addLayer(myGrouplayer);
            });
	}else{
		// 清除marker
    myGrouplayer.clearLayers();
	}
})

$('#checkboxSuccess2').click(function(){
	if(this.checked == true){
     var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: {
                name: "RubbishBins@Campus"
            },
            datasetNames: ["Campus:RubbishBins"]
        });
        L.supermap
            .featureService(url2)
            .getFeaturesBySQL(sqlParam, function (serviceResult) {
                var r=serviceResult.result.features.features;
                for(i=0;i<serviceResult.result.features.features.length;i++){
                	var myIcon=L.icon({
                        iconUrl:'img/rub2.png',
                        iconSize:[28]
                        });
                	var layer=L.marker([r[i].properties.SMY,r[i].properties.SMX],{icon:myIcon});
                     arraylayers1.push(layer);
                }
             myGrouplayer1=L.layerGroup(arraylayers1);
             map.addLayer(myGrouplayer1);
            });
	}else{
		// 清除marker
    myGrouplayer1.clearLayers();
	}
})

$('#checkboxSuccess3').click(function(){
	if(this.checked == true){
     var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: {
                name: "BorderTree@Campus"
            },
            datasetNames: ["Campus:BorderTree"]
        });
        L.supermap
            .featureService(url2)
            .getFeaturesBySQL(sqlParam, function (serviceResult) {
                var r=serviceResult.result.features.features;
                for(i=0;i<serviceResult.result.features.features.length;i++){
                	var myIcon=L.icon({
                        iconUrl:'img/tree.png',
                        iconSize:[38.95]
                        });
                	var layer=L.marker([r[i].properties.SMY,r[i].properties.SMX],{icon:myIcon});
                     arraylayers2.push(layer);
                }
             myGrouplayer2=L.layerGroup(arraylayers2);
             map.addLayer(myGrouplayer2);
            });
	}else{
		// 清除marker
    myGrouplayer2.clearLayers();
	}
})


function Greeningstatistics(){
  var mm=document.getElementById('light');
  mm.style.display='block';
	myChartlight.clear();
  $("#clearpointt").removeClass("disabled");
   var year=$("#selYear").find("option:selected").text();
   var target=$("#selType").find("option:selected").text();
   if(target == "行道树"){
       fieldnameJ="BorderTree@Campus";
       fieldnameK="Campus:BorderTree";
   }else{
   	   fieldnameJ="RubbishBins@Campus";
       fieldnameK="Campus:RubbishBins";
   }
   var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: {
                name: fieldnameJ,
                fields:['RefreshTime','Type','ID','Capacity']
            },
            datasetNames: [fieldnameK],
            toIndex:1000
        });
        L.supermap.featureService(url2).getFeaturesBySQL(sqlParam, function (serviceResult) {
                var r=serviceResult.result.features.features;
                //这里把树的结果加上
                for(var i=0;i<serviceResult.result.features.features.length;i++){
                   if(r[i].properties.Type==='杨树'){
                    var myIcon=L.icon({
                        iconUrl:'img/杨树.png',
                        iconSize:[45],
                        iconAnchor:[17,20]
                        });
                    var content='<span style="font-size:17px;">杨 树</span>'
                    var layer=L.marker([r[i].geometry.coordinates[1],r[i].geometry.coordinates[0]],{icon:myIcon}).bindPopup(content);
                     layerss.push(layer);
                   }else if(r[i].properties.Type==='枫树'){
                    var myIcon=L.icon({
                        iconUrl:'img/枫树.png',
                        iconSize:[45],
                        iconAnchor:[17,20]
                        }); 
                    var content='<span style="font-size:17px;">枫 树</span>'
                    var layer=L.marker([r[i].geometry.coordinates[1],r[i].geometry.coordinates[0]],{icon:myIcon}).bindPopup(content);
                     layerss.push(layer);
                   }else if(r[i].properties.Type==='柳树'){
                    var myIcon=L.icon({
                        iconUrl:'img/柳树.png',
                        iconSize:[45],
                        iconAnchor:[17,20]
                        }); 
                    var content='<span style="font-size:17px;">柳 树</span>'
                    var layer=L.marker([r[i].geometry.coordinates[1],r[i].geometry.coordinates[0]],{icon:myIcon}).bindPopup(content);
                     layerss.push(layer);
                   }else if(r[i].properties.Type==='桂花树'){
                    var myIcon=L.icon({
                        iconUrl:'img/桂花树.png',
                        iconSize:[45],
                        iconAnchor:[17,20]
                        });
                        var content='<span style="font-size:17px;">桂 花 树</span>' 
                    var layer=L.marker([r[i].geometry.coordinates[1],r[i].geometry.coordinates[0]],{icon:myIcon}).bindPopup(content);
                     layerss.push(layer);
                   }else if(r[i].properties.Type==='桉树'){
                    var myIcon=L.icon({
                        iconUrl:'img/桉树.png',
                        iconSize:[45],
                        iconAnchor:[17,20]
                        }); 
                    var content='<span style="font-size:17px;">桉 树</span>'
                    var layer=L.marker([r[i].geometry.coordinates[1],r[i].geometry.coordinates[0]],{icon:myIcon}).bindPopup(content);
                     layerss.push(layer);
                   }else if(r[i].properties.Type==='梧桐'){
                    var myIcon=L.icon({
                        iconUrl:'img/梧桐.png',
                        iconSize:[45],
                        iconAnchor:[17,20]
                        }); 
                    var content='<span style="font-size:17px;">梧 桐</span>'
                    var layer=L.marker([r[i].geometry.coordinates[1],r[i].geometry.coordinates[0]],{icon:myIcon}).bindPopup(content);
                     layerss.push(layer);
                   }else if(r[i].properties.Type==='榕树'){
                    var myIcon=L.icon({
                        iconUrl:'img/榕树.png',
                        iconSize:[45],
                        iconAnchor:[17,20]
                        }); 
                    var content='<span style="font-size:17px;">榕 树</span>'
                    var layer=L.marker([r[i].geometry.coordinates[1],r[i].geometry.coordinates[0]],{icon:myIcon}).bindPopup(content);
                     layerss.push(layer);
                   }else if(r[i].properties.Type==='槐树'){
                    var myIcon=L.icon({
                        iconUrl:'img/槐树.png',
                        iconSize:[45],
                        iconAnchor:[17,20]
                        }); 
                    var content='<span style="font-size:17px;">槐 树</span>'
                    var layer=L.marker([r[i].geometry.coordinates[1],r[i].geometry.coordinates[0]],{icon:myIcon}).bindPopup(content);
                     layerss.push(layer);
                   }else if(r[i].properties.Type==='银杏'){
                    var myIcon=L.icon({
                        iconUrl:'img/银杏.png',
                        iconSize:[45],
                        iconAnchor:[17,20]
                        }); 
                    var content='<span style="font-size:17px;">银 杏</span>'
                    var layer=L.marker([r[i].geometry.coordinates[1],r[i].geometry.coordinates[0]],{icon:myIcon}).bindPopup(content);
                     layerss.push(layer);
                   }else if(r[i].properties.Type==='香樟树'){
                    var myIcon=L.icon({
                        iconUrl:'img/香樟树.png',
                        iconSize:[45],
                        iconAnchor:[17,20]
                        }); 
                    var content='<span style="font-size:17px;">香 樟 树</span>'
                    var layer=L.marker([r[i].geometry.coordinates[1],r[i].geometry.coordinates[0]],{icon:myIcon}).bindPopup(content);
                     layerss.push(layer);
                   }
                }
            myGroupmm=L.layerGroup(layerss);
             map.addLayer(myGroupmm);
              var m=serviceResult.result.features;
              var resultLayerr = L.geoJSON(serviceResult.result.features);
              var y=resultLayerr.toGeoJSON();
               if(target=='行道树'){
                   	for(var t=0;t<y.features.length;t++){
               		l=y.features[t].properties.RefreshTime;
               	    b=y.features[t].properties.Type;
               		if(l==year){
                     switch(b){
                     case '杨树':
                     yangshu.push(b);
            
                     break;
                     case '枫树':
                     fengshu.push(b);
                     
                     break;
                     case '柳树':
                     liushu.push(b);
                    
                     break;
                     case '桂花树':
                     guihuashu.push(b);
                    
                     break;
                     case '桉树':
                     anshu.push(b);
                   
                     break;
                     case '梧桐':
                     wutong.push(b);
                   
                     break;
                     case '榕树':
                     rongshu.push(b);
                    
                     break;
                     case '槐树':
                     huaishu.push(b);
                    
                     break;
                     case '银杏':
                     yinxing.push(b);
                   
                     break;
                     case '香樟树':
                     xiangzhangshu.push(b);
                   
                     break;
                       }
               		}else{
                       continue;
               		}
               	}
                 var option = {
            title: {
                text: '统计图'
            },
             legend: {
                data:['树木种类及数量情况']
            },
            series: [{
                name: '树木种类及数量情况',
                type: 'pie',
                roseType: wr[pp],
                data: [
                {value:yangshu.length, name:'杨树'},
                {value:fengshu.length, name:'枫树'},
                {value:liushu.length, name:'柳树'},
                {value:guihuashu.length, name:'桂花树'},
                {value:anshu.length, name:'桉树'},
                {value:wutong.length, name:'梧桐'},
                {value:rongshu.length, name:'榕树'},
                {value:huaishu.length, name:'槐树'},
                {value:yinxing.length, name:'银杏'},
                {value:xiangzhangshu.length, name:'香樟树'}
                ]

            }]
        };
 myChartlight.setOption(option);
 yangshu=[];
 fengshu=[];
 liushu=[];
 guihuashu=[];
 anshu=[];
 wutong=[];
 rongshu=[];
 huaishu=[];
 yinxing=[];
 xiangzhangshu=[];
               }else{
               	for(var t=0;t<y.features.length;t++){
               		vv=y.features[t].properties.RefreshTime;
               	    cc=y.features[t].properties.Capacity;
               	    if(vv==year){
               	    	switch(cc){
               	   case '50':
                   five.push(cc);
                   break;
                   case '60':
                   six.push(cc);
                   break;
                   case '70':
                   seven.push(cc);
                   break;
                   case '80':
                   eight.push(cc);
                   break;
                   case '100':
                   ten.push(cc);
                   break;
               	    }
               	}else{
               		continue;
               	}
               	}
               	// for循环的
               	var option = {
            title: {
                text: '统计图'
            },
             legend: {
                data:['垃圾桶数量情况']
            },
            series: [{
                name: '垃圾桶数量情况',
                type: 'pie',
                roseType: 'radius',
                data: [
                {value:five.length,name:'容量50'},
                {value:six.length,name:'容量60'},
                {value:seven.length,name:'容量70'},
                {value:eight.length,name:'容量80'},
                {value:ten.length,name:'容量100'}
                ]
            }]
        };
 myChartlight.setOption(option);
 five=[];
 six=[];
 seven=[];
 eight=[];
 ten=[];
               }
               // else的
            });
}


function Maintain(){
   var mm=document.getElementById('light');
  mm.style.display='block';
	myChartlight.clear();
	var year=$("#selectyear").find("option:selected").text();
   var target=$("#selectype").find("option:selected").text();
   if(target == "行道树"){
       fieldnameh="BorderTree@Campus";
       fieldnameg="Campus:BorderTree";
   }else{
   	   fieldnameh="RubbishBins@Campus";
       fieldnameg="Campus:RubbishBins";
   }
   var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: {
                name: fieldnameh,
                fields:['RefreshTime','Type','ID','Capacity']
            },
            datasetNames: [fieldnameg],
            toIndex:1000
        });
        L.supermap.featureService(url2).getFeaturesBySQL(sqlParam, function (serviceResult) {
        					var m=serviceResult.result.features;
               var resultLayerr = L.geoJSON(serviceResult.result.features);
               var y=resultLayerr.toGeoJSON();
               if(target == "行道树"){
                 for(var t=0;t<y.features.length;t++){
                    kk=y.features[t].properties.RefreshTime;
               	    if(kk==year){
                   data14.push(kk);
               	    }else{
                   continue;
               	    }
               }
               var option = {
            title: {
                text: '统计图'
            },
            tooltip: {
            show: true //显示提示框
           },
            legend: {
                data:['行道树总量统计'],
                itemWidth:10
            },
            xAxis: {
                data: ['行道树数量'],
                max:0
            },
            animationDurationUpdate: 1200,
             axisLabel:{
              interval:0,
                rotate:40  
            },
            yAxis: {
              splitLine: {show: false}
            },
            series: [{
                name: '行道树总量统计',
                type: 'bar',
                itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#dce35b'},
                            {offset: 1, color: '#45B649'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#8cab6e'},
                            {offset: 1, color: '#52c234'}
                        ]
                    )
                }
            },
                // 不显示值
                barWidth: 150,
                data: [data14.length]
              }
                ]
        };
    myChartlight.setOption(option);
    data14=[];
               }else{
               	 for(var t=0;t<y.features.length;t++){
               	 jj=y.features[t].properties.RefreshTime;
               	 if(jj==year){
                   trash14.push(jj);
               	    }else{
                    continue;
               	    }
               	 }
               	 var option = {
            title: {
                text: '统计图'
            },
            tooltip: {
            show: true //显示提示框
           },
            legend: {
                data:['垃圾桶总量统计'],
                itemWidth:10
            },
            xAxis: {
                data: [''],
                axisLabel:{
              formatter: function (value) {
                return '垃圾桶数量';
            },
                  rich:{
                    value: {
                    height: 60,
                    align: 'center',
                    backgroundColor: {
                        image: weatherIcons.Sunny
                    }
                }
                  }
                }
            },
            animationDurationUpdate: 1200,
             axisLabel:{
              interval:0,
                rotate:40  
            },
            yAxis: {
              splitLine: {show: false}
            },
            series: [{
                name: '垃圾桶总量统计',
                type: 'bar',
                itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#56ab2f'},
                            {offset: 1, color: '#a8e063'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#76b852'},
                            {offset: 1, color: '#8dc26f'}
                        ]
                    )
                }
            },
                // 不显示值
                barWidth: 150,
                data: [trash14.length]
              }
                ]
        };
    myChartlight.setOption(option);
  trash14=[];
               }
               // else结束   
        });
        // 查询结束
}

function theyear(){
  var mm=document.getElementById('light');
  mm.style.display='block';
  myChartlight.clear();
  tree14=[];
 tree15=[];
 tree16=[];
 laji14=[];
 laji15=[];
 laji16=[];
   var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: {
            },
            datasetNames: ['Campus:BorderTree'],
            toIndex:1000
        });
   L.supermap.featureService(url2).getFeaturesBySQL(sqlParam, function (serviceResult) {
         var m=serviceResult.result.features;
               var resultLayerr = L.geoJSON(serviceResult.result.features);
               var y=resultLayerr.toGeoJSON();
               for(var t=0;t<y.features.length;t++){
                pp=y.features[t].properties.REFRESHTIME;
                if(pp=='2014年'){
                  tree14.push(pp);
                }else if(pp=='2015年'){
                  tree15.push(pp);
                }else{
                  tree16.push(pp);
                }
               }
            var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: {
            },
            datasetNames: ['Campus:RubbishBins'],
            toIndex:1000
        });
   L.supermap.featureService(url2).getFeaturesBySQL(sqlParam, function (serviceResult) {
         var m=serviceResult.result.features;
               var resultLayerr = L.geoJSON(serviceResult.result.features);
               var y=resultLayerr.toGeoJSON();
               for(var t=0;t<y.features.length;t++){
                aa=y.features[t].properties.REFRESHTIME;
                if(aa=='2014年'){
                  laji14.push(aa);
                }else if(aa=='2015年'){
                  laji15.push(aa);
                }else{
                  laji16.push(aa);
                }
               }
  var weatherIcons = {
    'Sunny': 'img/laji2.png',
    'Cloudy': 'img/treee.png'
};

var seriesLabel = {
    normal: {
        show: true,
        textBorderColor: '#333',
        textBorderWidth: 2
    }
}
        var option = {
     title: {
        text: '历年趋势统计'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['2014', '2015', '2016']
    },
    grid: {
        left: 100
    },
    toolbox: {
    },
    xAxis: {
        type: 'value',
        name: '数量',
        axisLabel: {
            formatter: '{value}'
        }
    },
    yAxis: {
        type: 'category',
        inverse: true,
        data: ['Trash', 'Tree'],
        axisLabel: {
            formatter: function (value) {
                return '{' + value + '| }\n{value|' + value + '}';
            },
            margin: 20,
            rich: {
                value: {
                    lineHeight: 30,
                    align: 'center'
                },
                Trash: {
                    
                    height: 40,
                    align: 'center',
                    backgroundColor: {
                        image: weatherIcons.Sunny
                    }
                },
               Tree: {
                    height: 40,
                    align: 'center',
                    backgroundColor: {
                        image: weatherIcons.Cloudy
                    }
                }
            }
        }
    },
    series: [
        {
            name: '2014',
            type: 'bar',
            data: [laji14.length, tree14.length],
            label: seriesLabel,
            markPoint: {
                symbolSize: 1,
                symbolOffset: [0, '50%'],
                label: {
                   normal: {
                        formatter: '{a|{a}\n}{b|{b} }{c|{c}}',
                        backgroundColor: 'rgb(242,242,242)',
                        borderColor: '#aaa',
                        borderWidth: 1,
                        borderRadius: 4,
                        padding: [4, 10],
                        lineHeight: 26,
                        position: 'right',
                        distance: 20,
                        rich: {
                            a: {
                                align: 'center',
                                color: '#fff',
                                fontSize: 18,
                                textShadowBlur: 2,
                                textShadowColor: '#000',
                                textShadowOffsetX: 0,
                                textShadowOffsetY: 1,
                                textBorderColor: '#333',
                                textBorderWidth: 2
                            },
                            b: {
                                 color: '#333'
                            }
                           
                        }
                   }
                },
                data: [
                   
                ]
            }
        },
        {
            name: '2015',
            type: 'bar',
            label: seriesLabel,
            data: [laji15.length, tree15.length]
        },
        {
            name: '2016',
            type: 'bar',
            label: seriesLabel,
            data: [laji16.length, tree16.length]
        }
    ]
};
      myChartlight.setOption(option);
               
   });
   });
}

function clearpointt(){
      myChartlight.clear();
      myGroupmm.clearLayers();
      Fullwidth()
     }