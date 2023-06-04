<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Auth;
use App\Models\User;
use Alert;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }


    public function auth(Request $req){

        $this->validate($req,[
            'email'=>'required',
            'password'=>'required|min:6',
        ]);

        if(Auth::attempt($req->only('email','password'))){

            if(Auth::user()->role === 'admin'){
                Alert::success('Successfully Loged in');
                return redirect('admin/dashboard');
            }else if(Auth::user()->role === 'user'){
                Alert::error('You are not allow to access this');
                // return redirect('user/dashboard');
            }
            Alert::success('There must be an error');
            return back();
        }
        Alert::error('Username or Password are wrong');
        return back();
    }

    public function logout(Request $req){

        Auth::logout();
        return redirect('/');

    }

}