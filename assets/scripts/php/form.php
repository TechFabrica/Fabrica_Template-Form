<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$select1 = $_POST['select1'];
$select2 = $_POST['select2'];

$host = ''; // add_data
$username = ''; // add_data
$password = ''; // add_data
$dbname = ''; // add_data
$date = date("d-m-Y H:i:s");

$conn = mysqli_connect($host, $username, $password, $dbname);

if (mysqli_connect_errno())
{
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
else{
    echo "Connection successful!";
}
// pesquisar como impedir SQL injection em envio de dados de formulário por PHP e alterar
$sql = "INSERT INTO `form` (`id`, `data`, `name`, `phone`, `email`, `select1`, `select2`) VALUES (NULL, '{$date}', '{$name}', '{$phone}', '{$email}', '{$select1}', '{$select1}');";
$rs = mysqli_query($conn, $sql);

if($rs){
    echo "Connection sucessful";
}

else{
    echo "Conecction failed";
    echo mysqli_error($conn);
}