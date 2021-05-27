<?php 
require_once("dbconfig.php");
//$_POST = JSON_DECODE(file_get_contents("php://input"),true);
//echo"post: $_POST";

$mbti = $_POST['mbti'];
$spend = $_POST['spend'];
$food = $_POST['food'];
$transport = $_POST['transport'];

//$mbti = isfp;
// $spend = 30;
// $food = 50;
// $transport = 30;

mysqli_query($con,"INSERT INTO `PayPtn` (`Idx`, `Mbti`, `Spnd`, `Transpt`, `Food`) 
VALUES (NULL, '".$mbti."', '".$spend."', '".$transport."', '".$food."');




mysqli_close($con);


?>
