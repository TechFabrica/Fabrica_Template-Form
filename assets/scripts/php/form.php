<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1

$json = file_get_contents('php://input');
$data = json_decode($json);

$name = $data->name;
$phone = $data->phone;
$email = $data->email;
$select1 = $data->select1;
$select2 = $data->select;

$host = 'teste_fabrica.mysql.dbaas.com.br'; // !add_data
$username = 'teste_fabrica'; // !add_data
$password = 'AT961#kl9Nsx'; // !add_data
$dbname = 'teste_fabrica'; // !add_data
$date = date("d-m-Y H:i:s");

$conn = mysqli_connect($host, $username, $password, $dbname);

if (mysqli_connect_error()){
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
} else {
    echo "Connection successful!";
}

// pesquisar como impedir SQL injection em envio de dados de formulário por PHP e alterar
$sql = "INSERT INTO `teste_fabrica_script_form` (`id`, `date`, `name`, `phone`, `email`, `select1`, `select2`) VALUES (NULL, '{$date}', '{$name}', '{$phone}', '{$email}', '{$select1}', '{$select1}');";
$rs = mysqli_query($conn, $sql);

// if($rs){
//     echo "Connection sucessful";
// } else {
//     echo "Conecction failed";
//     echo mysqli_error($conn);
// }