<?php

use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableInterface;

class programs extends Eloquent implements UserInterface, RemindableInterface {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'programs';
	public $timestamps=false;

	protected $primaryKey = 'program_id';


   public function product()
   {
       return $this->belongsToMany('products','program_products','program_id','product_id');
   }
   
   public function progRole()
   {
   	  return $this->belongsToMany('roles','role_program','program_id','role_id');
   }

    public function progTag()
   {
   	  return $this->belongsToMany('tags','program_tags','program_id','tag_id');
   }

   public function progClient()
   {
   	  return $this->belongsToMany('clientss','client_program','program_id','client_id');
   }

   public function progSkill()
   {
   	 return $this->belongsToMany('skillSet','skill_set_program','program_id','skill_set_id');
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