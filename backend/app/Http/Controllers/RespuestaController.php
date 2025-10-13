<?php

namespace App\Http\Controllers;

use App\Models\Respuesta;
use Illuminate\Http\Request;

class RespuestaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getRespuestas($id) {
        $respuestas = Respuesta::where('id_perdida', $id)->get();
        return response()->json($respuestas);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($id, Request $request) {
        $request->validate([
            'contenido' => 'required|string|max:500',
            'id_usuario' => 'required|integer',
        ]);
        $contenido = $request->input('contenido');
        $id_usuario = $request->input('id_usuario');
        $respuesta = new Respuesta();
        $respuesta->contenido = $contenido;
        $respuesta->id_usuario = $id_usuario;
        $respuesta->id_perdida = $id;
        $respuesta->save();
        return response()->json(['message' => 'Respuesta creada exitosamente', 'respuesta' => $respuesta], 201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Respuesta $respuesta) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Respuesta $respuesta) {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Respuesta $respuesta) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Respuesta $respuesta) {
        //
    }
}
