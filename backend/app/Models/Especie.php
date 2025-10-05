<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Especie extends Model
{
    protected $table = 'especies';

    protected $primaryKey = 'id';
    protected $autoIncrement = true;

    protected $fillable = [
        'id',
        'nombre',
        'estado'
    ];
}
