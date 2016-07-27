<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<?php 
$server_name="localhost:83"; //数据库服务器名称 
$username="root"; // 连接数据库用户名 
$password="root"; // 连接数据库密码 
$mysql_database="test"; // 数据库的名字 
// 连接到数据库 
$conn=mysql_connect($server_name, $username, $password); 
mysql_query("set names utf8");
// 从表中提取信息的sql语句 
$strsql="SELECT * FROM Jbeauty WHERE id = 0;"; 
//执行sql查询 
//mysql_select_db($mysql_database,$conn);
//$result=mysql_query($sql);
$result=mysql_db_query($mysql_database, $strsql, $conn); 
// 获取查询结果 
// 定位到第一条记录 
mysql_data_seek($result, 0); 
// 循环取出记录 
while ($row=mysql_fetch_row($result)) 
{ 
for ($i=0; $i<mysql_num_fields($result); $i++ ) 
{ 
echo $row[$i]; 
}
} 
// 释放资源 
mysql_free_result($result); 
// 关闭连接 
mysql_close($conn);  
?> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>加载图片</title>
    <link rel="stylesheet" type="text/css" href="/css/full.css">
    <script type="text/javascript" src="/js/full.js"></script>
    <script src="/js/jquery.min.js"></script>
    <script src="/js/flexible.js"></script>
<script type="text/javascript">
	var blist = new Array();
	var i = 0;
	function test(k){
		var f= document.getElementById("f");
		var str="/browser/pic?li="+k;
		f.setAttribute('action',str);
		$('#f').submit();
	}
</script>
</head>
<body>
	<form id="f" action="/browser/pic" method="post">
	<div id="container"></div>
	<input name="jump" type="text" style="display:none;"></input>
	</form>
	<c:forEach items="${beauty }" var="b" varStatus="s">
		<script type="text/javascript">
			blist[i] = "${b.link}";
			i++;
		</script>
	</c:forEach>
	<script type="text/javascript">

		var dparent = document.getElementById("container");
		var num = 0;
		var str="asd";
		for (var j = 0; j < 15; j++) {
			var rad = parseInt(500*Math.random());
			var dcontent = document.createElement("div"); //创建节点
			dcontent.className = "box";//
			dparent.appendChild(dcontent);//添加根元素
			var boximg = document.createElement("div");//创建节点
			boximg.className = "box_img";//为节点添加类名
			dcontent.appendChild(boximg);//添加根元素
			var img = document.createElement("img");//创建节点
			img.src = blist[rad];//图片加载路径
			str="test("+rad+")";
			img.setAttribute('onclick',str);
			img.setAttribute('id',rad);
			boximg.appendChild(img);//添加根元素
			
			
		}
	</script>


</body>
</html>