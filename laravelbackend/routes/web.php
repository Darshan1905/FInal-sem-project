<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;


// Auth Routes

Route::get('/', function () {return view('auth.login');})->name('root');
Route::post('/login',[AuthController::class,'auth']);
Route::post('/logout',[AuthController::class,'logout']);


// Admin Routes

Route::group(['prefix'=>'/admin','middleware'=>['auth','isAdmin']],function(){

    Route::get('/dashboard', function () {return view('admin.dashboard');});

    // User Routes
    Route::get('/user',[UserController::class,'index']);
    Route::get('/delete/{id}',[UserController::class,'delete']);
    Route::post('/multipledeleteuser',[UserController::class,'deletmultipleusers']);

    // Products Routes
    Route::get('/getproduct',[ProductController::class,'getallproduct']);
    Route::get('/createproduct',[ProductController::class,'create']);
    Route::post('/addproduct',[ProductController::class,'store']);
    Route::get('/editproduct/{id}',[ProductController::class,'edit']);
    Route::post('/updateproduct/{id}',[ProductController::class,'update']);
    Route::get('/deleteproduct/{id}',[ProductController::class,'delete']);
    Route::post('/multipledeleteprod',[ProductController::class,'deletmultipleproducts']);


    //Category Routes
    Route::get('/getcategory',[CategoryController::class,'index']);
    Route::get('/createcategory',[CategoryController::class,'create']);
    Route::post('/addcategory',[CategoryController::class,'store']);
    Route::get('/editcategory/{id}',[CategoryController::class,'edit']);
    Route::post('/updatecategory/{id}',[CategoryController::class,'update']);
    Route::get('/deletecategory/{id}',[CategoryController::class,'delete']);
    Route::post('/multipledeletecat',[CategoryController::class,'deletmultiplecategories']);
});



// User Routes

Route::group(['prefix'=>'/user','middleware'=>['auth','user']],function(){

    Route::get('/dashboard', function () {return view('user.dashboard');});


});