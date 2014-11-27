//判断当前页面是否加载了jQery库，防止重复加载造成冲突
//定义公共变量
window.onerror=function(){return true;}
var $page_video="span:contains('火狐浏览器')";
var $page_homewrok="h3:contains('作业')";
var $page_exam="h3:contains('网络通识课考试')";
var $iframe_name="_fr";
var $copy_control_target="#questionA";
var $title;
if(typeof(jQuery)=="undefined"){
	var my_jquery=document.createElement("script");
	my_jquery.src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js";
	document.body.appendChild(my_jquery);
}
switch(pageWhere()){
	case "video":
		freeVideo();
		alert("OK");
		break;
	case "homework":
		showkeyArea();
		insertKeyButton();
		enableCopy();
		alert("OK");
		break;
	case "exam":
		showkeyArea();
		insertKeyButton();
		enableCopy();
		alert("OK");
		break;
	default:
		alert("嗯，在这个页面好像没什么可做!");
}

function pageWhere(){
	try{
	if($($page_video).length>0){
		return "video";
	}
	if(getSubElem($page_homewrok).length>0){
		return "homework";
	}
	if(getSubElem($page_exam).length > 0){
		return "exam";
	}
	return "nothing";
	}catch(err){return "video";}
}

//用于获得iframe里面的dom对象
function getSubElem(string,type){
	if(typeof(type)=="undefined"){
		return $(document.getElementById($iframe_name).contentWindow.document.body).find(string);
	}else if(type=="filter"){
		return $(document.getElementById($iframe_name).contentWindow.document.body).filter(string);
	}else{
		return $(document.getElementById($iframe_name).contentWindow.document.body).find(string);
	}
	
}

function freeVideo(){
	isDiu = true;
	window.onblur=null;
	for(var i = 1; i < 1000; i++) {
		window.clearInterval(i);
	}
}


/*
 * 作业处理函数开始
 */
//在每道题目后插入获得答案的按钮
function insertKeyButton(){
	$("#_fr").attr("height","10000px");
	getSubElem("dd").append('<br /><button style="height:35px;padding-left:7px;padding-right:7px;font-size:16px;border:0px;background-color:#3385ff;color:#FFFFFF;border-radius:5px">搜索本题</button>');
	getSubElem("dd").find("button").click(function(event){
		event.preventDefault();
		//$(this).html("稍等片刻，正在获得的答案...");
		getKey(this);
	});
	search_button();
}
function getKey(my_button){
	var title=$(my_button).parent("dd").prev("dt").text();
	title=filterStr(title);
	title=title.substring(0,100);
	var url="http://www.baidu.com/s?wd="+title;
	$title=title;
	$("#search").attr("src",url);
	/*
	getSubElem("body").on("copy",function(){});
	getSubElem("body").on("beforecopy",function(){});
	getSubElem("#doing").remove();
	getSubElem("#divLogin").remove();
	*/
}
function search_button(){
		var search_type=$(this).attr('id');
		var url;
		$("#baidu").bind("click",function(){
			$("#search").attr("src","http://www.baidu.com/s?wd="+$title);
		});
		$("#360").bind("click",function(){
			$("#search").attr("src","http://www.so.com/s?ie=utf-8&shb=1&src=360sou_newhome&q="+$title);
		});
		$("#sougou").bind("click",function(){
			$("#search").attr("src","http://www.sogou.com/web?query="+$title);
		});
		$("#bing").bind("click",function(){
			$("#search").attr("src","http://cn.bing.com/search?q="+$title);
		});
		$("#soso").bind("click",function(){
			$("#search").attr("src","http://www.soso.com/q?ie=utf8&pid=s.idx&cid=s.idx.se&unc=&query="+$title);
		});
		$("#youdao").bind("click",function(){
			$("#search").attr("src","http://www.youdao.com/search?q="+$title);
		});
}
function enableCopy(){
	iframe_body=$(document.getElementById($iframe_name).contentWindow.document.body);
	iframe_body.attr("oncontextmenu","return true");
	iframe_body.attr("ondragstart","return true");
	iframe_body.attr("onselectstart","return true");
	iframe_body.attr("onselect","return true");
	iframe_body.attr("oncopy","return true");
	iframe_body.attr("onbeforecopy","return true");
	iframe_body.attr("onmouseup","return true");
	target=getSubElem($copy_control_target);
	target.onselectstart=function(){return true;}
	target.onmousedown=function(){return true;}
	getSubElem("dl").css("background-color","#cccccc");
}
function showkeyArea(){
	$(".main").append('<button id="ctrl" title="hide">隐藏搜索界面</button><div id="key_area">\
							<h4 id="area_title" style="border-bottom:1px solid #000"><center>搜答案</center></h4>\
							<div>\
								<button id="baidu">百度</button>\
								<button id="360">360搜索</button>\
								<button id="sougou">搜狗</button>\
								<button id="bing">Bing</button>\
								<button id="soso">腾讯SOSO</button>\
								<button id="youdao">有道</button>\
							</div>\
							<iframe target="_self" id="search" src="" width="100%" height="100%"/>\
							</div>'
					);
	var top=$(window).height()-300;
	$("#key_area").css({
		"position":"fixed",
		"top":top,
		"right":"0px",
		"width":"100%",
		"height":"300px",
		"background-color":"#ccc"
	});
	$("#ctrl").css({
		"position":"fixed",
		"top":"50px",
		"right":"50px",
		"height":"50px"
	});
	$("#ctrl").bind("click",function(){
		if($(this).attr("title") == "hide"){
			$("#key_area").hide();
			$(this).attr("title","show");
			$(this).html("显示搜索界面");
		}else{
			$("#key_area").show();
			$(this).attr("title","hide");
			$(this).html("隐藏搜索界面");
			
		}
	});

	

}
/*作业处理函数结束*/

/*
 * 一些辅助函数
 */
function filterStr(str){
	var dealStr=$.trim(str);
	dealStr=dealStr.replace('“',"'");
	dealStr=dealStr.replace('”',"'");
	dealStr=dealStr.replace('（',"(");
	dealStr=dealStr.replace('）',")");
	dealStr=dealStr.replace(/^[0-9]/,"");
	dealStr=dealStr.replace(/^[0-9]/,"");
	dealStr=dealStr.replace(/^、/,"");
	dealStr=dealStr.replace(/\(.{0,10}分\)/,"");
	return dealStr;
}

/*辅助函数结束*/
