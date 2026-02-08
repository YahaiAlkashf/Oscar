<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Realstate_feature extends Model
{
    protected $fillable = [
        'feature',
        'feature_en',
        'real_state_id'
    ];
}
