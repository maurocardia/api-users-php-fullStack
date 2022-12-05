<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
use App\models\User;
use \stdClass;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
   public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            "name" => "required|string|max:255",
            "email" => "required|string|email|max:255",
            "password" => "required|string|min:8",
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());

        }
            $usuario = User::create([
                "name" => $request->name,
                "email" => $request->email,
                "password" => Hash::make($request->password),
                "adress" => $request->adress,
                "birthdate" => $request->birthdate,
                "city"  => $request->city,

            ]);

            $token = $usuario->createToken("auth_token")->plainTextToken;
            return response()

            ->json(["data" => $usuario,"access_token"=>$token,"token_type" => "Bearer",]);

        
    }

    public function login(Request $request)
    {
        if(!Auth::attempt($request->only("email","password")))
        {
            return response()
            ->json(["message"=> "Unauthorized"],401);

        }
        $usuario = User::where("email", $request["email"])->firstOrFail();

        $token = $usuario->createToken("auth_token")->plainTextToken;

        return response()
        ->json([
            "message" => "Hola", $usuario->name,
            "accessToken" => $token,
            "token_type" =>"Bearer",
            "user"=>$usuario
        ]);
    }

    public function logout(){
        {
            auth()->user()->tokens()->delete();
            return[
                "message" => "ha cerrado sesion corectamente y su token ha sido eliminado"
            ];
        }
    }
}
