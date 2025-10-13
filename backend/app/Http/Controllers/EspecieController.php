<?php

namespace App\Http\Controllers;

use App\Models\Especie;
use Illuminate\Http\Request;

class EspecieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $especies =  Especie::all();
        return response($especies, 200)->header('Content-Type', 'application/json');
    }

    public function show ($id)
    {
        $especie = Especie::find($id);
        if (!$especie) {
            return response("Especie no Encontrada", 404)->header('Content-Type', 'application/json');
        } else {
            return response($especie, 200)->header('Content-Type', 'application/json');
        }
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $especie = new Especie();

        $nombre = $request->nombre;
        $estado = $request->estado;

        if (trim($nombre) == "") {
            return response("Campo Nombre Vacío", 400)->header('Content-Type', 'application/json');
        } else {
            if (!preg_match("/[a-zA-Z ]+/", $nombre)) {
                return response("Campo Nombre solo debe contener letras", 400)->header('Content-Type', 'application/json');
            }
        }

        if (trim($estado) == "") {
            return response("Campo Estado Vacío", 400)->header('Content-Type', 'application/json');
        }

        $especie->nombre = $nombre;
        $especie->estado = $estado;

        $especie->timestamps = false;
        $especie->save();

        return response($especie, 200)->header('Content-Type', 'application/json');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Especie $especie)
    {
        
        $id = $especie->id;
        $nombre = $request->nombre;
        $estado = $request->estado;

        if (!Especie::find($id)) {
            return response("Especie no Encontrada", 404)->header('Content-Type', 'application/json');
        }

        if (trim($nombre) == "") {
            return response("Campo Nombre Vacío", 400)->header('Content-Type', 'application/json');
        } else {
            if (!preg_match("/[a-zA-Z ]+/", $nombre)) {
                return response("Campo Nombre solo debe contener letras", 400)->header('Content-Type', 'application/json');
            }
        }

        if (trim($estado) == "") {
            return response("Campo Estado Vacío", 400)->header('Content-Type', 'application/json');
        }

        $especie->nombre = $nombre;
        $especie->estado = $estado;
        $especie->timestamps = false;
        $especie->update();

        return response($especie, 200)->header('Content-Type', 'application/json');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        if (!Especie::find($id)) {
            return response("Especie no Encontrada", 404)->header('Content-Type', 'application/json');
        }
        $especie = Especie::find($id);
        if ($especie->delete()) {
            return response("Especie Eliminada", 200)->header('Content-Type', 'application/json');
        } else {
            return response("Error al eliminar Especie", 400)->header('Content-Type', 'application/json');
        }
    }
}
