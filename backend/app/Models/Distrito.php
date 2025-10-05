<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Distrito extends Model
{
    protected $table = 'distritos';

    protected $primaryKey = 'id';
    protected $autoIncrement = true;

    protected $fillable = [
        'id',
        'id_municipio',
        'nombre',
        'estado'
    ];
}
