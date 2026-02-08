<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Real_state extends Model
{
    protected $fillable=[
        'name',
        'rooms',
        'bathrooms',
        'price',
        'area',
        'rent_or_sale',
        'phone_number',
        'whatsapp_number',
        'category_id',
        'location_id',
        'type_id',
        'image',
        'immediate_delivery',
        'feature_id',
        'view',
        'finishing_type',
        'unit_code',
        'email',
        'description',
        'broker_name',
        'top',
        'Residential_Coastal',
        'delivery_date',
        'project_id',
        'name_en',
        'view_en',
        'finishing_type_en',
        'description_en',
        'description_en',
        'broker_name_en'
    ];
    public function images():HasMany {
        return $this->hasMany(Image_real_state::class);
    }
    public function category ():BelongsTo{
        return $this->belongsTo(Category::class);
    }
    public function location ():BelongsTo{
        return $this->belongsTo(Location::class);
    }
    public function type ():BelongsTo{
        return $this->belongsTo(Type::class);
    }
    public function features():HasMany{
            return $this->hasMany(Realstate_feature::class);
    }
    public function project():BelongsTo{
        return $this->belongsTo(Project::class);
    }
}
