<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Auth;
use App\Models\User;
use Alert;

class AuthController extends Controller
{
    public function auth(Request $req){

        $this->validate($req,[
            'email'=>'required',
            'password'=>'required',
        ]);

        if(Auth::attempt($req->only('email','password'))){

            if(Auth::user()->role === 'admin'){
                return redirect('admin/dashboard');
            }else if(Auth::user()->role === 'user'){
                return redirect('user/dashboard');
            }
            return "Login failed";
        }
        return redirect('/');
    }

    public function logout(Request $req){

        Auth::logout();
        return redirect('/');

    }

}