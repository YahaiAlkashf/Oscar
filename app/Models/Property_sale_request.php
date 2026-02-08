<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Nette\Utils\Image;

class Property_sale_request extends Model
{
    protected $fillable = [
        'name',
        'phone_number',
    ];
    public function images():HasMany{
        return $this->hasMany(Image_Sell_Request::class);
    }

}
