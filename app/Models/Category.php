<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $fillable=[
        'category',
        'category_en'
    ];
    public function real_states():HasMany{
        return $this->hasMany(Real_state::class);
    }
    public function projects():HasMany{
        return $this->hasMany(Project::class);
    }
}
