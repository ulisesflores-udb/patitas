<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table = 'usuarios'; // Definir la tabla si el nombre no sigue la convención
    protected $primaryKey = 'id';  // Definir la clave primaria
    public $timestamps = false;    // Si no tienes timestamps, puedes deshabilitarlo

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

    /**
     * Relación con el modelo Distrito.
     * Un usuario pertenece a un distrito.
     */
    public function distrito()
    {
        return $this->belongsTo(Distrito::class, 'id_distrito');
    }

    /**
     * Relación con el modelo Municipio.
     * Un usuario tiene un municipio a través de su distrito.
     */
    public function municipio()
    {
        return $this->belongsTo(Municipio::class, 'id_distrito', 'id_municipio');
    }

    /**
     * Relación con el modelo Departamento.
     * Un usuario tiene un departamento a través de su municipio.
     */
    public function departamento()
    {
        return $this->belongsTo(Departamento::class, 'id_distrito', 'id_municipio', 'id_departamento');
    }
}
