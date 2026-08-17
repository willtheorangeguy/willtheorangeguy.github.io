<?php

error_reporting(0);
header('Content-Type: application/json; charset=utf-8');

require_once 'telemetry_db.php';

/**
 * @param int|float $d
 *
 * @return string
 */
function format($d)
{
    if ($d < 10) {
        return number_format($d, 2, '.', '');
    }
    if ($d < 100) {
        return number_format($d, 1, '.', '');
    }

    return number_format($d, 0, '.', '');
}

/**
 * @param array $speedtest
 *
 * @return array
 */
function formatSpeedtestData($speedtest)
{
    // format values for the image
    $speedtest['dl'] = format($speedtest['dl']);
    $speedtest['ul'] = format($speedtest['ul']);
    $speedtest['ping'] = format($speedtest['ping']);
    $speedtest['jitter'] = format($speedtest['jitter']);
    $speedtest['timestamp'] = $speedtest['timestamp'];

    $ispinfo = json_decode($speedtest['ispinfo'], true)['processedString'];
    $dash = strpos($ispinfo, '-');
    if ($dash !== false) {
        $ispinfo = substr($ispinfo, $dash + 2);
        $par = strrpos($ispinfo, '(');
        if ($par !== false) {
            $ispinfo = substr($ispinfo, 0, $par);
        }
    } else {
        $ispinfo = '';
    }

    $speedtest['ispinfo'] = $ispinfo;

    return $speedtest;
}

$speedtest = getSpeedtestUserById($_GET['id']);
if (!is_array($speedtest)) {
    echo '{}';
} else {
    $speedtest = formatSpeedtestData($speedtest);
    echo json_encode(array('timestamp'=>$speedtest['timestamp'],'download'=>$speedtest['dl'],'upload'=>$speedtest['ul'],'ping'=>$speedtest['ping'],'jitter'=>$speedtest['jitter'],'ispinfo'=>$speedtest['ispinfo']));
}
