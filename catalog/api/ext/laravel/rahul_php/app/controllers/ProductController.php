<?php


class ProductController extends BaseController
{

   public function getIndex()
   {
   	  echo "index";
   }


   public function getTest()
   {
   	  echo "test";
   }


   public function searchByCategory()
   {

    $category=$_GET['category'];
    $product_rows= category::where('category', 'like', $category)->get()->toArray();

    $this->displayProductDetails($product_rows);
    $this->callOtherCategories($category);

    
   }


   public function callOtherCategories($category)
   {

   	$product_categories=array('simulation','animation','case study','elearning');
    foreach ($product_categories as $key => $value) {
    	if($category!=$value){

    		echo $value,PHP_EOL;

    		$product_rows= category::where('category', 'like', $value)->get()->toArray();
    		$this->displayProductDetails($product_rows);


    	}
    	
    }

    



   }


   public function displayProductDetails($product_rows)
   {

   	foreach ($product_rows as $key => $list) {

    	      $product_id=$list['product_id'];
              $product_first_row=products::where('product_id','like',$product_id)->first();

              $product_name=$product_first_row->product_name;
              $short_desc=$product_first_row->short_description;
              $full_desc=$product_first_row->full_description;
              $price=$product_first_row->price;
              $acct_manager=$product_first_row->acct_manager;
              

              echo PHP_EOL;


              echo "Product Name:"."  ".$product_name,PHP_EOL,"Short desc:"." ".$short_desc,PHP_EOL,"Long desc:"." ".$full_desc,PHP_EOL,"Acct Manager:"." ".$acct_manager;
              $this->showIt($product_id,'prodRole','products','roles','role_name');
              $this->showIt($product_id,'prodSkill','products','skills','skill_set_name');
              $this->showIt($product_id,'prodTag','products','tags','tag_name');



    	
    }


   }
   



   

   public function showIt($givenId,$relationship,$table,$toShow,$column)
   {  
   	      echo PHP_EOL;
          

              	   // $id=$listt[$idtype];
                  $id=$givenId;
              		$rows=$table::find($id)->$relationship->toJson();
              		$rows_array=json_decode($rows,true);

              		echo "The"." ".$toShow." " ."associated with  the"." ".$table." are:",PHP_EOL;

                    foreach ($rows_array as $key => $listt)
                     {

                          	$name= $listt[$column];
              	            echo $name." ";

                    }


              


   }

}



?>