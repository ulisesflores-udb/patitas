<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Perdida extends Model
{
    protected $table = 'perdidas';

    protected $primaryKey = 'id';
    protected $autoIncrement = true;

    protected $fillable = [
        'id',
        'id_usuario',
        'nombre_mascota',
        'descripcion',
        'foto',
        'fecha_publi',
        'fecha_perdida',
        'id_raza',
        'latitud',
        'longitud',
        'radio',
        'direccion_maps',
        'punto_referencia',
        'mostrar_tel',
        'mostrar_redes',
        'estado',
    ];
}
