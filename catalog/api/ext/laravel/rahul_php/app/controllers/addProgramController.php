<?php

class addProgramController extends \BaseController {


	public function addProgram()
	{
       
    $data_from_json = json_decode( file_get_contents('php://input'),true );

    //print_r($data_from_json);
    

    foreach ( $data_from_json as $key => $list ) {

    	$product_names=$list['product_names'];
    	$product_names_array=explode(",", $product_names);

    	

    	    foreach ($product_names_array as $key => $value) {

    			$rqstdPgm=new RqstdPgmInfo;
    			$rqstdPgm->program_name=$list['program_name'];
    			$rqstdPgm->product_name=$value;
    			$rqstdPgm->save();
  	    
    	    }


    	$pgmRqst=new pgmRqst;
    	$pgmRqst->client_name=$list['client_name'];
    	$pgmRqst->client_email=$list['client_email'];
    	$pgmRqst->client_org=$list['client_org'];
    	$pgmRqst->program_name=$list['program_name'];
    	$pgmRqst->rqst_date=$list['rqst_date'];
    	$pgmRqst->save();





    	
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