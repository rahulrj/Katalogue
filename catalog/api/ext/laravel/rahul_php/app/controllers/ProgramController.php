<?php

class ProgramController extends \BaseController {



   public function getProgramInProduct()
   {

   $program_id=$_GET['program_id'];
   $products_in_program = programs::find($program_id)->product->toJson();
   		

   $array=json_decode($products_in_program,true);
   		print_r($array);
   }



   

  



    public function rolesAndSkills()
    {

       $skill_name=$_GET['skill_name'];
       $role_name=$_GET['role_name'];

       $skill_set_id = skillSet::where('skill_set_name', 'like', $skill_name)->first()->skill_set_id;
       $role_id = roles::where('role_name', 'like', $role_name)->first()->role_id;


       $program_id_skill=skillSet::find($skill_set_id)->skillProg->toJson();
       $program_id_role=roles::find($role_id)->roleProg->toJson();

       $product_id_skill=skillSet::find($skill_set_id)->skillProd->toJson();
       $product_id_role=roles::find($role_id)->roleProd->toJson();

       $program_id_role_array=json_decode($program_id_role,true);
       $program_id_skill_array=json_decode($program_id_skill,true);

       $product_id_role_array=json_decode($product_id_role,true);
       $product_id_skill_array=json_decode($product_id_skill,true);




       $mergedProgramArray=array_merge($program_id_role_array,$program_id_skill_array);
       $mergedProductArray=array_merge($product_id_role_array,$product_id_skill_array);




       foreach( $mergedProgramArray as $key => $lis) {
            foreach($lis as $ke => $value) {
                  if($ke == 'pivot'){
                        unset($mergedProgramArray[$key][$ke]);
                        $mergedProgramArray = array_values( $mergedProgramArray);
       }
      
    }
}

      foreach( $mergedProductArray as $key => $lis) {
            foreach($lis as $ke => $value) {
                  if($ke == 'pivot'){
                        unset($mergedProductArray[$key][$ke]);
                        $mergedProductArray = array_values($mergedProductArray);
       }
      
    }
}

 

       $uniqueProgramArray = array_map("unserialize", array_unique(array_map("serialize", $mergedProgramArray)));
       $uniqueProductArray = array_map("unserialize", array_unique(array_map("serialize", $mergedProductArray)));

       $productsInProgram=$this->showProductInProgram($uniqueProgramArray);
       $extraProducts=$this->extraProducts($uniqueProductArray);

      $output=array();
      array_push($output,$productsInProgram);
      array_push($output, $extraProducts);
      $result=json_encode($output);
      return $result;
      
    }




    public function searchOnSkills()
      {
//return "rahul";
        // $array=array("product_name"=>"new one","price"=>"2300","name"=>"rahul");
        // $result=json_encode($array);
        // return $result;


      $skill_name=$_GET['skill_name'];
      $skill_set_id = skillSet::where('skill_set_name', 'like', $skill_name)->first()->skill_set_id;
      
      $program_id=skillSet::find($skill_set_id)->skillProg->toJson();
      $product_id=skillSet::find($skill_set_id)->skillProd->toJson();
      $program_id_array=json_decode($program_id,true);
      $product_id_array=json_decode($product_id,true);


      $productsInProgram=$this->showProductInProgram($program_id_array);
      $extraProducts=$this->extraProducts($product_id_array);


      
      
      $output=array();
      array_push($output,$productsInProgram);
      array_push($output, $extraProducts);
      $result=json_encode($output);
      return $result;

      //print_r($product_id_array);

      
      

      
           
      }

      public function searchOnClients()
      {

      $client_name=$_GET['client_name'];
      $client_id = clientss::where('client_name', 'like', $client_name)->first()->client_id;
      
      $program_id=clientss::find($client_id)->clientProg->toJson();
      $product_id=clientss::find($client_id)->clientProd->toJson();
      $program_id_array=json_decode($program_id,true);
      $product_id_array=json_decode($product_id,true);

      $productsInProgram=$this->showProductInProgram($program_id_array);
      $extraProducts=$this->extraProducts($product_id_array);

      
      





      $output=array();
      array_push($output,$productsInProgram);
      array_push($output, $extraProducts);

      //return $output;
      $result=json_encode($output);
      return $result;

           
      }



