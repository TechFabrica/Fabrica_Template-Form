<?php

$curl = curl_init();

$name = urlencode($_POST['name']);
$phone = $_POST['phone'];
$email = $_POST['email'];
$select1 = urlencode($_POST['select1']);
$select2 = urlencode($_POST['select2']);

curl_setopt_array($curl, [
  CURLOPT_URL => "",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "name={$name}&phone={$phone}&email={$email}&select1={$select1}&select2={$select2}",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/x-www-form-urlencoded"
  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;

} else {
  echo $response;

}
