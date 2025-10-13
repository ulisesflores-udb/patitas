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
        $respuestas = Respuesta::where('id_reporte', $id)->where('estado', 1)->get();
        return response()->json($respuestas);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {
        // $request->validate([
        //     'contenido' => 'required|string|max:500',
        //     'id_usuario' => 'required|integer',
        // ]);
        $id_usuario = $request->input('id_usuario');
        $id_reporte = $request->input('id_reporte');
        $descripcion = $request->input('descripcion');
        $fecha_public = now();
        $estado = 1;
        $mostrar_tel = $request->input('mostrar_tel');
        $mostrar_redes = $request->input('mostrar_redes');
        $respuesta = new Respuesta();
        $respuesta->id_usuario = $id_usuario;
        $respuesta->id_reporte = $id_reporte;
        $respuesta->descripcion = $descripcion;
        $respuesta->fecha_public = $fecha_public;
        $respuesta->estado = $estado;
        $respuesta->mostrar_tel = $mostrar_tel;
        $respuesta->mostrar_redes = $mostrar_redes;
        $respuesta->timestamps = false;
        $respuesta->save();
        return response()->json(['message' => 'Respuesta creada exitosamente', 'respuesta' => $respuesta], 200);
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
    public function edit($id) {
        $respuesta = Respuesta::find($id);
        if ($respuesta) {
            return response()->json($respuesta);
        } else {
            return response()->json(['message' => 'Respuesta no encontrada.'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id) {
        $id = $id;
        $descripcion = $request->input('descripcion');
        $mostrar_tel = $request->input('mostrar_tel');
        $mostrar_redes = $request->input('mostrar_redes');

        $respuesta = Respuesta::find($id);

        if (!$respuesta) {
            return response("Respuesta no Encontrada", 404)->header('Content-Type', 'application/json');
        }

        if (trim($descripcion) == "") {
            return response("Campo Descripción Vacío", 400)->header('Content-Type', 'application/json');
        }

        if (trim($mostrar_tel) == "") {
            return response("Campo Mostrar Teléfono Vacío", 400)->header('Content-Type', 'application/json');
        }

        if (trim($mostrar_redes) == "") {
            return response("Campo Mostrar Redes Sociales Vacío", 400)->header('Content-Type', 'application/json');
        }

        $respuesta->descripcion = $descripcion;
        $respuesta->mostrar_tel = $mostrar_tel;
        $respuesta->mostrar_redes = $mostrar_redes;
        $respuesta->timestamps = false;
        $respuesta->save();
        return response($respuesta, 200)->header('Content-Type', 'application/json');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) {
        $id = $id;

        if (!Respuesta::find($id)) {
            return response("Pérdida no Encontrada", 404)->header('Content-Type', 'application/json');
        }
        $respuesta = Respuesta::find($id);
        if ($respuesta->delete()) {
            return response("Respuesta Eliminada", 200)->header('Content-Type', 'application/json');
        } else {
            return response("Error al eliminar la Respuesta", 400)->header('Content-Type', 'application/json');
        }
    }
}
