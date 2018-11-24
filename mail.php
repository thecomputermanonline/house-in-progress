<?php


require 'phpmailer/PHPMailerAutoload.php';


if(isset($_POST['email'])) {
	
	// EDIT THE 2 LINES BELOW AS REQUIRED
	$email_to = "housemaster@housemaster.mu";
	$email_subject = "New e-mail subscriber";
	
	
	function died($error) {
		// your error code can go here
		echo "We are very sorry, but there were error(s) found with the form your submitted. ";
		echo "These errors appear below.<br /><br />";
		echo $error."<br /><br />";
		echo "Please go back and fix these errors.<br /><br />";
		die();
	}
	
	// validation expected data exists
	if
		(!isset($_POST['email'])) {
		died('We are sorry, but there appears to be a problem with the email your submitted.');		
	}
	
	
	$email_from = $_POST['email']; // required
	$email_name = $_POST['name']; // required
	$email_msg = $_POST['message']; // required
	
	
	
	$error_message = "";
	$email_exp = "^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$";
  if(!eregi($email_exp,$email_from)) {
  	$error_message .= 'The Email Address you entered does not appear to be valid.<br />';
  }
	
  if(strlen($error_message) > 0) {
  	died($error_message);
  }
	$email_message = "Form details below.\n\n";
	
	function clean_string($string) {
	  $bad = array("content-type","bcc:","to:","cc:","href");
	  return str_replace($bad,"",$string);
	}
	
	
	$email_message .= "Email: ".clean_string($email_from)."\n";
	$email_message .= "Name : ".clean_string($email_name)."\n";
	$email_message .= "Message: ".clean_string($email_msg)."\n";

	
// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
//@mail($email_to, $email_subject, $email_message, $headers);  

$mail = new PHPMailer;
vardump( $mail); exit;
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->Port = 587;
$mail->SMTPSecure = 'tls';
$mail->SMTPAuth = true;
$mail->Username = 'olalekanarowoselu@gmail.com';
$mail->Password = 'mur=231414';
$mail->addAddress($email_to);
$mail->Subject = $email_subject;
$mail->msgHTML($email_message);
if (!$mail->send()) {

	
		$error = "Mailer Error: " . $mail->ErrorInfo;
		echo '<p id="para">'.$error.'</p>';
		}
		else {
		echo '<p id="para">Message sent!</p>';
		}
		}
		else{
		echo '<p id="para">Please enter valid data</p>';
		}
	}

?>

<!-- include your own success html here -->
<center><h3><br><br>
Thank you for contacting us. <br><br><br> We will be in touch with you As soon as posible.
</h3></center>
<?
}
?>
 