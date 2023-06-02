@extends('master')

@section('title','edit Product')

@section('main')

<div class="container">
    <div class="row justify-content-center">
        <div class="col-lg-6">
            <form action="{{url('admin/updateproduct/'.$products->id)}}" method="post" enctype="multipart/form-data">
                @csrf
                <h4 class="my-3">Add Product</h4>
                <input class="form-control my-2" type="text" name="title" id="" value="{{$products->title}}" placeholder="Product name">
                @error('title')
                    <p class="text-danger"> {{$message}} </p>
                @enderror
                <input class="form-control my-2" type="number" name="price" id="" value="{{$products->price}}" placeholder="Product price">
                @error('price')
                    <p class="text-danger"> {{$message}} </p>
                @enderror
                <input class="form-control my-2" type="number" name="quantity" id="" value="{{$products->quantity}}" placeholder="Product quantity">
                @error('quantity')
                    <p class="text-danger"> {{$message}} </p>
                @enderror
                <textarea class="form-control my-2" name="description" id=""  cols="5" rows="5">{{$products->description}}</textarea>
                @error('description')
                    <p class="text-danger"> {{$message}} </p>
                @enderror
                <select name="cat_id" id="cat_id" class="form-control">
                    <option value="">--Select any category--</option>
                    @foreach ($categories as $cat_data)
                        <option value='{{ $cat_data->id }}' {{ $products->cat_id == $cat_data->id ? 'selected' : '' }}>
                            {{ $cat_data->title }}</option>
                    @endforeach
                </select>
                @if ("/storage/uploads/{{ $products->image }}")
                <img src="{{ asset ('storage/uploads/'.$products->image) }}" width="50px">
                @else
                    <p>No image found</p>
                @endif
                <input class="form-control my-2" type="file" name="image" id="" value="{{$products->name}}" >

                @error('image')
                    <p class="text-danger"> {{$message}} </p>
                @enderror
                <button type="submit" name="submit" class="btn btn-site">Update Product</button>
            </form>
        </div>
    </div>
</div>

@endsection
