<?php

use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableInterface;

class clientss extends Eloquent {

	protected $table = 'clients';
	public $timestamps=false;

	protected $primaryKey='client_id';

	public function clientProg()
     {
       return $this->belongsToMany('programs','client_program','client_id','program_id');
     }

     public function clientProd()
     {
       return $this->belongsToMany('products','client_products','client_id','product_id');
     }



}






?>