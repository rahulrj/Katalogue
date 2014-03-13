<?php
/**
 * 
 * @author Dhiraj Bodicherla <dhiraj.bodicherla@knolskape.com>
 * 
 * @version $Id$
 * @copyright KNOLSKAPE Solutions PVT LTD
 * @since 23 July, 2012
 * @package default
 **/

/**
 * This file authenticates the user using `Slim php`.
 * Both cookies and session are checked to authenticate the user.
 * Instructions : 
 * Login Page does not have a registration so far, so while entering a email row please enter the password like below
 * md5(social_login_method . c00k1e . pwd)
 **/

require_once('../../../../api/ext/Slim/Slim.php');
require_once('helpers.php');

header('Content-type: application/json');

session_cache_limiter(false);
session_start();

\Slim\Slim::registerAutoloader();

$login = new \Slim\Slim();

$login->post('/action', 'validateUser');
$login->delete('/check/:id', 'logoutUser');
$login->get('/check', 'checkUser');

$login->run();

function checkUser() {
	
    $con = Helpers::pdo_db_connect();
	$slimInstance = new \Slim\Slim();

	$cookie_check = $slimInstance->getEncryptedCookie(Helpers::$session_name);
	
	$response = array();
	
	if( !isset( $cookie_check ) || !isset( $_SESSION[Helpers::$session_name] ) || $cookie_check != $_SESSION[Helpers::$session_name]) {

		$slimInstance->deleteCookie(Helpers::$session_name);

		// Unset all of the session variables.
		$_SESSION = array();
		$params = session_get_cookie_params();

		setcookie(session_name(), '', time() - 42000,
	        $params["path"], $params["domain"],
	        $params["secure"], $params["httponly"]
	    );

		session_destroy();
		$response['success'] = 1;
		$response['state'] = 101; // no active session
		$response['detail'] = 'user is inactive. Please login again';
	} else {
		
		$cooke_value = explode("##", $cookie_check);
		
		$user_id = $cooke_value[0];
		$salt_check = $cooke_value[1];
		
		//check for user in database and change authkey
		$check_user_sql = "SELECT user_name_usr, random_key_usr,sol_usr_id, is_request_accepted_usr as is_accepted
		  					FROM user
							WHERE id_usr=:user_id";
		
		$sql_params = array();    
	    $sql_params['user_id'] = $user_id;
		
		$stmt      = Helpers::execute_query($con, $check_user_sql, $sql_params, 'user auth');
		
		$user_account = $stmt->fetchObject();
        $random_key = $user_account->random_key_usr;
		$social_method = $user_account->sol_usr_id;
		$salt = md5( $random_key . $social_method . 'c00k1e' );
		
		$response['success'] = 1;

		$row_count = $stmt->rowCount();
		
	    if ( $row_count == 1 ) {
			if( $user_account->is_accepted == 1 ) {
				$response['state'] = 100; // valid user
				$response['id'] = $user_id;
				$response['username'] = $user_account->user_name_usr;
			} else {
				$response['state'] = 102; // user is active, but not approved
				$response['message'] = 'Your request is pending for approval';
			}
		} else {
			$response['state'] = 103; // user does not exist
			logoutUser();
		}
		
	}

	echo json_encode($response);
}

