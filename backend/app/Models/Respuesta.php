<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Respuesta extends Model
{
    protected $table = 'respuestas';

    protected $primaryKey = 'id';
    protected $autoIncrement = true;

    protected $fillable = [
        'id',
        'id_usuario',
        'id_reporte',
        'descripcion',
        'fecha_publi',
        'mostrar_tel',
        'mostrar_redes',
        'estado'
    ];
}
