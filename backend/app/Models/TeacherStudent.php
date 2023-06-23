<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class TeacherStudent extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'url',
        'name',
        'age',
        'grade',
        'role', 
        'phone_no',
        'deleted_at'
    ];
}