      public function searchOnRoles()
      {


      $role_name=$_GET['role_name'];
      $role_id = roles::where('role_name', 'like', $role_name)->first()->role_id;

      

      
      $program_id=roles::find($role_id)->roleProg->toJson();
      $product_id=roles::find($role_id)->roleProd->toJson();
      $program_id_array=json_decode($program_id,true);
      $product_id_array=json_decode($product_id,true);



      
      $productsInProgram=$this->showProductInProgram($program_id_array);
      $extraProducts=$this->extraProducts($product_id_array);



       $output=array();
      array_push($output,$productsInProgram);
      array_push($output, $extraProducts);

      //return $output;
      $result=json_encode($output);
      return $result;


      }




public function showProductInProgram($program_id_array)
{

  $programDetails=array();
  
  $i=0;

	foreach ($program_id_array as $key => $listt)
              {
                //echo PHP_EOL;

              	$program_id=$listt['program_id'];
              	$program_name= $listt['program_name'];
                $price=$listt['price'];
                $acct_manager=$listt['acct_manager'];
              	$products_in_program = programs::find($program_id)->product->toJson();
              	$products_in_program_array=json_decode($products_in_program,true);

              	//echo "Program Name:".$program_name,PHP_EOL;

                $programDetails[$i]=array();

                $programDetails[$i]["program_name"]=$program_name;
                $programDetails[$i]["price"]=$price;
                $programDetails[$i]["acct_manager"]=$acct_manager;
  
                $products_array=array();
                
              	foreach ($products_in_program_array as $key => $listt)
                    {

                          	$product_name= $listt['product_name'];
                            array_push($products_array, $product_name);
              	            //echo $i." ".$product_name." ",PHP_EOL;
              	            //$i+=1;

              	      
                    }
                $product_name=implode(',', $products_array);
                $programDetails[$i]["products"]=$product_name;

                $roles=$this->showit($program_id,'program_id','progRole','programs','roles','role_name');
                $tags=$this->showit($program_id,'program_id','progTag','programs','tags','tag_name');
                $skills=$this->showit($program_id,'program_id','progSkill','programs','skill sets','skill_set_name');
                $clients=$this->showit($program_id,'program_id','progClient','programs','clientss','client_name');

                $programDetails[$i]["roles"]=$roles;  
                $programDetails[$i]["tags"]=$tags;  
                $programDetails[$i]["skills"]=$skills;  
                $programDetails[$i]['clients']=$clients;

                   $i+=1;




              }

           // $programDetails=json_encode($programDetails);
           return $programDetails;
           //echo $programDetails;

}



  


   public function extraProducts($product_id_array)
   {

         
           $extra_products=array();
           $i=0;

           foreach ($product_id_array as $key => $listt)
              {
                $product_id=$listt['product_id'];

                $extra_products[$i]=array();

                $extra_products[$i]['product_id']=$listt['product_id'];
                $extra_products[$i]['product_name']=$listt['product_name'];
                $extra_products[$i]['short_description']=$listt['short_description'];
                $extra_products[$i]['full_description']=$listt['full_description'];
                $extra_products[$i]['price']=$listt['price'];
                $extra_products[$i]['acct_manager']=$listt['acct_manager'];
                $extra_products[$i]['category']=$listt['category'];
                $extra_products[$i]['roles']=$this->showit($product_id,'product_id','prodRole','products','roles','role_name');
                $extra_products[$i]['tags']=$this->showit($product_id,'product_id','prodTag','products','tags','tag_name');
                $extra_products[$i]['skills']=$this->showit($product_id,'product_id','prodSkill','products','skill sets','skill_set_name');
                $extra_products[$i]['clients']=$this->showit($product_id,'product_id','prodClient','products','clientss','client_name');
                
                $i+=1;



             }

            
             return $extra_products;

             


   }



    public function showit($givenId,$idtype,$relationship,$table,$toShow,$column)
   {  
   	      echo PHP_EOL;
          

              	   // $id=$listt[$idtype];
                  $id=$givenId;
              		$rows=$table::find($id)->$relationship->toJson();
              		$rows_array=json_decode($rows,true);

              		//echo "The"." ".$toShow." " ."associated with  the"." ".$table." are:",PHP_EOL;

                  $arrayOfObj=array();

                    foreach ($rows_array as $key => $listt)
                     {

                          	$name= $listt[$column];
              	            array_push($arrayOfObj,$name);
                    }

                   $output=implode(',', $arrayOfObj);
                   return $output;


              


   }




   public function getAllPrograms()
   {

   	 $allPrograms=programs::all()->toArray();

   	 foreach ($allPrograms as $key => $list)
   	  {
           
            $program_id= $list['program_id'];

            $products_in_program = programs::find($program_id)->product->toJson();
            $program_roles = programs::find($program_id)->role->toJson();
            $program_tags=programs::find($program_id)->tag->toJson();


            $products_in_program_array=json_decode($products_in_program,true);
            $program_roles_array=json_decode($program_roles,true);

              foreach ( $products_in_program_array as $key => $listt)
              {
              	$product_name= $listt['product_name'];
              	echo $product_name." ";

              }

            print_r($program_roles_array);


            
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