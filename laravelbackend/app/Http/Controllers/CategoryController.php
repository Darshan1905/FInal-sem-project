<?php

namespace App\Http\Controllers;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Str;
use Alert;

use Illuminate\Http\Request;

class CategoryController extends Controller
{

    //For api
    public function show(){
        $category = Category::all();
        return  $category;
    }

    //For api
    public function getProductByCat(Request $req,$slug){
        $category=Category::where('slug',$slug)->first();
        $products = $category->products()->get();
        return $products;
    }

    public function index(){
        $category = Category::all();
        return view('category.index',compact('category'));
    }

    public function create(){
        return view('category.create');
    }

    public function store(Request $req){
        $this->validate($req,[
            'title' => 'required',
            'description' => 'required',
            'image' => 'required',
        ]);
        $data = $req->all();
        $slug=Str::slug($req->title);
        $count=Category::where('slug',$slug)->count();
        if($count>0){
            $slug=$slug.'-'.date('ymdis').'-'.rand(0,999);
        }
        $data['slug']=$slug;
        if($req->hasfile('image')){
            $name = $req->file('image')->getClientOriginalName();
            $file =  $req->file('image')->storeAs('/public/uploads',$name);
            $data['image'] = $name ;
        }
        $status = Category::create($data);
        Alert::success('Category added Successfully');
        return redirect('admin/getcategory');
    }

    public function edit(Request $req,$id){
        $category = Category::find($id);
        return view('category.edit',compact('category'));
    }

    public function update(Request $req, $id){
        $category = Category::find($id);
        $this->validate($req,[
            'title' => 'required',
            'description' => 'required',
        ]);
        $data = $req->all();
        if($req->hasfile('image')){
            $name = $req->file('image')->getClientOriginalName();
            $file =  $req->file('image')->storeAs('/public/uploads',$name);
            $data['image'] = $name ;
        }
        $status = $category->update($data);
        Alert::success('Category updated Successfully');
        return redirect('admin/getcategory');
    }

    public function deletmultiplecategories(Request $req){
        $ids = $req->ids;
        $item = Category::whereIn('id',$ids);
        $item->delete();
        Alert::success('Category Deleted Successfully');
        return back();
    }

    public function delete(Request $req,$id){
       $category = Category::find($id)->delete();
        Alert::success('Category Deleted Successfully');
        return redirect('admin/getcategory');
    }

}