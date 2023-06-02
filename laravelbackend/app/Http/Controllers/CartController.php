<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use App\Models\Cart;
use Alert;
use Auth;

class CartController extends Controller
{

// Cart api
public function addToCart(request $req){

    $userId = $req->userid;
    $productId = $req->productid;
    $quantity = $req->quantity;

    // Check if the product already exists in the cart for the user
    $existingCart = Cart::where('user_id', $userId)
        ->where('product_id', $productId)
        ->first();

    if ($existingCart) {
        return response([
            'status' => 202,
            'msg' => 'Product is already in the cart',
        ], 200);
    }

   $cart =new Cart;
   $cart->user_id = $userId;
   $cart->product_id = $productId;
   $cart->quantity = $quantity; // Set the quantity
   $res= $cart->save();

   if (!$res) {
    # code...
    return response([
        'status' => 202,
        'msg' => 'Error',
    ],200);
   }
    return response([
        'status' => 201,
        'msg' => 'Add to cart',
    ],200);

}


public function removeitem(request $req,$userid, $productId)
    {
        // Get the authenticated user's ID
        $userid = $req->userid;

        // Find the cart item for the user and product ID
        $cartItem = Cart::where('user_id', $userid)->where('product_id', $productId)->first();


        // If the cart item exists, remove it
        if ($cartItem) {
            $cartItem->delete();
            return response()->json(['message' => 'Product removed from cart successfully']);
        }

        return response()->json(['error' => 'Cart item not found'], 404);
    }



    public function updateCartItem(Request $req, $userid, $productid)
    {

        try {

            $cartItem = Cart::where([['user_id', $userid],['product_id', $productid]])->update([
                'quantity'=>$req->quantity
            ]);
                if (!$cartItem) {
                    return response()->json(['message' => 'Cart item not found'], 404);
                }


            return response()->json(['message' => 'Cart item quantity updated successfully'], 200);
        } catch (\Exception $e) {
            // Log the exception
            \Log::error($e->getMessage());

            return response()->json(['message' => 'Internal Server Error'], 500);
        }
    }




public function getUserCart(Request $req, $userid)
    {
        $cartItems = Cart::where('user_id', $userid)->with('product')->get();
        return response()->json($cartItems);
    }

}