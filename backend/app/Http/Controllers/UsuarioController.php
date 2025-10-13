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
    public function store(Request $request) {
        $usuario = new Usuario();

        $nombre = $request->nombre;
        $apellido = $request->apellido;
        $correo = $request->correo;
        $pass = $request->pass;
        $genero = $request->genero;
        $id_rol = $request->id_rol;
        $id_distrito = $request->id_distrito;
        $estado = $request->estado;

        if (trim($nombre) == "") {
            return response("Campo Nombre Vacío", 400)->header('Content-Type', 'application/json');
        } else {
            if (!preg_match("/[a-zA-Z ]+/", $nombre)) {
                return response("Campo Nombre solo debe contener letras", 400)->header('Content-Type', 'application/json');
            }
        }

        if (trim($correo) == "") {
            return response("Campo Correo Vacío", 400)->header('Content-Type', 'application/json');
        } else if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
            return response("Correo no es válido", 400)->header('Content-Type', 'application/json');
        } else if (Usuario::where('correo', $correo)->exists()) {
            return response("Correo ya registrado", 400)->header('Content-Type', 'application/json');
        }
        

        if (trim($pass) == "") {
            return response("Campo Contraseña Vacío", 400)->header('Content-Type', 'application/json');
        }

        if (trim($genero) == "") {
            return response("Campo Género Vacío", 400)->header('Content-Type', 'application/json');
        } else {
            if (!preg_match("/[a-zA-Z ]+/", $genero)) {
                return response("Campo Género solo debe contener letras", 400)->header('Content-Type', 'application/json');
            }
        }

        if (trim($id_rol) == "") {
            return response("Campo Rol Vacío", 400)->header('Content-Type', 'application/json');
        }

        if (trim($id_distrito) == "") {
            return response("Campo Distrito Vacío", 400)->header('Content-Type', 'application/json');
        }

        if (trim($estado) == "") {
            return response("Campo Estado Vacío", 400)->header('Content-Type', 'application/json');
        }




        $usuario->nombre = $nombre;
        $usuario->apellido = $apellido;
        $usuario->correo = $correo;
        $usuario->pass = $pass;
        $usuario->genero = $genero;
        $usuario->id_rol = $id_rol;
        $usuario->id_distrito = $id_distrito;
        $usuario->estado = $estado;
        $usuario->save();
        return response($usuario, 200)->header('Content-Type', 'application/json');
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

    public function update(Request $request, Usuario $usuario) {
        $id = $usuario->id;
        $nombre = $request->nombre;
        $apellido = $request->apellido;
        $correo = $request->correo;
        $genero = $request->genero;
        $id_rol = $request->id_rol;
        $id_distrito = $request->id_distrito;
        $estado = $request->estado;

        if (!Usuario::find($id)) {
            return response("Usuario no Encontrado", 404)->header('Content-Type', 'application/json');
        }


        if (trim($nombre) == "") {
            return response("Campo Nombre Vacío", 400)->header('Content-Type', 'application/json');
        } else {
            if (!preg_match("/[a-zA-Z ]+/", $nombre)) {
                return response("Campo Nombre solo debe contener letras", 400)->header('Content-Type', 'application/json');
            }
        }

        if (trim($correo) == "") {
            return response("Campo Correo Vacío", 400)->header('Content-Type', 'application/json');
        } else {
            if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
                return response("Correo no es válido", 400)->header('Content-Type', 'application/json');
            }
        }

        if (trim($genero) == "") {
            return response("Campo Género Vacío", 400)->header('Content-Type', 'application/json');
        } else {
            if (!preg_match("/[a-zA-Z ]+/", $genero)) {
                return response("Campo Género solo debe contener letras", 400)->header('Content-Type', 'application/json');
            }
        }

        if (trim($id_rol) == "") {
            return response("Campo Rol Vacío", 400)->header('Content-Type', 'application/json');
        }

        if (trim($id_distrito) == "") {
            return response("Campo Distrito Vacío", 400)->header('Content-Type', 'application/json');
        }

        if (trim($estado) == "") {
            return response("Campo Estado Vacío", 400)->header('Content-Type', 'application/json');
        }

        $usuario->nombre = $nombre;
        $usuario->apellido = $apellido;
        $usuario->correo = $correo;
        $usuario->genero = $genero;
        $usuario->id_rol = $id_rol;
        $usuario->id_distrito = $id_distrito;
        $usuario->estado = $estado;
        $usuario->timestamps = false;
        $usuario->update();

        return response($usuario, 200)->header('Content-Type', 'application/json');
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
