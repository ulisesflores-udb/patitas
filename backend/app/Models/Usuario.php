<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table = 'usuarios';
    protected $primaryKey = 'id';
    protected $autoIncrement = true;

    protected $fillable = [
        'id',
        'id_rol',
        'nombre',
        'apellido',
        'genero',
        'correo',
        'pass',
        'foto',
        'id_distrito',
        'colonia',
        'calle',
        'red_social',
        'usuario_redes',
        'estado',
    ];

}
