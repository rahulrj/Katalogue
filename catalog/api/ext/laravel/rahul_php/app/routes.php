<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

/*Route::get('/', function()
{
	return View::make('hello');
});*/



Route::get('getProgramInProduct','ProgramController@getProgramInProduct');
Route::get('getAllPrograms','ProgramController@getAllPrograms');
Route::get('searchOnRoles','ProgramController@searchOnRoles');
Route::get('searchOnSkills','ProgramController@searchOnSkills');
Route::get('rolesAndSkills','ProgramController@rolesAndSkills');
Route::get('searchOnClients','ProgramController@searchOnClients');
Route::get('searchOnCategory','ProductController@searchByCategory');
Route::get('search','searchController@search');
Route::post('addProduct','addProductController@addProduct');
Route::post('addProgram','addProgramController@addProgram');



//Route::get('getAllProducts','ProductController@getAllProducts');
//Route::post('insertProduct','ProductController@insertProduct');
//Route::post('deleteProduct','ProductController@deleteProduct');

Route::get('/product',function()
{
	$products=new products;
	$products->product_id=12;
	$products->product_name="Its B2B";
	$products->logo_id=34;
	$products->short_description="Hello its B2B";
	$products->full_description="Helllo hello its its B2B B2B";
	$products->image_id=23;
	$products->price=23000;
	$products->acct_manager="Varuni";
	var_dump($products->save());


});



