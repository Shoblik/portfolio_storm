<?php
/**
 * Created by PhpStorm.
 * User: shobl
 * Date: 2/21/2018
 * Time: 4:38 PM
 */
$to = "7149483092@tmomail.net";
$from = "webportfoliomailer@gmail.com";
$message = "test";
$headers = "From: $from\n";
mail($to, '', $message, $headers);
?>