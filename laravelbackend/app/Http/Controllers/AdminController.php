<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Orderitems;

class AdminController extends Controller
{
    public function orderItems(Request $req){
        $orderitem = Orderitems::all();

        return view ('admin.orderitems',compact('orderitem'));
    }
}