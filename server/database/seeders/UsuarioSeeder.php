<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       DB::table("usuarios")->insert([
            "name" => "mauricio carvajal",
            "email" => "maurocardia27@gmail.com" ,
            "password" => "12345678",
            "adress"=> "carrera 49B 48 66",
            "birthday"=> "1995-04-28"
      ]);  //
    }
}
