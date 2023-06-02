<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CartController;

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::get('/user', function() {
//     return auth()->user();
// })->middleware('auth:sanctum');

// User Login api
Route::post('/register',[UserController::class,'register']);
Route::post('/login',[UserController::class,'login']);

// Product api

Route::get('/allproducts',[ProductController::class,'show']);
Route::get('/allproducts/{product_slug}',[ProductController::class,'productdetail']);

//Category api

Route::get('/allcategories',[CategoryController::class,'show']);
Route::get('/allcategories/{slug}',[CategoryController::class,'getProductByCat']);

//cart api

Route::post('/addtocart',[CartController::class,'addToCart']);
Route::get('/cart/{userid}', [CartController::class, 'getUserCart']);
Route::delete('/cart/{userid}/{productId}', [CartController::class, 'removeitem']);
Route::put('/cart/{userid}/{productid}', [CartController::class, 'updateCartItem']);

// Checkout api

Route::post('/placeorder',[CheckoutController::class, 'placeorder']);