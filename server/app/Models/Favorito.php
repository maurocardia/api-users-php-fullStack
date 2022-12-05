<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorito extends Model
{
    use HasFactory;

    
    public function users()
    {
        return $this->belongsTo(Categoria::class, "id_usuario");
    }
}
