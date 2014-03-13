<div id="loginContainer" class="container-fluid login-container">
	<div class="row-fluid">
		<div class="span6 hidden-phone hidden-tablet">
			<div class="instructions">
				<div class="title lead">
					Project Name
				</div>
			</div>
      <!--Sidebar content-->
    	</div>
    	<div class="span5">
    		<form method="GET" id='login_form' class="login-form">
				<div class="control-group">
					<input type="text" class="login-field" value="" placeholder="Enter your name" id="emailInput" />
					<label class="login-field-icon fui-user" for="login-name"></label>
				</div>

				<div class="control-group">
					<input type="password" class="login-field" value="" placeholder="Password" id="passwordInput" />
					<label class="login-field-icon fui-lock" for="login-pass"></label>
				</div>

				<button id='login_form_btn' class="btn btn-primary btn-large btn-block" href="#">Login</button>
				<a class="login-link" href="#">Lost your password?</a>
				<div id="loginErrorContainer" class="loginErrorContainer alert alert-error kapp-cqt-hide">
					Error !!!
				</div>
			</form>
			<div id="social_login_container" class='social-login-container'>
			</div>
    	</div>
  	</div>	
</div>