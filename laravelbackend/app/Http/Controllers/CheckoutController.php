<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\Cart;

class CheckoutController extends Controller
{
    public function placeorder(Request $req){

        // if(Auth::check()){

            $validator = Validator::make($req->all(),[

            'firstname' => 'required|max:191',
            'lastname' => 'required|max:191',
            'phone' => 'required|max:191',
            'email' => 'required|max:191',
            'address' => 'required|max:191',
            'city' => 'required|max:191',
            'state' => 'required|max:191',
            'zipcode' => 'required|max:191',
            'payment_mode' => 'required|max:191',

           ]);

           if($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),

            ]);
           }else{



            $order = new Order;
            $userId = $req->userid;
            $order->user_id = $userId;
            $order->firstname = $req->firstname;
             $order->lastname = $req->lastname;
             $order->phone = $req->phone;
             $order->email = $req->email;
             $order->address = $req->address;
             $order->city = $req->city;
             $order->state = $req->state;
             $order->zipcode = $req->zipcode;
             $order->payment_mode =  $req->payment_mode;;
             $order->tracking_no = 'fundaecom'.rand(1111,9999);
             $order->save();

             $cart = Cart::where('user_id',$userId)->get();
             $orderitems = [];
             foreach($cart as $item){
                $orderitems[] = [
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price
                ];

                $item->product->update([
                   'quantity'=>$item->product->quantity - $item->quantity
                ]);
             }

             $order->orderitems()->createMany($orderitems);
             Cart::destroy($cart);




            return response()->json([
                'status' => 200,
                'message' => 'order placed successfully',
            ]);
           }


        // }else{
        //     return response()->json([
        //         'status' => 401,
        //         'message' => 'login to continue',
        //     ]);
        // }


   }
}