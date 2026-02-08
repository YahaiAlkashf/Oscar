<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Type extends Model
{
    protected $fillable=[
        'type',
        'type_en',
    ];
     public function real_states():HasMany{
        return $this->hasMany(Real_state::class);
    }
}
