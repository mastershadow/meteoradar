<?php

function cGet($url) {
    $ch = curl_init(); 
    curl_setopt($ch, CURLOPT_URL, $url); 
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
    curl_setopt($ch, CURLOPT_VERBOSE, 0); 
    curl_setopt($ch, CURLOPT_HEADER, 0); 
    $output = curl_exec($ch); 
    curl_close($ch); 
    return $output;
}

$what = $_REQUEST['what'];

if ($what == 0) {
	header("Content-Type: application/json; charset=UTF-8");
	$o = cGet("https://www.arpae.it/sim/external/bollettino/radar_wp7.php");
	echo substr($o, 1, -1);
} else if ($what == 1) {
    header("Content-Type: application/json; charset=UTF-8");
    $o = cGet("http://www.centrometeolombardo.com/radar/get.php?source=v2&reload=".time());
    $o = substr($o, strpos($o, "top.rf_url = ") + strlen("top.rf_url = "));
    $o = substr($o, 0, strpos($o, "]") + 1);
    $o = str_replace("'", "\"", $o);
    echo $o;
}
