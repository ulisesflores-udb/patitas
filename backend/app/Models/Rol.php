<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    protected $table = 'roles';

    protected $primaryKey = 'id';
    protected $autoIncrement = true;

    protected $fillable = [
        'id',
        'nombre',
        'descripcion',
        'estado'
    ];
}
