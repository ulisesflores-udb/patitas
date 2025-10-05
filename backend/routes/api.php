<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\DepartamentoController;
use App\Http\Controllers\DistritoController;
use App\Http\Controllers\EspecieController;
use App\Http\Controllers\MensajeChatController;
use App\Http\Controllers\MunicipioController;
use App\Http\Controllers\PerdidaController;
use App\Http\Controllers\RazaController;
use App\Http\Controllers\RespuestaController;
use App\Http\Controllers\RolController;
use App\Http\Controllers\UsuarioController;

Route::resource('departamento', DepartamentoController::class);
Route::resource('municipio', MunicipioController::class);
Route::resource('distrito', DistritoController::class);
Route::resource('especie', EspecieController::class);
Route::resource('raza', RazaController::class);
Route::resource('rol', RolController::class);

// Grupos
/* 
    Usuario Sin Color
    - CRUD Perfil
    - CRUD Respuestas
    - CRUD Perdidas
    - CRUD Chats
    - Registro
    - Login

    Usuario Administrador (Con Color)
    - CRUD Usuarios
    - CRUD Chats
    - CRUD Mensajes
    - CRUD Perdidas
*/
Route::controller(UsuarioController::class)->group(function() {
    // Rutas para Usuario Sin Color
    // CRUD Perfil
    Route::get('/perfil', 'index');
    Route::post('/perfil', 'store');
    Route::put('/perfil/{id}', 'update');
    Route::delete('/perfil/{id}', 'destroy');
    

    // Rutas para Usuario Administrador
    Route::get('/usuarios', 'index');
    Route::post('/usuarios', 'store');
    Route::put('/usuarios/{id}', 'update');
    Route::delete('/usuarios/{id}', 'destroy'); 
});



Route::controller(PerdidaController::class)->group(function() {
    // Rutas para Usuario Sin Color
    Route::get('/usuario/perdidas/{id}', 'index');
    Route::post('/usuario/perdidas', 'store');
    Route::put('/usuario/perdidas/{id}', 'update');
    Route::delete('/usuario/perdidas/{id}', 'destroy');

    // Rutas para Usuario Administrador
    Route::get('/perdidas', 'index');
    Route::post('/perdidas', 'store');
    Route::put('/perdidas/{id}', 'update');
    Route::delete('/perdidas/{id}', 'destroy');
});

// Respuestas
Route::controller(RespuestaController::class)->group(function() {
    // Rutas para Usuario Sin Color
    Route::get('/usuario/respuestas/{id}', 'index');
    Route::post('/usuario/respuestas', 'store');
    Route::put('/usuario/respuestas/{id}', 'update');
    Route::delete('/usuario/respuestas/{id}', 'destroy');

    // Rutas para Usuario Administrador
    Route::get('/respuestas', 'index');
    Route::post('/respuestas', 'store');
    Route::put('/respuestas/{id}', 'update');
    Route::delete('/respuestas/{id}', 'destroy');
});

// Chats
Route::controller(ChatController::class)->group(function() {
    // Rutas para Usuario Sin Color
    Route::get('/usuario/chats/{id}', 'index');
    Route::post('/usuario/chats', 'store');
    Route::put('/usuario/chats/{id}', 'update');
    Route::delete('/usuario/chats/{id}', 'destroy');


    // Rutas para Usuario Administrador
    Route::get('/chats', 'index');
    Route::post('/chats', 'store');
    Route::put('/chats/{id}', 'update');
    Route::delete('/chats/{id}', 'destroy');
});







