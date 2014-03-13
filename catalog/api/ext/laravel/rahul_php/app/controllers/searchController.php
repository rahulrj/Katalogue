<?php
include ("ProgramController.php");
include ("ProductController.php");

class searchController extends \BaseController {



	public function search()
  {

      $search_param=$_GET['search_param'];
      
    
      $tables=array('roles','skillSet','tags','category','products','programs');
      $table_column=array('role_name','skill_set_name','tag_name','category','product_name','program_name');
      $table_ids=array('role_id','skill_set_id','tag_id','','product_id','program_id');
      $relation_name_prog=array('roleProg','skillProg','tagProg');
      $relation_name_prod=array('roleProd','skillProd','tagProd');

      $program_array_final=array();
      $product_array_final=array();

      for($i=0;$i<sizeof($tables);$i++)
      {
          $all_rows= $tables[$i]::where($table_column[$i], 'like', '%'.$search_param.'%')->get()->toArray();
            if($i==3 && sizeof($all_rows)>0)
              {
             
             //print_r($all_rows);
                  $prodController = new ProductController();
                  $prodController ->displayProductDetails($all_rows);
              }
         
            else if(($i==sizeof($tables)-1 || $i==sizeof($tables)-2 ) && !empty($all_rows))
              { 
                /*print_r($all_rows);
                if(empty($all_rows))
                  echo "yes";*/

                //echo $i."i value";

                 foreach ($all_rows as $key => $list) {
            
                  $id=$list[$table_ids[$i]];

                  //print_r($id);
            

                  $program_id=$tables[$i]::find($id)->toJson();
                  $product_id=$tables[$i]::find($id)->toJson();

              
                  $program_id_array=json_decode($program_id,true);
                  $product_id_array=json_decode($product_id,true);

                  $program_array_final=array_merge($program_array_final,$program_id_array);
                  $product_array_final=array_merge($product_array_final,$product_id_array);


                
                    }  

                  $uniqueProgramArray = array_map("unserialize", array_unique(array_map("serialize", $program_array_final)));
                  $uniqueProductArray = array_map("unserialize", array_unique(array_map("serialize", $product_array_final)));

                  print_r($uniqueProgramArray);
                  print_r($uniqueProductArray);

                 /* $progController = new ProgramController();
                  if(!empty($uniqueProgramArray))
                  $progController ->showProductInProgram($uniqueProgramArray);
                  if(!empty($uniqueProductArray))
                  $progController->extraProducts($uniqueProductArray);*/



              }

          else
        {
        
         if(!empty($all_rows))
         {

         // print_r($all_rows);
          
          foreach ($all_rows as $key => $list) {
            
                $id=$list[$table_ids[$i]];
            

                $program_id=$tables[$i]::find($id)->$relation_name_prog[$i]->toJson();
                $product_id=$tables[$i]::find($id)->$relation_name_prod[$i]->toJson();

              
                $program_id_array=json_decode($program_id,true);
                $product_id_array=json_decode($product_id,true);

                $program_array_final=array_merge($program_array_final,$program_id_array);
                $product_array_final=array_merge($product_array_final,$product_id_array);


                
          }




                foreach( $program_array_final as $key => $lis) {
                        foreach($lis as $ke => $value) {
                               if($ke == 'pivot'){
                                    unset($program_array_final[$key][$ke]);
                                    $program_array_final = array_values( $program_array_final);
       }
      
    }
}

                foreach( $product_array_final as $key => $lis) {
                        foreach($lis as $ke => $value) {
                                if($ke == 'pivot'){
                                    unset($product_array_final[$key][$ke]);
                                    $product_array_final = array_values($product_array_final);
       }
      
    }
}

              $uniqueProgramArray = array_map("unserialize", array_unique(array_map("serialize", $program_array_final)));
              $uniqueProductArray = array_map("unserialize", array_unique(array_map("serialize", $product_array_final)));



              
          

         }

      


          }

     


  }

  
              $progController = new ProgramController();
              if(!empty($uniqueProgramArray))
             $productsInProgram= $progController ->showProductInProgram($uniqueProgramArray);
              if(!empty($uniqueProductArray))
             $extraProducts= $progController->extraProducts($uniqueProductArray);

             $output=array();
             array_push($output,$productsInProgram);
             array_push($output, $extraProducts);
             $result=json_encode($output);
             return $result;

        





}
public function getIndex()
   {
   	  echo "index";
   }


   public function getTest()
   {
   	  echo "test";
   }

}

?>