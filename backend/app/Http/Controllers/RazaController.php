<?php

namespace App\Http\Controllers;

use App\Models\Raza;
use App\Models\Especie;
use Illuminate\Http\Request;

class RazaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $razas = Raza::all();
        return response($razas, 200)->header('Content-Type', 'application/json');
    }

    public function show ($id)
    {
        $raza = Raza::find($id);
        if (!$raza) {
            return response("Raza no Encontrada", 404)->header('Content-Type', 'application/json');
        } else {
            return response($raza, 200)->header('Content-Type', 'application/json');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $raza = new Raza;
        // Identificación de Campos
        $id_especie = $request->id_especie;
        $nombre = $request->nombre;
        $estado = $request->estado;

        // Validación
        # id_especie
        if (trim($id_especie) == "") {
            return response("Campo Especie Vacío", 400)->header('Content-Type', 'application/json');
        }

        if (!Especie::find($id_especie)) {
            return response("Especie no Encontrada", 404)->header('Content-Type', 'application/json');
        }
        
        # nombre
        if (trim($nombre) == "") {
            return response("Campo Nombre Vacío", 400)->header('Content-Type', 'application/json');
        } else {
            if (!preg_match("/[a-zA-Z ]+/", $nombre)) {
                return response("Campo Nombre solo debe contener letras", 400)->header('Content-Type', 'application/json');
            }
        }
        
        # estado
        if (trim($estado) == "") {
            return response("Campo Estado Vacío", 400)->header('Content-Type', 'application/json');
        }

        // Almacenar
        $raza->nombre = $nombre;
        $raza->estado = $estado;
        $raza->id_especie = $id_especie;
        $raza->timestamps = false;
        $raza->save();


        return response($raza, 200)->header('Content-Type', 'application/json');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Raza $raza)
    {
        // Identificación de Campos
        $id = $raza->id;
        $id_especie = $request->id_especie;
        $nombre = $request->nombre;
        $estado = $request->estado;

        // Validación
        # id
        if (!Raza::find($id)) {
            return response("Raza no Encontrada", 404)->header('Content-Type', 'application/json');
        }

        # id_especie
        if (trim($id_especie) == "") {
            return response("Campo Especie Vacío", 400)->header('Content-Type', 'application/json');
        }

        if (!Especie::find($id_especie)) {
            return response("Especie no Encontrada", 404)->header('Content-Type', 'application/json');
        }
        
        # nombre
        if (trim($nombre) == "") {
            return response("Campo Nombre Vacío", 400)->header('Content-Type', 'application/json');
        } else {
            if (!preg_match("/[a-zA-Z ]+/", $nombre)) {
                return response("Campo Nombre solo debe contener letras", 400)->header('Content-Type', 'application/json');
            }
        }
        
        # estado
        if (trim($estado) == "") {
            return "Campo Estado Vacío";
        }

        // Almacenar
        $raza->nombre = $nombre;
        $raza->estado = $estado;
        $raza->id_especie = $id_especie;

        $raza->timestamps = false;
        $raza->update();


        return response($raza, 200)->header('Content-Type', 'application/json');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        if (!Raza::find($id)) {
            return response("Raza no Encontrada", 404)->header('Content-Type', 'application/json');
        }
        $raza = Raza::find($id);
        if ($raza->delete()) {
            return response("Raza Eliminada", 200)->header('Content-Type', 'application/json');
        } else {
            return response("Error al eliminar Raza", 400)->header('Content-Type', 'application/json');
        } 
    }
}
