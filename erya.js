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
	default:
		alert("嗯，在这个页面好像没什么可做!");
}

function pageWhere(){
	if($("span:contains('火狐浏览器')").length>0){
		return "video";
	}
	return "nothing";
}

function freeVideo(){
	isDiu = true;
	window.onblur=null;
	for(var i = 1; i < 1000; i++) {
		window.clearInterval(i);
	}
	alert("现在你可以做别的事了，别忘了一会回来看看有没有验证码！");
}