function validateUser() {
	
    $instance   = \Slim\Slim::getInstance();
    $request    = $instance->request();
    $req_params = json_decode($request->getBody());
    
    $con = Helpers::pdo_db_connect();
    
    $response          = $req_params;
    $response->success = 0;
    
    $randomkey = rand(0, 1000) . rand(0, 1000);
    
    $sql_params = array();
    
    $email         = $req_params->email;
	$username      = $req_params->username;
    $social_method = $req_params->social_method;
    $social_id     = $req_params->social_id;
    $password  = $req_params->password;
    
    $ip_address = Helpers::get_ipaddress();
    $user_agent = Helpers::get_browser_info();

	$salt = $social_method . 'c00k1e'; // c zero zero k one e
   
    // check if user exists
    
    if ($req_params->social_method == 6) {
		
		$sql = "SELECT user_name_usr, password_usr, id_usr, is_request_accepted_usr as is_accepted
					FROM user 
					WHERE email_usr=:email
					AND sol_usr_id=6";

		$sql_params = array();    
	    $sql_params['email'] = $email;

	    $stmt      = Helpers::execute_query($con, $sql, $sql_params, 'user check');
	    $row_count = $stmt->rowCount();
		
	    if ($row_count == 1) {
	        $user_account = $stmt->fetchObject();
	        $id_usr       = $user_account->id_usr;
			$response->username = $user_account->user_name_usr;
	
			$cookie_code = $id_usr . '##' . $salt;

	        $second_check_md5 = md5($user_account->password_usr . $randomkey);
	        $user_input_md5   = md5(md5($salt. $password) . $randomkey);
	
	        if ($user_input_md5 === $second_check_md5) {
	            
				if( $user_account->is_accepted == 1) {
										
	            	$randomkey_sql = "UPDATE user
											SET random_key_usr=:randomkey, timestamp_usr=NOW(), cookie_code_usr=:cookie_code
											WHERE id_usr=:id_usr";

		            $sql_params              = array();
		            $sql_params['randomkey'] = $randomkey;
		            $sql_params['id_usr']    = $id_usr;
					$sql_params['cookie_code'] = $cookie_code;

		            $randomkey_stmt	= Helpers::execute_query($con, $randomkey_sql, $sql_params, 'randomkey normal');
		            $response->id = $id_usr;
		            $response->success = 1;
		            $response->error_code = 0;
					$instance->setEncryptedCookie(Helpers::$session_name, $cookie_code, '1 day');
				
					$_SESSION[Helpers::$session_name] = $cookie_code;
					
					//Update user activity here
					$user_activity = "INSERT INTO user_activity(usr_usa_id,browser_info_usa,ip_address_usa) 
										VALUES(:id_usr,:browser_info, :ipaddress)";
										
					$sql_params = array();
					$sql_params['id_usr'] = $id_usr;
					$sql_params['browser_info'] = Helpers::get_browser_info();
					$sql_params['ipaddress'] = Helpers::get_ipaddress();
					
					$_SESSION['user_id'] = $id_usr;

					$stmt = Helpers::execute_query($con, $user_activity, $sql_params, 'user activity update ');
					
				} else {
		            $response->success   = 1;
		            $response->error_code = 400;
		            $response->message   = "Your request is pending for approval";
				}

	        } else {
	            $response->error_code = 401;
	            $response->message    = "username/password combination failed";
	        }
	    } else {
	        $response->error_code = 402;
	        $response->message    = "User not registered";
	    }
	
		$response->password = "secret";
		$response->randomkey = "random";
		
	    echo json_encode($response);

    } else {

        $sql = "SELECT user_name_usr, password_usr, id_usr
				FROM user 
				WHERE sol_usr_id=:social_method
					AND social_id_usr=:social_id";

	    $sql_params['social_method'] = $social_method;
	    $sql_params['social_id']     = $social_id;

		$stmt      = Helpers::execute_query($con, $sql, $sql_params, 'select user for social');
	    $row_count = $stmt->rowCount();
	
		if ($row_count == 1) {
	        
			$user_account = $stmt->fetchObject();
	        $id_usr       = $user_account->id_usr;

			$cookie_code = $id_usr . '##' . $salt;
			
			
			$randomkey_sql = "UPDATE user
									SET random_key_usr=:randomkey, timestamp_usr=NOW()
									WHERE id_usr=:id_usr
										AND cookie_code_usr=:cookie_code";

            $sql_params              = array();
            $sql_params['randomkey'] = $randomkey;
            $sql_params['id_usr']    = $id_usr;
			$sql_params['cookie_code'] = $cookie_code;

            $randomkey_stmt      = Helpers::execute_query($con, $randomkey_sql, $sql_params, 'randomkey for social');
	            
			$response->id        = $user_account->id_usr;
            $response->success   = 1;
            $response->randomkey = $randomkey;
			$response->is_already_registered = true;

			$instance->setEncryptedCookie(Helpers::$session_name, $cookie_code, '1 day');
			
			$_SESSION['user_id'] = $user_account->id_usr;
			$_SESSION[Helpers::$session_name] = $cookie_code;
				
	    } else {
		
			//register the user
			
			$sql_params = array();
			
			$password = md5( $social_id . $social_method . 'c00k1e');
			
	        $user_register_sql = "INSERT INTO user(user_name_usr, social_id_usr, sol_usr_id, password_usr, email_usr, is_request_accepted_usr)
					VALUES(:username, :social_id, :social_method, :password, :email, 1)";
					
			$sql_params['username']	= $username;
			$sql_params['social_id'] = $social_id;
			$sql_params['social_method'] = $social_method;
			$sql_params['password'] = $password;
			$sql_params['email'] = $email;
			//$sql_params['cookie_code'] = $cookie_code;

			$user_register_stmt = Helpers::execute_query($con, $user_register_sql, $sql_params, 'insert new row');
			$id_usr = $con->lastInsertId();
			$cookie_code = $id_usr . '##' . $salt;
			
			$instance->setEncryptedCookie(Helpers::$session_name, $cookie_code, '1 day');
			
			$_SESSION[Helpers::$session_name] = $cookie_code;
			$_SESSION['user_id'] = $id_usr;

			$response->success   = 1;
			$response->id = $id_usr;
			$response->is_already_registered = false;
			//$response->message = "Your request is pending for approval";
	    }
		
		//Update user activity here
		$user_activity = "INSERT INTO user_activity(usr_usa_id,browser_info_usa,ip_address_usa) 
							VALUES(:id_usr,:browser_info, :ipaddress)";
							
		$sql_params = array();
		$sql_params['id_usr'] = $id_usr;
		$sql_params['browser_info'] = Helpers::get_browser_info();
		$sql_params['ipaddress'] = Helpers::get_ipaddress();
		
		$stmt = Helpers::execute_query($con, $user_activity, $sql_params, 'user activity update ');
		
	    echo json_encode($response);
    }
}

function logoutUser() {

	$instance = \Slim\Slim::getInstance();
	$instance->deleteCookie(Helpers::$session_name);

	$_SESSION['user_id'] = '';
	$_SESSION[Helpers::$session_name] = '';

	session_destroy();
	
	$response = array();
	$response['success'] = 1;

	echo json_encode($response);
}

?>
