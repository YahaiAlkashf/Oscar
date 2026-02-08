<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Job_application extends Model
{
    protected $fillable = [
        'name',
        'phone_number',
        'CV',
        'job_name_id',
    ];
    public function job_name ():BelongsTo{
        return $this->belongsTo(Job_name::class,'job_name_id');
    }

}
