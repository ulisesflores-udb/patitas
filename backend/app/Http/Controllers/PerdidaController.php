<?php

namespace App\Http\Controllers;

use App\Models\Perdida;
use App\Models\Raza;
use Illuminate\Http\Request;

class PerdidaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $perdidas =  Perdida::all();
        return response($perdidas, 200)->header('Content-Type', 'application/json');
    }

    public function show ($id)
    {
        $perdida = Perdida::find($id);
        if (!$perdida) {
            return response("Pérdida no Encontrada", 404)->header('Content-Type', 'application/json');
        } else {
            return response($perdida, 200)->header('Content-Type', 'application/json');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $perdida = new Perdida();

        $id_usuario = $request->id_usuario;
        $nombre_mascota = $request->nombre_mascota;
        $descripcion = $request->descripcion;
        $foto = $request->foto;
        $fecha_publi = $request->fecha_publi;
        $fecha_perdida = $request->fecha_perdida;
        $id_raza = $request->id_raza;
        $latitud = $request->latitud;
        $longitud = $request->longitud;
        $radio = $request->radio;
        $direccion_maps = $request->direccion_maps;
        $punto_referencia = $request->punto_referencia;
        $mostrar_tel = $request->mostrar_tel;
        $mostrar_redes = $request->mostrar_redes;
        $estado = $request->estado;

        // Validaciones
        # Nombre de Mascota
        if (trim($nombre_mascota) == "") {
            return response("Campo Nombre de Mascota Vacío", 400)->header('Content-Type', 'application/json');
        }

        if (!preg_match("/[a-zA-Z ]+/", $nombre_mascota)) {
            return response("Campo Nombre de Mascota solo debe contener letras", 400)->header('Content-Type', 'application/json');
        }

        # Descripción
        if (trim($descripcion) == "") {
            return response("Campo Descripción Vacío", 400)->header('Content-Type', 'application/json');
        }

        # Foto
        if (trim($foto) == "") {
            return response("Campo Foto Vacío", 400)->header('Content-Type', 'application/json');
        }

        # Fecha de Publicación
        if (trim($fecha_publi) == "") {
            return response("Campo Fecha de Publicación Vacío", 400)->header('Content-Type', 'application/json');
        }

        # Fecha de Pérdida
        if (trim($fecha_perdida) == "") {
            return response("Campo Fecha de Pérdida Vacío", 400)->header('Content-Type', 'application/json');
        }

        # Raza
        if (trim($id_raza) == "") {
            return response("Campo Raza Vacío", 400)->header('Content-Type', 'application/json');
        }

        if (!Raza::find($id_raza)) {
            return response("Raza no Encontrada", 404)->header('Content-Type', 'application/json');
        }

        # Latitud
        if (trim($latitud) == "") {
            return response("Campo Latitud Vacío", 400)->header('Content-Type', 'application/json');
        }

        # Longitud
        if (trim($longitud) == "") {
            return response("Campo Longitud Vacío", 400)->header('Content-Type', 'application/json');
        }

        # Radio
        if (trim($radio) == "") {
            return response("Campo Radio Vacío", 400)->header('Content-Type', 'application/json');
        }

        # Dirección en Maps
        if (trim($direccion_maps) == "") {
            return response("Campo Dirección en Maps Vacío", 400)->header('Content-Type', 'application/json');
        }

        # Estado
        if (trim($estado) == "") {
            return response("Campo Estado Vacío", 400)->header('Content-Type', 'application/json');
        }

        $perdida->id_usuario = $id_usuario;
        $perdida->nombre_mascota = $nombre_mascota;
        $perdida->descripcion = $descripcion;
        $perdida->foto = $foto;
        $perdida->fecha_publi = $fecha_publi;
        $perdida->fecha_perdida = $fecha_perdida;
        $perdida->id_raza = $id_raza;
        $perdida->latitud = $latitud;
        $perdida->longitud = $longitud;
        $perdida->radio = $radio;
        $perdida->direccion_maps = $direccion_maps;
        $perdida->punto_referencia = $punto_referencia;
        $perdida->mostrar_tel = $mostrar_tel;
        $perdida->mostrar_redes = $mostrar_redes;
        $perdida->estado = $estado;


        $perdida->timestamps = false;
        $perdida->save();

        return response($perdida, 200)->header('Content-Type', 'application/json');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Perdida $perdida)
    {
        $id = $perdida->id;
        $id_usuario = $request->id_usuario;
        $nombre_mascota = $request->nombre_mascota;
        $descripcion = $request->descripcion;
        $foto = $request->foto;
        $fecha_publi = $request->fecha_publi;
        $fecha_perdida = $request->fecha_perdida;
        $id_raza = $request->id_raza;
        $latitud = $request->latitud;
        $longitud = $request->longitud;
        $radio = $request->radio;
        $direccion_maps = $request->direccion_maps;
        $punto_referencia = $request->punto_referencia;
        $mostrar_tel = $request->mostrar_tel;
        $mostrar_redes = $request->mostrar_redes;
        $estado = $request->estado;

        // Validaciones
        # Nombre de Mascota
        if (trim($nombre_mascota) == "") {
            return response("Campo Nombre de Mascota Vacío", 400)->header('Content-Type', 'application/json');
        }

        if (!preg_match("/[a-zA-Z ]+/", $nombre_mascota)) {
            return response("Campo Nombre de Mascota solo debe contener letras", 400)->header('Content-Type', 'application/json');
        }

        # Descripción
        if (trim($descripcion) == "") {
            return response("Campo Descripción Vacío", 400)->header('Content-Type', 'application/json');
        }

        # Foto
        if (trim($foto) == "") {
            return response("Campo Foto Vacío", 400)->header('Content-Type', 'application/json');
        }

        # Fecha de Publicación
        if (trim($fecha_publi) == "") {
            return response("Campo Fecha de Publicación Vacío", 400)->header('Content-Type', 'application/json');
        }

        # Fecha de Pérdida
        if (trim($fecha_perdida) == "") {
            return response("Campo Fecha de Pérdida Vacío", 400)->header('Content-Type', 'application/json');
        }

        # Raza
        if (trim($id_raza) == "") {
            return response("Campo Raza Vacío", 400)->header('Content-Type', 'application/json');
        }

        if (!Raza::find($id_raza)) {
            return response("Raza no Encontrada", 400)->header('Content-Type', 'application/json');
        }

        # Latitud
        if (trim($latitud) == "") {
            return response("Campo Latitud Vacío", 400)->header('Content-Type', 'application/json');
        }

        # Longitud
        if (trim($longitud) == "") {
            return response("Campo Longitud Vacío", 400)->header('Content-Type', 'application/json');
        }

        # Radio
        if (trim($radio) == "") {
            return response("Campo Radio Vacío", 400)->header('Content-Type', 'application/json');
        }

        # Dirección en Maps
        if (trim($direccion_maps) == "") {
            return response("Campo Dirección en Maps Vacío", 400)->header('Content-Type', 'application/json');
        }

        # Estado
        if (trim($estado) == "") {
            return response("Campo Estado Vacío", 400)->header('Content-Type', 'application/json');
        }

        $perdida->id_usuario = $id_usuario;
        $perdida->nombre_mascota = $nombre_mascota;
        $perdida->descripcion = $descripcion;
        $perdida->foto = $foto;
        $perdida->fecha_publi = $fecha_publi;
        $perdida->fecha_perdida = $fecha_perdida;
        $perdida->id_raza = $id_raza;
        $perdida->latitud = $latitud;
        $perdida->longitud = $longitud;
        $perdida->radio = $radio;
        $perdida->direccion_maps = $direccion_maps;
        $perdida->punto_referencia = $punto_referencia;
        $perdida->mostrar_tel = $mostrar_tel;
        $perdida->mostrar_redes = $mostrar_redes;
        $perdida->estado = $estado;

        $perdida->timestamps = false;
        $perdida->update();

        return response($perdida, 200)->header('Content-Type', 'application/json');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        if (!Perdida::find($id)) {
            return response("Pérdida no Encontrada", 404)->header('Content-Type', 'application/json');
        }
        $perdida = Perdida::find($id);
        if ($perdida->delete()) {
            return response("Pérdida Eliminada", 200)->header('Content-Type', 'application/json');
        } else {
            return response("Error al eliminar Pérdida", 400)->header('Content-Type', 'application/json');
        }
    }
}
