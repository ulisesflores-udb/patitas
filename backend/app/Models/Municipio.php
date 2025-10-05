<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Municipio extends Model
{
    protected $table = 'municipios';
    
    protected $primaryKey = 'id';
    protected $autoIncrement = true;

    protected $fillable = [
        'id',
        'id_depto',
        'nombre',
        'estado'
    ];
}
