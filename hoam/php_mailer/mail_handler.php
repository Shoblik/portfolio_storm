<?php
require_once('email_config.php');
require_once('phpmailer/PHPMailer/PHPMailerAutoload.php');

$mail = new PHPMailer();

// Configure SMTP
$mail->IsSMTP();

$mail->SMTPOptions = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);

$mail->SMTPDebug  = 0;          // verbose information
$mail->SMTPAuth = true;
$mail->SMTPSecure = "tls";
$mail->Host = "smtp.gmail.com";
$mail->Port = 587;
$mail->Encoding = '7bit';

// Auth
$mail->Username   = EMAIL_USER;
$mail->Password   = EMAIL_PASS;

// Check
$mail->Subject = "SMS activation pin";
$mail->Body = $rand;


$mail->AddAddress( $phoneNumber . "@tmomail.net" );
$mail->AddAddress( $phoneNumber . "@vtext.com" );
$mail->AddAddress( $phoneNumber . "@vmobl.com" );
$mail->AddAddress( $phoneNumber . "@sms.alltelwireless.com" );
$mail->AddAddress( $phoneNumber . "@txt.att.net" );
$mail->AddAddress( $phoneNumber . "@sms.myboostmobile.com" );
$mail->AddAddress( $phoneNumber . "@text.republicwireless.com" );
$mail->AddAddress( $phoneNumber . "@messaging.sprintpcs.com" );
$mail->AddAddress( $phoneNumber . "@email.uscc.net" );




$result = $mail->send();

if ($result) {
    $output['textSent'] = true;
} else {
    $output['textSent'] = false;
}



?>
