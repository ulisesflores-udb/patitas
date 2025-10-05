<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    protected $table = 'chats';

    protected $primaryKey = 'id';
    protected $autoIncrement = true;
    public $timestamps = true;

    protected $fillable = [
        'id',
        'id_usuario_1',
        'id_usuario_2',
        'creado_en',
    ];
}
