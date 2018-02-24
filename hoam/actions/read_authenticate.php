<?php
/**
 * Created by PhpStorm.
 * User: shobl
 * Date: 2/20/2018
 * Time: 4:49 PM
 */

if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}
$output['success'] = true;
$output['newUser'] = true;
$phoneNumber = $_POST['phoneNumber'];
$lat = $_POST['lat'];
$lng = $_POST['lng'];
$phoneNumber = '001' . $phoneNumber;

//query the database checking if the users phone number already exists
$query = "SELECT `phone`
          FROM `users`
          WHERE `phone` = $phoneNumber";
$result = mysqli_query($conn, $query);


if ($result) {
    if (mysqli_num_rows($result) > 0) {
        $output['newUser'] = false;
    } else {
        //get the users address
        $url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=".$lat.",".$lng."&sensor=true";
        $data = @file_get_contents($url);
        $jsonData = json_decode($data,true);
        if(is_array($jsonData) && $jsonData['status'] == "OK")
        {
            $formattedAddress = $jsonData['results'][0]['formatted_address'];
            $output['address'] = $formattedAddress;
        }
    }
} else {
    $output['errors'][] = 'Error in query';
}

if ($output['newUser']) {
    $rand = rand(0,9) . rand(0,9) . rand(0,9) . rand(0,9);
    $output['pin'] = $rand;
    require_once ('./php_mailer/mail_handler.php');

    //insert the users authentication into the auth table
    $query = "INSERT INTO `auth` (phone, pin)
              VALUES ('$phoneNumber', '$rand')";

    $res = mysqli_query($conn, $query);
    if ($res) {
        if (mysqli_affected_rows($conn) > 0) {
            $output['success'] = true;
        } else {
            $output['success'] = false;
        }
    } else {
        $output['errors'] = 'Error in query';
        $output['success'] = false;

    }
}
?>