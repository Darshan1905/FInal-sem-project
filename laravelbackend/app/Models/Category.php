<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'description',
        'image',
    ];

    public function products(){
        return $this->hasOne(Product::class,'cat_id','id');
    }

    public static function countActiveCategory(){
        $data=Category::all()->count();
        if($data){
            return $data;
        }
        return 0;
    }

    use HasFactory;
}