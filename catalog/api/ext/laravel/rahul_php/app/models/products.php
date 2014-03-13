<?php

use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableInterface;

class products extends Eloquent implements UserInterface, RemindableInterface {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'products';
	public $timestamps=false;

	protected $primaryKey='product_id';

   

    public function program()
    {

   	 return $this->belongsToMany('programs','program_products','product_id','program_id');
    }	
     

     public function prodRole()
    {

   	 return $this->belongsToMany('roles','role_product','product_id','role_id');
    } 

    public function prodTag()
    {

   	 return $this->belongsToMany('tags','product_tags','product_id','tag_id');
    } 
    public function prodSkill()
    {

   	 return $this->belongsToMany('skillSet','skill_set_product','product_id','skill_set_id');
    } 
    public function prodCat()
    {

   	 return $this->belongsTo('category');
    } 
    public function prodClient()
    {

   	 return $this->belongsToMany('clientss','client_products','product_id','client_id');
    }


	/**
	 * Get the unique identifier for the user.
	 *
	 * @return mixed
	 */
	public function getAuthIdentifier()
	{
		return $this->getKey();
	}

	/**
	 * Get the password for the user.
	 *
	 * @return string
	 */
	public function getAuthPassword()
	{
		return $this->password;
	}

	/**
	 * Get the e-mail address where password reminders are sent.
	 *
	 * @return string
	 */
	public function getReminderEmail()
	{
		return $this->email;
	}


	public function getAllProducts()
	{

	}

}