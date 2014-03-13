<?php

/**
 * 
 * @author Dhiraj Bodicherla <dhiraj.bodicherla@knolskape.com>
 * 
 * @version $Id$
 * @copyright KNOLSKAPE Solutions PVT LTD
 * @since 18 July, 2012
 * @package default
 **/

/**
 * File description
 **/


require 'openid.php';
$response = array();
$openid_identifier = null;

if( isset($_POST['submit']) ){
	$openid_identifier = $_POST['openid_identifier'];
}

if( isset($_GET['openid_id']) ){
	$openid_identifier = $_GET['openid_id'];
}
try {
    # Change 'localhost' to your domain name.
    $openid = new LightOpenID($_SERVER['HTTP_HOST']);

    if(!$openid->mode) {
		if( isset($openid_identifier) ){
			$openid->identity = $openid_identifier;
			$openid->required = array('contact/email');
			$openid->optional = array('namePerson', 'namePerson/friendly');
			header('Location: ' . $openid->authUrl());
		}
	?>
	<form action="" method="post">
	    OpenID: <input type="text" name="openid_identifier" />
		<input type="submit" name="submit" value="submit" />
	</form>

	<?php
		
    } elseif($openid->mode == 'cancel') {
		$response['success'] = 0;
		$response['mode'] = $openid->mode;
		$response['identity'] = $openid;
        $response['details'] = 'User has cancelled authentication!';
		?>
		<script type="text/javascript">
			window.opener.KAPP.loginHandler(<?php echo json_encode($response);?>);
			window.close();
		</script>
		<?php
    } else {
        $response['success'] = 1;
		$response['mode'] = $openid->mode;
		$response['identity'] = $openid;
		$response['attributes'] = $openid->getAttributes();
		?>
		<script type="text/javascript">
			window.opener.KAPP.loginHandler(<?php echo json_encode($response);?>);
			window.close();
		</script>
		<?php
    }
	
} catch(ErrorException $e) {
	$response['success'] = 0;
	$response['details'] = $e->getMessage();
	?>
	<script type="text/javascript">
		window.opener.KAPP.loginHandler(<?php echo json_encode($response);?>);
		window.close();
	</script>
	<?php
}