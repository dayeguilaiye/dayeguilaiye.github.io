<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>


<?php 
$server_name="localhost:3306"; //数据库服务器名称 
$username="root"; // 连接数据库用户名 
$password="rootpass"; // 连接数据库密码 
$mysql_database="dbname"; // 数据库的名字 
// 连接到数据库 
$conn=mysql_connect($server_name, $username, $password); 
mysql_query("set names utf8");
// 从表中提取信息的sql语句 
$strsql="select val from tbwhere `key`='vmal'"; 
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
<title>Insert title here</title>
    <link rel="stylesheet" type="text/css" href="/css/full.css">
    <script type="text/javascript" src="/js/full.js"></script>
    <script src="/js/jquery.min.js"></script>
    <script src="/js/flexible.js"></script>
    <script type="text/javascript">
    var arr = new Array();
    var i = 0;
    var no=0;
    var all=0;
    var num = 0;
    function last(){
    	if(num==0)
    		alert("这是已经第一张");
    	else{
    		num--;
    		document.getElementById("pic").setAttribute('src',arr[num]);
    	}
    }
    function next(){
    	if(num==all-1)
    		alert("这已经是最后一张了");
    	else{
    		num++;
    		document.getElementById("pic").setAttribute('src',arr[num]);
    	}
    }
    function back(){
		var f= document.getElementById("f");
		var str="/browser/beauty";
		f.setAttribute('action',str);
		$('#f').submit();
    }
    </script>
</head>
<body>
<% 
String path = request.getContextPath(); 
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/"; 
String li = request.getParameter("li");//用request得到 
%>

	
	<sql:setDataSource var="snapshot" driver="com.mysql.jdbc.Driver"
	     url="jdbc:mysql://localhost/test"
	     user="root"  password="root"/>
	 
	<sql:query dataSource="${snapshot}" var="result">
	SELECT * from jbeauty WHERE list = <%=li %>;
	</sql:query>
	
	<form id="f" action="/beauty/beauty" method="post">
	<div id="container"></div>
	<input name="jump" type="submit" style="display:none;">
	</form>
	<button style="display:block;width:5rem;margin-left:auto;margin-right:auto;height:0.3rem;font-size:0.2rem" onclick="back()">返回</button>
<script type="text/javascript">
<c:forEach var="row" items="${result.rows}">
	arr[i]="<c:out value="${row.link}"/>"
	i++;
</c:forEach>
</script>

	<img id="pic" style="height:4.5rem; display:block;margin-left:auto;margin-right:auto;">
<div style="width:5rem;height:4rem;position:absolute;right:0;top:0.3rem;" onclick="next()"></div>
<div style="width:5rem;height:4rem;position:absolute;left:0;top:0.3rem;" onclick="last()"></div>
<script type="text/javascript">
	var pic = document.getElementById("pic");
	pic.setAttribute('src',arr[0]);
	all=arr.length;
</script>
</body>
</html>