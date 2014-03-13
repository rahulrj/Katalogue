<?php

use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableInterface;

class skillSet extends Eloquent implements UserInterface, RemindableInterface {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'skill_sets';
	public $timestamps=false;

	protected $primaryKey = 'skill_set_id';


    public function skillProg()
     {
       return $this->belongsToMany('programs','skill_set_program','skill_set_id','program_id');
     }

     public function skillProd()
     {
       return $this->belongsToMany('products','skill_set_product','skill_set_id','product_id');
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

}