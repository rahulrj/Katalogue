<?php

class addProductController extends \BaseController {





	public function addProduct()
	{

    $data_from_json = json_decode(file_get_contents('php://input'),true);
   

    foreach ($data_from_json as $key => $list) {
    	$prod_rqst=new prodRqst;
    	$prod_rqst->client_name=$list['client_name'];
    	$prod_rqst->client_email=$list['client_email'];
    	$prod_rqst->client_org=$list['client_org'];
    	$prod_rqst->product_name=$list['product_name'];
    	$prod_rqst->save();



    }
       
   

     

	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}