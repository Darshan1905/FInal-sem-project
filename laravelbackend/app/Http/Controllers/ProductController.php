<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Cart;
use App\Models\Category;
use Illuminate\Support\Str;
use Alert;

class ProductController extends Controller
{

    //For api
   public function show(Request $req){
    $products = Product::all();
    return  $products;
}

//For api
public function productdetail(Request $req,$product_slug){
    $productDetails = Product::where('slug',$product_slug)->first();

    return  $productDetails;
}


    public function getallproduct(){
        $products = Product::all();
        return view('products.index',compact('products'));
    }

    public function create(){
        $categories = Category::all();
        return view('products.create',compact('categories'));
    }

    public function store(Request $req){
        $this->validate($req,[
            'title' => 'required',
            'price' => 'required',
            'quantity' => 'required|numeric',
            'description' => 'required',
            'image' => 'required|image'
        ]);
        $data = $req->all();
        $slug=Str::slug($req->title);
        $count=Product::where('slug',$slug)->count();
        if($count>0){
            $slug=$slug.'-'.date('ymdis').'-'.rand(0,999);
        }
        $data['slug']=$slug;
        if($req->hasfile('image')){
            $name = $req->file('image')->getClientOriginalName();
            $file =  $req->file('image')->storeAs('/public/uploads',$name);
            $data['image'] = $name ;
        }
        $data['cat_id'] = $req->input('cat_id');
        Product::create($data);
        Alert::success('Product added Successfully');
        return redirect('admin/getproduct');
    }

    public function edit(Request $req,$id){
        $categories = Category::all();
        $products = Product::find($id);
        return view('products.edit',compact('products','categories'));
    }

    public function update(Request $req, $id){
        $products = Product::find($id);
        $this->validate($req,[
            'title' => 'required',
            'price' => 'required',
            'quantity' => 'required|numeric',
            'description' => 'required',
        ]);
        $data = $req->all();
        if($req->hasfile('image')){
            $name = $req->file('image')->getClientOriginalName();
            $file =  $req->file('image')->storeAs('/public/uploads',$name);
            $data['image'] = $name ;
        }
        $products->update($data);
        Alert::success('Product updated Successfully');
        return redirect('admin/getproduct');
    }

    public function deletmultipleproducts(Request $req){
        $ids = $req->ids;
        $item = Product::whereIn('id',$ids);
        $item->delete();
        Alert::success('Product Deleted Successfully');
        return back();
    }


    public function delete(Request $request, $id) {
        $product = Product::find($id);

        if ($product) {
            // Delete the product from the products table
            $product->delete();

            // Remove the product from the cart if it exists
            Cart::where('product_id', $id)->delete();

            Alert::success('Product Deleted Successfully');
        } else {
            Alert::error('Product not found');
        }

        return back();
    }


    public function countActiveProduct(){
        $data=Product::all();
        if($data){
            return view('admin.dashboard',compact('data'));
        }
        return 0;
    }
}


 // public function productdetail(Request $req,$category_slug,$product_slug){
    //     $category = Category::where('id',$category_slug)-first();
    //     $singleproduct = Product::where('cat_id',$category->id)->where('slug',$product_slug)->first();
    //     return $singleproduct;

    // }