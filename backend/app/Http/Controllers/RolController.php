<?php

namespace App\Http\Controllers;

use App\Models\Rol;
use Illuminate\Http\Request;

class RolController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $roles = Rol::all();
        return response()->json($roles);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $nombre = $request->input('nombre');
        $descripcion = $request->input('descripcion');
        $estado = $request->input('estado');
        $rol = new Rol();
        $rol->nombre = $nombre;
        $rol->descripcion = $descripcion;
        $rol->estado = $estado;
        $rol->timestamps = false;
        $rol->save();
        return response()->json(['message' => 'Rol creado exitosamente', 'rol' => $rol], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Rol $rol)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id) {
        $rol = Rol::find($id);
        if ($rol) {
            return response()->json($rol);
        } else {
            return response()->json(['message' => 'Rol no encontrado.'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id) {
        $nombre = $request->input('nombre');
        $descripcion = $request->input('descripcion');
        $estado = $request->input('estado');
        $rol = Rol::find($id);
        if (!$rol) {
            return response()->json(['message' => 'Rol no encontrado.'], 404);
        }
        $rol->nombre = $nombre;
        $rol->descripcion = $descripcion;
        $rol->estado = $estado;
        $rol->timestamps = false;
        $rol->save();
        return response()->json(['message' => 'Rol actualizado exitosamente', 'rol' => $rol], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) {
        $rol = Rol::find($id);
        if (!$rol) {
            return response()->json(['message' => 'Rol no encontrado.'], 404);
        }
        $rol->delete();
        return response()->json(['message' => 'Rol eliminado exitosamente'], 200);
    }
}
