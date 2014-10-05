//判断当前页面是否加载了jQery库，防止重复加载造成冲突
if(typeof(jQuery)=="undefined"){
	var my_jquery=document.createElement("script");
	my_jquery.src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js";
	document.body.appendChild(my_jquery);
}
switch(pageWhere()){
	case "video":
		freeVideo();
		break;
	case "homework":
		insertKeyButton();
		break;
	default:
		alert("嗯，在这个页面好像没什么可做!");
}

function pageWhere(){
	if($("span:contains('火狐浏览器')").length>0){
		return "video";
	}
	if(getSubElem("h3:contains('作业')").length>0){
		return "homework";
	}
	return "nothing";
}

//用于获得iframe里面的dom对象
function getSubElem(string,type){
	if(typeof(type)=="undefined"){
		return $(document.getElementById('_fr').contentWindow.document.body).find(string);
	}else if(type=="filter"){
		return $(document.getElementById("_fr").contentWindow.document.body).filter(string);
	}else{
		return $(document.getElementById("_fr").contentWindow.document.body).find(string);
	}
	
}

function freeVideo(){
	isDiu = true;
	window.onblur=null;
	for(var i = 1; i < 1000; i++) {
		window.clearInterval(i);
	}
	alert("现在你可以做别的事了，别忘了一会回来看看有没有验证码！");
}


/*
 * 作业处理函数开始
 */
//在每道题目后插入获得答案的按钮
function insertKeyButton(){
	getSubElem("dd").append('<br><button style="padding-left:7px;padding-right:7px;font-size:16px;border:0px;background-color:#50516D;color:#FAF9B8">获得本题答案</button>');
	getSubElem("dd").find("button").click(function(event){
		event.preventDefault();
		$(this).html("稍等片刻，正在获得的答案...");
		getAnswer(this);
	});
}
//该函数用于获得远程服务器上的答案
function getAnswer(my_button){
	var title=$(my_button).parent("dd").prev("dt").text();
	title=filterStr(title);
}
function showAnswerPage(){
	
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
	dealStr=dealStr.replace(/^、/,"");
	return dealStr;
}

/*辅助函数结束*/
