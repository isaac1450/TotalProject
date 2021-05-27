<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);


header("Content-Type:application/json");

$host = 'localhost';
$user = 'sac';
$pw = 'database';
$dbName = 'MBTIcard';
$con = new mysqli($host, $user, $pw, $dbName);
if($con){
	echo "접속";
}
else{
	echo"실패";
}



mysqli_set_charset($con,"utf8");
?>
