<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'description',
        'price',
        'image',
        'cat_id',
        'quantity'

    ];


    public function category(){
        return $this->belongsTo(Category::class,'cat_id','id');
    }

    public function cart(){
        return $this->hasMany(Cart::class,'product_id','id');
    }

    // public function user(){
    //     return $this->hasOne(User::class);
    // }


    protected $with = ['category'];

    public static function countActiveProduct(){
        $data=Product::all()->count();
        if($data){
            return $data;
        }
        return 0;
    }

    use HasFactory;
}