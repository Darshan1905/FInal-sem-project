<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Alert;

class UserController extends Controller

{

    public function index(Request $req){
        $user = User::all();
        return view('admin.index',compact('user'));
    }

    public function deletmultipleusers(Request $req){
        $ids = $req->ids;
        $item = User::whereIn('id',$ids);
        $item->delete();
        Alert::success('User Deleted Successfully');
        return back();
    }

    public function delete(Request $req,$id){
       $user =  User::find($id)->delete();
       Alert::success('User Deleted Successfully');
       return back();
    }

    public function register(Request $req)
    {

        $this->validate($req,[
            'name'=>'required',
            'email'=>'required|email:rfc|unique:users,email',
            'password'=>'required|min:8',
        ]);

        $user = new User;
        $user->name = $req->input('name');
        $user->email = $req->input('email');
        $user->password = Hash::make($req->input('password'));
        $user->save();
        return $user;
    }

    public function login(Request $req){

        $this->validate($req,[
            'email'=>'required',
            'password'=>'required',
        ]);

        $user = User::where('email',$req->email)->first();
        if($user && Hash::check($req->password,$user->password)){
            return $user;
        }
        return "Login failed";
    }



}