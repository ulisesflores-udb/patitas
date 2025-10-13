<?php

namespace App\Http\Controllers;

use App\Models\Municipio;
use App\Models\Departamento;
use Illuminate\Http\Request;

class MunicipioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $municipios =  Municipio::all();
        return response($municipios, 200)->header('Content-Type', 'application/json');
    }

    public function show ($id)
    {
        $municipio = Municipio::find($id);
        if (!$municipio) {
            return response("Municipio no Encontrado", 404)->header('Content-Type', 'application/json');
        } else {
            return response($municipio, 200)->header('Content-Type', 'application/json');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $municipio = new Municipio();

        $nombre = $request->nombre;
        $estado = $request->estado;
        $id_departamento = $request->id_departamento;

        if (trim($nombre) == "") {
            return response("Campo Nombre Vacío", 400)->header('Content-Type', 'application/json');
        } else {
            if (!preg_match("Aa-Zz", $nombre)) {
                return response("Campo Nombre solo debe contener letras", 400)->header('Content-Type', 'application/json');
            }
        }

        if (trim($estado) == "") {
            return response("Campo Estado Vacío", 400)->header('Content-Type', 'application/json');
        }

        if (!Departamento::find($id_departamento)) {
            return response("Departamento no Encontrado", 404)->header('Content-Type', 'application/json');
        }

        $municipio->nombre = $nombre;
        $municipio->estado = $estado;
        $municipio->id_departamento = $id_departamento;

        $municipio->timestamps = false;
        $municipio->save();

        return response($municipio, 200)->header('Content-Type', 'application/json');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Municipio $municipio)
    {
        $id = $municipio->id;
        $nombre = $request->nombre;
        $estado = $request->estado;
        $id_departamento = $request->id_departamento;

        if (!Municipio::find($id)) {
            return response("Municipio no Encontrado", 404)->header('Content-Type', 'application/json');
        }

        if (trim($nombre) == "") {
            return response("Campo Nombre Vacío", 400)->header('Content-Type', 'application/json');
        } else {
            if (!preg_match("Aa-Zz", $nombre)) {
                return response("Campo Nombre solo debe contener letras", 400)->header('Content-Type', 'application/json');
            }
        }

        if (trim($estado) == "") {
            return response("Campo Estado Vacío", 400)->header('Content-Type', 'application/json');
        }

        if (!Departamento::find($id_departamento)) {
            return response("Departamento no Encontrado", 404)->header('Content-Type', 'application/json');
        }

        $municipio->nombre = $nombre;
        $municipio->estado = $estado;
        $municipio->id_departamento = $id_departamento;

        $municipio->timestamps = false;
        $municipio->update();

        return response($municipio, 200)->header('Content-Type', 'application/json');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        if (!Municipio::find($id)) {
            return response("Municipio no Encontrado", 404)->header('Content-Type', 'application/json');
        }
        $municipio = Municipio::find($id);
        if ($municipio->delete()) {
            return response("Municipio Eliminado", 200)->header('Content-Type', 'application/json');
        } else {
            return response("Error al eliminar Municipio", 400)->header('Content-Type', 'application/json');
        }
    }
}
