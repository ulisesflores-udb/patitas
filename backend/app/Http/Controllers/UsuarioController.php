<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UsuarioController extends Controller {
    public function login(Request $request) {
        // $request->validate([
        //     'correo' => 'required|email|max:100',
        //     'pass' => 'required'
        // ]);
        $correo = $request->input('correo');
        $pass = $request->input('pass');
        $usuario = Usuario::where('correo', $correo)
            ->where('pass', $pass)
            ->join('roles as r', 'usuarios.id_rol', '=', 'r.id')
            ->join('distritos as dis', 'usuarios.id_distrito', '=', 'dis.id')
            ->join('municipios as mun', 'dis.id_municipio', '=', 'mun.id')
            ->join('departamentos as depto', 'mun.id_departamento', '=', 'depto.id')
            ->select(
                'usuarios.*',
                'r.nombre as rol',
                'depto.id as depto_id',
                'mun.id as muni_id'
            )
            ->first();

        if ($usuario) {
            return response()->json($usuario);
        } else {
            return response()->json(['message' => 'Usuario no encontrado.'], 404);
        }
    }

    public function getUsuarios() {
        $usuarios = Usuario::join('roles as r', 'usuarios.id_rol', '=', 'r.id')
        ->join('distritos as dis', 'usuarios.id_distrito', '=', 'dis.id')
        ->join('municipios as mun', 'dis.id_municipio', '=', 'mun.id')
        ->join('departamentos as depto', 'mun.id_departamento', '=', 'depto.id')
        ->select(
            'usuarios.id',
            DB::raw("CONCAT_WS(' ', usuarios.nombre, usuarios.apellido) AS nombre"),
            'r.nombre as rol',
            'usuarios.correo',
            'usuarios.genero',
            'depto.nombre as depto',
            'mun.nombre as municipio',
            'dis.nombre as distrito',
            'usuarios.estado'
        )
        ->orderBy('usuarios.id')
        ->get();

        return response()->json($usuarios);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {
        $request->validate([
            'nombre' => 'required|string|max:100',
            'apellido' => 'required|string|max:100',
            'correo' => 'required|email|max:100|unique:usuarios,correo',
            'genero' => 'required|string|max:20',
            'id_rol' => 'required|integer',
            'id_distrito' => 'required|integer',
            'estado' => 'required|boolean',
        ]);
        $nombre = $request->input('nombre');
        $apellido = $request->input('apellido');
        $correo = $request->input('correo');
        $genero = $request->input('genero');
        $id_rol = $request->input('id_rol');
        $id_distrito = $request->input('id_distrito');
        $estado = $request->input('estado');
        $usuario = new Usuario();
        $usuario->nombre = $nombre;
        $usuario->apellido = $apellido;
        $usuario->correo = $correo;
        $usuario->genero = $genero;
        $usuario->id_rol = $id_rol;
        $usuario->id_distrito = $id_distrito;
        $usuario->estado = $estado;
        $usuario->save();
        return response()->json(['message' => 'Usuario creado correctamente.']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Usuario $usuario) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id) {
        $id = $id;
        $usuario = Usuario::join('distritos as dis', 'usuarios.id_distrito', '=', 'dis.id')
        ->join('municipios as mun', 'dis.id_municipio', '=', 'mun.id')
        ->join('departamentos as depto', 'mun.id_departamento', '=', 'depto.id')
        ->select(
            'usuarios.*',
            'depto.id as depto_id',
            'mun.id as muni_id'
        )
        ->where('usuarios.id', $id)
        ->orderBy('usuarios.id')
        ->first();

        return response()->json($usuario);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id) {
        $id = $id;
        $request->validate([
            'nombre' => 'required|string|max:100',
            'apellido' => 'required|string|max:100',
            'correo' => 'required|email|max:100',
            'genero' => 'required|string|max:20',
            'id_rol' => 'required|integer',
            'id_distrito' => 'required|integer',
            'estado' => 'required|boolean',
        ]);
        $nombre = $request->input('nombre');
        $apellido = $request->input('apellido');
        $correo = $request->input('correo');
        $genero = $request->input('genero');
        $id_rol = $request->input('id_rol');
        $id_distrito = $request->input('id_distrito');
        $estado = $request->input('estado');
        $usuario = Usuario::find($id);
        if ($usuario) {
            $usuario->nombre = $nombre;
            $usuario->apellido = $apellido;
            $usuario->correo = $correo;
            $usuario->genero = $genero;
            $usuario->id_rol = $id_rol;
            $usuario->id_distrito = $id_distrito;
            $usuario->estado = $estado;
            $usuario->save();
            return response()->json(['message' => 'Usuario actualizado correctamente.']);
        } else
            return response()->json(['message' => 'Usuario no encontrado.'], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request) {
        $id = $request->input('id');
        $usuario = Usuario::find($id);
        if ($usuario) {
            $usuario->delete();
            return response()->json(['message' => 'Usuario eliminado correctamente.']);
        } else {
            return response()->json(['message' => 'Usuario no encontrado.'], 404);
        }
    }
}
