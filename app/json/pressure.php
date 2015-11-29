<?php

$json = file_get_contents('http://141.84.221.189:4567/sensors');
$obj = json_decode($json);
echo json_encode($obj);