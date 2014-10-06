<?php

echo getRemotePage();


//获得远程web页面
function getRemotePage()
{
	$url = "http://erya.hang.im/";
	$filter="/\<script(.*)tajs\.qq\.com\/(.*)\<\/script\>/";
	$contents = file_get_contents($url); 
	$contents = preg_replace($filter,"",$contents);
	return $contents;

}
?>
