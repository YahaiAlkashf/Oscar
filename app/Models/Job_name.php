<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Job_name extends Model
{
    protected $fillable = [
        'jop_name',
        'jop_name_en'
    ];
    public function job_applications():HasMany{
        return $this->hasMany(Job_application::class);
    }
}
