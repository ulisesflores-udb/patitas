<?php

namespace App\Http\Controllers;

use App\Models\Departamento;
use Illuminate\Http\Request;

class DepartamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $departamentos =  Departamento::all();
        return response($departamentos, 200)->header('Content-Type', 'application/json');
    }

    public function show ($id)
    {
        $departamento = Departamento::find($id);
        if (!$departamento) {
            return response("Departamento no Encontrado", 404)->header('Content-Type', 'application/json');
        } else {
            return response($departamento, 200)->header('Content-Type', 'application/json');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $departamento = new Departamento();

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

        $departamento->nombre = $nombre;
        $departamento->estado = $estado;

        $departamento->timestamps = false;
        $departamento->save();

        return response($departamento, 200)->header('Content-Type', 'application/json');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Departamento $departamento)
    {
        $id = $departamento->id;
        $nombre = $request->nombre;
        $estado = $request->estado;


        if (!Departamento::find($id)) {
            return response("Departamento no Encontrado", 404)->header('Content-Type', 'application/json');
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

        $departamento->nombre = $nombre;
        $departamento->estado = $estado;

        $departamento->timestamps = false;
        $departamento->update();

        return response($departamento, 200)->header('Content-Type', 'application/json');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        if (!Departamento::find($id)) {
            return response("Departamento no Encontrado", 404)->header('Content-Type', 'application/json');
        }

        $departamento = Departamento::find($id);
        if ($departamento->delete()) {
            return response("Departamento Eliminado", 200)->header('Content-Type', 'application/json');
        } else {
            return response("Error al Eliminar Departamento", 400)->header('Content-Type', 'application/json');
        }
    }
}
