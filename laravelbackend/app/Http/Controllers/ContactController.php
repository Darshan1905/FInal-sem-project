<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function contact(Request $req){



        $validator = Validator::make($req->all(),[

            "fname" => 'required',
            "email" => 'required|email',
            "mobile" => 'required',
            "msg" => 'required',


           ]);

           if($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),

            ]);
           }else{



            $data = [
                "fname"=>$req->fname,
                "email"=>$req->email,
                "mobile"=>$req->mobile,
                "msg"=>$req->msg
            ];


            Mail::send('email',$data,function($message) use ($data){

                // $message->to($data['email']);
                $message->to('skyweb1905@gmail.com');
                $message->subject('Mail from Website');

            });

            return response()->json([
                'status' => 200,
                'message' => 'Email sent successfully, We will get in touch with you as soon as posible.',
            ]);
           }




    }
}