<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Nette\Utils\Image;

class Project extends Model
{
    protected $fillable = [
        'name',
        'highest_price',
        'lowest_price',
        'largest_area',
        'smallest_area',
        'phone_number',
        'whatsApp_number',
        'email',
        'developer',
        'description',
        'image',
        'top',
        'Residential_Coastal',
        'delivery_date',
        'location_id',
        'category_id',
        'Payment',
        'name_en',
        'developer_en',
        'description_en',
    ];
    public function real_states():HasMany{
        return $this->hasMany(Real_state::class);
    }
    public function images():HasMany{
        return $this->hasMany(Image_Project::class);
    }
        public function category ():BelongsTo{
        return $this->belongsTo(Category::class);
    }
    public function location ():BelongsTo{
        return $this->belongsTo(Location::class);
    }

}
