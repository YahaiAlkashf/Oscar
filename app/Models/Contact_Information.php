<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact_Information extends Model
{
    protected $fillable=[
        'wathsApp_number',
        'phone_number',
        'email'
    ];
}
