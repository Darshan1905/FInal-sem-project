<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orderitems extends Model
{
    use HasFactory;
    protected $table = 'orderitems';
    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'price'
    ];

    public function order(){
        return $this->belongsTo(Order::class,'order_id', 'id');
    }

    public function product(){
        return $this->belongsTo(Product::class,'product_id', 'id');
    }

}