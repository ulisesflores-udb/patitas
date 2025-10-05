<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MensajeChat extends Model
{
    protected $table = 'mensajes_chats';
    protected $primaryKey = 'id';
    protected $autoIncrement = true;
    public $timestamps = true;

    protected $fillable = [
        'id',
        'id_chat',
        'id_remitente',
        'mensaje',
        'enviado_en',
    ];
}
