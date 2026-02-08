<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image_Sell_Request extends Model
{
    protected $fillable = [
        'image',
        'property_sale_request_id'
    ];
}
