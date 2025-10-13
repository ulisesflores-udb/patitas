<?php

namespace App\Http\Controllers;

use App\Models\Distrito;
use App\Models\Municipio;
use Illuminate\Http\Request;

class DistritoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $distritos =  Distrito::all();
        return response($distritos, 200)->header('Content-Type', 'application/json');
    }

    public function show ($id)
    {
        $distrito = Distrito::find($id);
        if (!$distrito) {
            return response("Distrito no Encontrado", 404)->header('Content-Type', 'application/json');
        } else {
            return response($distrito, 200)->header('Content-Type', 'application/json');
        }
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $distrito = new Distrito();

        $nombre = $request->nombre;
        $estado = $request->estado;
        $id_municipio = $request->id_municipio;

        if ($nombre.trim() == "") {
            return response("Campo Nombre Vacío", 400)->header('Content-Type', 'application/json');
        } else {
            if (!preg_match("/[a-zA-Z ]+/", $nombre)) {
                return response("Campo Nombre solo debe contener letras", 400)->header('Content-Type', 'application/json');
            }
        }

        if (trim($estado) == "") {
            return response("Campo Estado Vacío", 400)->header('Content-Type', 'application/json');
        }

        if (!Municipio::find($id_municipio)) {
            return response("Municipio no Encontrado", 400)->header('Content-Type', 'application/json');
        }

        $distrito->nombre = $nombre;
        $distrito->estado = $estado;
        $distrito->id_municipio = $id_municipio;

        $distrito->timestamps = false;
        $distrito->save();

        return response($distrito, 200)->header('Content-Type', 'application/json');
    
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Distrito $distrito)
    {
        
        $id = $distrito->id;
        $nombre = $request->nombre;
        $estado = $request->estado;
        $id_municipio = $request->id_municipio;

        if (!Distrito::find($id)) {
            return response("Distrito no Encontrado", 404)->header('Content-Type', 'application/json');
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

        if (!Municipio::find($id_municipio)) {
            return response("Municipio no Encontrado", 400)->header('Content-Type', 'application/json');
        }

        $distrito->nombre = $nombre;
        $distrito->estado = $estado;
        $distrito->id_municipio = $id_municipio;

        $distrito->timestamps = false;
        $distrito->update();

        return response($distrito, 200)->header('Content-Type', 'application/json');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        if (!Distrito::find($id)) {
            return response("Distrito no Encontrado", 404)->header('Content-Type', 'application/json');
        }
        $distrito = Distrito::find($id);
        if ($distrito->delete()) {
            return response("Distrito Eliminado", 200)->header('Content-Type', 'application/json');
        } else {
            return response("Error al Eliminar Distrito", 500)->header('Content-Type', 'application/json');
        }

    }
}
